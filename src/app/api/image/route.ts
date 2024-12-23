import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return new NextResponse("Method is incorrect!", { status: 401 });
    }
    const url = await req.json();
    if (!url) {
      return new NextResponse("Image url list is required!", { status: 401 });
    }
    const imageCreated = await prismadb.image.create({
      data: {
        src: url,
      },
    });
    return NextResponse.json(imageCreated, { status: 200 });
  } catch (error) {
    console.error("[IMAGE_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
