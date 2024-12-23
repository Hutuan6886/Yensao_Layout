import prismadb from "@/lib/prismadb";
import { ImageType, PriceType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return new NextResponse("Method is incorrect!", { status: 401 });
    }
    const body = await req.json();
    const { title, image, categoryId, price, notion, desc } = body;
    //todo: Required
    if (!title) {
      return new NextResponse("Title is required!", { status: 401 });
    }
    if (image.length < 3) {
      return new NextResponse("Image must have a minimum of 3 items!", {
        status: 401,
      });
    }
    if (!categoryId) {
      return new NextResponse("Category ID is required!", { status: 401 });
    }
    if (price.length < 1) {
      return new NextResponse("Price is required!", { status: 401 });
    }

    //todo: create product
    const formattedImage = image.map((item: ImageType) => ({
      src: item.src,
    }));
    const formattedPrice = price.map((item: PriceType) => ({
      mass: item.mass,
      regularPrice: Number(item.regularPrice?.toString().split(".").join("")),
      discountPrice: Number(item.discountPrice?.toString().split(".").join("")),
    }));
    const productCreated = await prismadb.product.create({
      data: {
        title,
        categoryId,
        image: {
          create: formattedImage,
        },
        price: {
          create: formattedPrice,
        },
        notion: {
          create: notion,
        },
        desc: {
          create: desc,
        },
      },
    });
    return NextResponse.json(productCreated, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return new NextResponse("Method is incorrect!", { status: 400 });
    }
    const products = await prismadb.product.findMany({
      include: {
        image: true,
        price: true,
        notion: true,
        desc: true,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
