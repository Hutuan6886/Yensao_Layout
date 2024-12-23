import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { r2Bucket } from "@/lib/r2Bucket";

export async function POST(req: NextRequest) {
  //todo: receive FILE from request
  const resFile = await req.formData();
  const file: File = resFile.get("file") as unknown as File;
  if (!file) {
    return new NextResponse("File is required!", { status: 400 });
  }
  //todo: config some condition for FILE before send to R2 storage
  const fileSizeLimit = 5 * 1024 ** 2; //* 5MB
  if (file.size > fileSizeLimit) {
    return new NextResponse("The image is exceed the maximum  allowed size", {
      status: 400,
    });
  }
  //todo: config buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  //todo: config PutObjectAclCommand

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME, //* exactly bucket name created
    Key: file.name,
    ContentType: file.type,
    Body: buffer,
  });

  try {
    //todo: send putObjectCommand to R2 bucket
    await r2Bucket.send(putObjectCommand);
    return NextResponse.json(file.name, { status: 200 }); //* return file name to generate the img url
  } catch (error) {
    console.log("[POST_IMAGE_UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
