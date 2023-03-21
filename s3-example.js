import { S3 } from "@aws-sdk/client-s3";
const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_BUCKET_SECRET_KEY,
  secretAccessKey: process.env.AWS_BUCKET_ACCESS_KEY
});

// controller
const buffer = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
const data = {
  Key: ['Nom du fichier'],
  Body: buffer,
  ContentEnconding: 'base65',
  Bucket: process.env.AWS_BUCKET_NAME,
  ContentType:["image/jpg"]
}

try {
  const s3Uploads = await s3.putObject(data);
  console.log(data);
}
catch(err) {
  //handle error
}