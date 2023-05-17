import AWS from "aws-sdk";

const s3 = new AWS.S3({
  s3ForcePathStyle: false,
  endpoint: process.env.DO_SPACES_URL,
  accessKeyId: process.env.DO_SPACES_ID,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export default async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body.key);

    const bucketName = process.env.DO_SPACE_BT;
    const objectKey = req.body.key;

    const key = objectKey.split(
      "https://hospitalhandtools.nyc3.digitaloceanspaces.com/"
    )[1];

    await s3.deleteObject({ Bucket: bucketName, Key: key }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(200).send({ success: false });
      } else {
        // console.log(data);
        res.status(200).send({ success: true });
        return;
      }
    });
  } else {
    res.status(200).send({ success: false, msg: "invalid Request" });
  }
}
