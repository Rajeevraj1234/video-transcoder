import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!, //! means string or undefined
  },
});

async function uploadFileToS3(
  file: Buffer,
  fileName: string
): Promise<{ url: string }> {
  const fileBuffer = file;
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypeMap: Record<string, string> = {
    mp4: "video/mp4",
    avi: "video/avi",
    mkv: "video/mkv",
    // Add other video formats as needed
  };

  const contentType = mimeTypeMap[fileExtension] || "application/octet-stream";

  // Add the folder path to the file key
  const folderPath = "video/";
  const newName = `${fileName.split(".")[0]}${Date.now()}.${fileExtension}`;
  const fileKey = `${folderPath}${newName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  // Construct the URL
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;

  return { url };
}

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFileToS3(buffer, file.name);
    console.log(url);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
