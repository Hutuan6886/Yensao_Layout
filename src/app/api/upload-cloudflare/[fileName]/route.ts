import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Bucket } from "@/lib/r2Bucket";

export async function GET(
  req: Request,
  { params }: { params: { fileName: string } }
) {
  if (!params.fileName) {
    return new NextResponse("File name is required!", { status: 400 });
  }
  try {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME, //* exactly bucket name created
      Key: params.fileName,
      ResponseContentDisposition: "inline", //* Render in browser instead of downloading
    });
    //todo: generate imgUrl with getSignedUrl to send back to front-end, this is a link url to overview image
    const imgUrl = await getSignedUrl(r2Bucket, getObjectCommand);
    return NextResponse.json(imgUrl, { status: 200 });
  } catch (error) {
    console.log("[GET_IMAGE_UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
