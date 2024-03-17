import { S3 } from "@aws-sdk/client-s3";
export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-north-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-");
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
        Key: file_key,
        Body: file,
      };
      s3.putObject(params, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            file_key,
            file_name: file.name,
          });
        }
      });
    } catch (error) {
      // console.log("Error uploading file to S3", error);
      reject(error);
    }
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${file_key}`;
  return url;
}