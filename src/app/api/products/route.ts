import prismadb from "@/lib/prismadb";
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

    const productCreated = await prismadb.product.create({
      data: {
        title,
        minPrice: price[0].regularPrice - price[0].discountPrice,
        maxPrice: price[price.length - 1].regularPrice - (price[price.length - 1].discountPrice || 0),
        categoryId,
        image: {
          create: image,
        },
        price: {
          create: price,
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
        price: {
          include: {
            Mass: true,
          },
        },
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
