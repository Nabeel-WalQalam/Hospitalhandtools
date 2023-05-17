import connectDb from "../../Middleware/connectDb";
import Category from "@/models/Category";
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

export default async function handler(req, res, next) {
  await connectDb();
  // console.log("req.body");
  if (req.method == "POST") {
    const newObject = {
      mainCategory: "",
      subCategory: [],
    };

    upload.array("files[]")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading files" });
      }

      const newObject = {
        mainCategory: req.body.field1,
        subCategory: [],
      };

      const checkCategory = await Category.findOne({
        mainCategory: newObject.mainCategory,
      });
      if (checkCategory) {
        res.status(200).json({
          success: false,
          msg: "Category already inserted pls Edit it",
        });
        return;
      } else {
        if (Array.isArray(req.body.sunHeading)) {
          const uploadPromises = req.files.map((image, index) => {
            if (image.buffer) {
              const uploadParams = {
                Bucket: process.env.DO_SPACE_BT,
                Body: image.buffer,
                Key: `Categorys/${image.originalname}`,
                ACL: "public-read",
              };

              return new Promise((resolve, reject) => {
                s3.upload(uploadParams, (err, data) => {
                  if (err) {
                    console.log("Error", err);
                    reject(err);
                  } else {
                    // console.log("Upload Success", data.Location);
                    newObject.subCategory.push({
                      name: req.body.sunHeading[index],
                      image: data.Location,
                    });
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
              const categories = new Category({
                mainCategory: newObject.mainCategory,
                subCategory: newObject.subCategory,
              });

              return categories.save();
            })
            .then((categories) => {
              res.status(200).json({ success: true, data: categories });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "Error updating category" });
            });
        } else {
          const uploadPromises = req.files.map((image, index) => {
            if (image.buffer) {
              const uploadParams = {
                Bucket: process.env.DO_SPACE_BT,
                Body: image.buffer,
                Key: `Categorys/${image.originalname}`,
                ACL: "public-read",
              };

              return new Promise((resolve, reject) => {
                s3.upload(uploadParams, (err, data) => {
                  if (err) {
                    console.log("Error", err);
                    reject(err);
                  } else {
                    // console.log("Upload Success", data.Location);
                    newObject.subCategory.push({
                      name: req.body.sunHeading,
                      image: data.Location,
                    });
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
              const categories = new Category({
                mainCategory: newObject.mainCategory,
                subCategory: newObject.subCategory,
              });

              return categories.save();
            })
            .then((categories) => {
              res.status(200).json({ success: true, data: categories });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "Error updating category" });
            });
        }
      }
    });
  } else {
    res.status(400).json({ error: "this method is not applied" });
    return;
  }
}
