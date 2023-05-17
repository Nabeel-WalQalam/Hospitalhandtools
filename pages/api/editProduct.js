import connectDb from "../../Middleware/connectDb";
import Product from "../../models/Product";
import multer from "multer";
import { createWriteStream } from "fs";
import fs from "fs";
import AWS from "aws-sdk";
const path = require("path");
const FormData = require("form-data");

const s3 = new AWS.S3({
  s3ForcePathStyle: false,
  endpoint: process.env.DO_SPACES_URL,
  accessKeyId: process.env.DO_SPACES_ID,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const newObject = {
      id: "",
      images: [],
    };

    upload.array("files[]")(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading files" });
      } else {
        // console.log(req.body.files2);
        newObject.id = req.body.id;
        req.body.files2.map((items) => {
          newObject.images.push(items);
        });

        const options = JSON.parse(req.body.options);
        const tags = JSON.parse(req.body.tags);

        const uploadPromises = req.files.map((image, index) => {
          if (image.buffer) {
            const uploadParams = {
              Bucket: process.env.DO_SPACE_BT,
              Body: image.buffer,
              Key: `Products/${image.originalname}`,
              ACL: "public-read",
            };

            return new Promise((resolve, reject) => {
              s3.upload(uploadParams, (err, data) => {
                if (err) {
                  console.log("Error", err);
                  reject(err);
                } else {
                  // console.log("Upload Success", data.Location);
                  newObject.images.push(data.Location);
                  resolve();
                }
              });
            });
          } else {
            // console.log("no path");
            return Promise.resolve();
          }
        });

        Promise.all(uploadPromises)
          .then(() => {
            // console.log(newObject);
            // console.log(options);
            // console.log(typeof req.body.id);
            const Products = Product.findByIdAndUpdate(
              { _id: newObject.id },
              {
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                image: newObject.images,
                options: options,
                model: req.body.model,
                quantity: req.body.quantity,
                tags: tags,
                weight: req.body.weight,
                minPrice: req.body.minPrice,
                maxPrice: req.body.maxPrice,
                category: req.body.category,
              },
              {
                new: true,
              }
            ).exec();

            // console.log(Products);
          })
          .then((categories) => {
            res.status(200).json({ success: true, data: categories });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error updating category" });
          });
      }
    });

    // try {
    //   const newProduct = await Product.findOneAndUpdate(
    //     { _id: id },
    //     {
    //       title: title,
    //       slug: slug.replace(/ /g, "-").replace(/[^\w-]+/g, ""),
    //       description: description,
    //       image: image,
    //       options: options,
    //       model: model,
    //       quantity: quantity,
    //       tags: tags,
    //       weight: weight,
    //       minPrice: minPrice,
    //       maxPrice: maxPrice,
    //     }
    //   );
    //   // await newProduct.save();

    //   res.status(200).json({ success: true, Product: newProduct });
    //   return;
    // } catch (error) {
    //   res.status(200).json({ success: false, error: error });
    //   return;
    // }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
