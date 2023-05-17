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
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const newObject = {
      images: [],
    };

    const cateforyImage = {
      image: [],
    };
    upload.fields([{ name: "files[]" }, { name: "variantimage[]" }])(
      req,
      res,
      async (err) => {
        if (err instanceof multer.MulterError) {
          // Handle Multer errors
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Too many files provided" });
          }
          return res.status(500).json({ message: "Error uploading files" });
        } else if (err) {
          // Handle other errors
          console.error(err);
          return res.status(500).json({ message: "Error uploading files" });
        }

        let isProduct = 0;
        const checkProduct = async () => {
          try {
            console.log("checking product");
            isProduct = await Product.findOne({
              title: req.body.title,
            });
            console.log("product checked");
            if (isProduct) {
              return res.status(200).json({
                success: false,
                message: "Product already inserted",
              });
              return;
            } else {
              // console.log(isProduct);
              // console.log(req.body.title);
              // console.log("variant image", req.files["variantimage[]"]);
              // console.log("product image", req.files["files[]"]);
              // console.log(
              //   JSON.parse(req.body.options[0]),
              //   typeof req.body.options
              // );
              let optionData;
              if (req.body.options) {
                optionData = JSON.parse(req.body.options[0]);
              }

              if (req.files["files[]"]) {
                console.log("file is their");

                // const uploadProductFile = async () => {};
                const uploadPromises = req.files["files[]"].map(
                  (image, index) => {
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
                      newObject.images.push(null);
                    }
                  }
                );

                // uploadProductFile();

                await Promise.all(uploadPromises)
                  .then((result) => {
                    if (req.files["variantimage[]"]) {
                      const categoryPromiss = req.files["variantimage[]"].map(
                        (image, index) => {
                          if (image) {
                            const uploadParams = {
                              Bucket: process.env.DO_SPACE_BT,
                              Body: image.buffer,
                              Key: `Products-variant/${image.originalname}`,
                              ACL: "public-read",
                            };

                            return new Promise((resolve, reject) => {
                              s3.upload(uploadParams, (err, data) => {
                                if (err) {
                                  console.log("Error", err);
                                  reject(err);
                                } else {
                                  console.log(
                                    "category-Upload Success",
                                    data.Location
                                  );
                                  cateforyImage.image.push(data.Location);
                                  resolve();
                                }
                              });
                            });
                          } else {
                            // console.log("no path");
                            cateforyImage.image.push("");
                          }
                        }
                      );

                      Promise.all(categoryPromiss)

                        .then((result2) => {
                          // return res
                          //   .status(200)
                          //   .json({ success: true, data: "categories" });
                          // console.log(
                          //   "product image ",
                          //   newObject.images,
                          //   "variant images",
                          //   cateforyImage.image
                          // );
                          for (let i = 0; i < optionData.length; i++) {
                            // console.log(optionData[i].combination);
                            optionData[i].image = cateforyImage.image[i];
                          }
                          console.log(optionData);

                          const saveData = async () => {
                            try {
                              console.log("saving");
                              const Products = await new Product({
                                title: req.body.title,
                                slug: req.body.slug,
                                short_description: req.body.short_description,
                                long_description: req.body.long_description,
                                combination_set: req.body.combination_set,
                                combination:
                                  req.body.variant === "yes"
                                    ? req.body.combination
                                    : null,
                                image: newObject.images,
                                options: optionData ? optionData : null,
                                model: req.body.model,
                                quantity: req.body.quantity,
                                tags: JSON.parse(req.body.tags),
                                weight: req.body.weight,
                                backOrder: req.body.backorder,
                                priceType: req.body.pricetype,
                                variants: req.body.variant,
                                minPrice: req.body.minprice
                                  ? req.body.minprice
                                  : null,
                                maxPrice: req.body.maxprice
                                  ? req.body.maxprice
                                  : null,
                                fixedPrice: req.body.fixedprice
                                  ? req.body.fixedprice
                                  : null,
                                salePrice: req.body.saleprice
                                  ? req.body.saleprice
                                  : null,
                                category: req.body.category,
                              });

                              await Products.save();
                              return res.status(200).json({ success: true });
                            } catch (error) {
                              console.log(error);
                              return res.status(400).json({
                                success: false,
                                message:
                                  "Internal Error Occured with varirant and product images",
                              });
                            }
                          };
                          saveData();
                        })
                        .catch((err) => {
                          console.error(err);
                          return res
                            .status(500)
                            .json({ error: "Error updating category" });
                        });
                    } else {
                      console.log(
                        "i will add product data without variant image"
                        // newObject.images
                      );

                      try {
                        const Products = new Product({
                          title: req.body.title,
                          slug: req.body.slug,
                          short_description: req.body.short_description,
                          long_description: req.body.long_description,
                          combination_set: req.body.combination_set,
                          combination:
                            req.body.variant === "yes"
                              ? req.body.combination
                              : null,
                          image: newObject.images,
                          options: optionData ? optionData : null,
                          model: req.body.model,
                          quantity: req.body.quantity,
                          tags: JSON.parse(req.body.tags),
                          weight: req.body.weight,
                          backOrder: req.body.backorder,
                          priceType: req.body.pricetype,
                          variants: req.body.variant,
                          minPrice: req.body.minprice
                            ? req.body.minprice
                            : null,
                          maxPrice: req.body.maxprice
                            ? req.body.maxprice
                            : null,
                          fixedPrice: req.body.fixedprice
                            ? req.body.fixedprice
                            : null,
                          salePrice: req.body.saleprice
                            ? req.body.saleprice
                            : null,
                          category: req.body.category,
                        });

                        Products.save();
                        return res.status(200).json({ success: true });
                      } catch (error) {
                        console.log(error);
                        return res.status(400).json({
                          success: false,
                          message: "Internal Error Occured",
                        });
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                      success: false,
                      message: "Internal Error Occured",
                    });
                  });
              } else {
                return res.status(400).json({
                  success: false,
                  message: "please Select Image",
                });
              }
            }
          } catch (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              message: "Error occured",
            });
          }
        };
        checkProduct();

        // return res.status(200).json({ message: "Files uploaded successfully" });
      }
    );
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
