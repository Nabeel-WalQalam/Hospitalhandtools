import connectDb from "../../Middleware/connectDb";
import Category from "@/models/Category";
// import multer from "multer";
// import { createWriteStream } from "fs";
// import fs from "fs";
// import AWS from "aws-sdk";
// const path = require("path");
// const FormData = require("form-data");

// const s3 = new AWS.S3({
//   s3ForcePathStyle: false,
//   endpoint: process.env.DO_SPACES_URL,
//   accessKeyId: process.env.DO_SPACES_ID,
//   secretAccessKey: process.env.DO_SPACES_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

export default async function handler(req, res, next) {
  await connectDb();

  if (req.method == "POST") {
    const { data } = JSON.parse(req.body);
    const { key } = JSON.parse(req.body);

    console.log("key", key, data);

    try {
      const responce = await Category.findByIdAndUpdate(
        { _id: key },
        {
          mainCategory: data.mainCategory,
          subCategory: data.subCategory,
        }
      );
      return res.send({ success: true });
    } catch (error) {
      return res.send({ success: true, error });
    }

    // upload.array("files[]")(req, res, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: "Error uploading files" });
    //   }

    //   newObject.mainCategory = req.body.field1;
    //   newObject.id = req.body.id;

    //   // console.log(typeof req.body.sunHeading2, req.body.files2);

    //   if (Array.isArray(req.body.sunHeading2)) {
    //     req.body.sunHeading2.map((items, index) => {
    //       newObject.subCategory.push({
    //         name: items,
    //         image: req.body.files2[index],
    //       });
    //     });
    //   } else {
    //     // console.log(req.body.files2[0]);
    //     newObject.subCategory.push({
    //       name: req.body.sunHeading2,
    //       image: req.body.files2[0],
    //     });
    //   }

    //   if (Array.isArray(req.body.sunHeading)) {
    //     const promises = req.files.map((image, index) => {
    //       return new Promise((resolve, reject) => {
    //         if (image.buffer) {
    //           const uploadParams = {
    //             Bucket: process.env.DO_SPACE_BT,
    //             Body: image.buffer,
    //             Key: `Categorys/${image.originalname}`,
    //             ACL: "public-read",
    //           };
    //           s3.upload(uploadParams, (err, data) => {
    //             if (err) {
    //               // console.log("Error", err);
    //               reject(err);
    //             } else {
    //               // console.log("Upload Success", data.Location);
    //               newObject.subCategory.push({
    //                 name: req.body.sunHeading[index],
    //                 image: data.Location,
    //               });
    //               resolve();
    //             }
    //           });
    //         } else {
    //           // console.log("no path");
    //           resolve();
    //         }
    //       });
    //     });

    //     Promise.all(promises)
    //       .then(() => {
    //         // console.log("All uploads completed");
    //         // console.log(newObject);
    //         Category.findByIdAndUpdate(
    //           { _id: newObject.id },
    //           {
    //             mainCategory: newObject.mainCategory,
    //             subCategory: newObject.subCategory,
    //           }
    //         )
    //           .then((categories) => {
    //             res.status(200).json({ success: true, data: categories });
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ error: "Error updating category" });
    //           });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         res.status(500).json({ error: "Error uploading files" });
    //       });
    //   } else {
    //     const promises = req.files.map((image, index) => {
    //       return new Promise((resolve, reject) => {
    //         if (image.buffer) {
    //           const uploadParams = {
    //             Bucket: process.env.DO_SPACE_BT,
    //             Body: image.buffer,
    //             Key: `Categorys/${image.originalname}`,
    //             ACL: "public-read",
    //           };
    //           s3.upload(uploadParams, (err, data) => {
    //             if (err) {
    //               console.log("Error", err);
    //               reject(err);
    //             } else {
    //               // console.log("Upload Success", data.Location);
    //               newObject.subCategory.push({
    //                 name: req.body.sunHeading,
    //                 image: data.Location,
    //               });
    //               resolve();
    //             }
    //           });
    //         } else {
    //           // console.log("no path");
    //           resolve();
    //         }
    //       });
    //     });

    //     Promise.all(promises)
    //       .then(() => {
    //         // console.log("All uploads completed");
    //         // console.log(newObject);
    //         Category.findByIdAndUpdate(
    //           { _id: newObject.id },
    //           {
    //             mainCategory: newObject.mainCategory,
    //             subCategory: newObject.subCategory,
    //           }
    //         )
    //           .then((categories) => {
    //             res.status(200).json({ success: true, data: categories });
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ error: "Error updating category" });
    //           });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         res.status(500).json({ error: "Error uploading files" });
    //       });
    //   }
    // });
  } else {
    res.status(400).json({ error: "this method is not applied" });
    return;
  }
}
