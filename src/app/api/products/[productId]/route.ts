import prismadb from "@/lib/prismadb";
import {
  DescriptionType,
  ImageType,
  NotionType,
  PriceType,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (req.method !== "GET") {
      return new NextResponse("Method is incorrect!", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }
    const product = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        image: true,
        price: true,
        notion: true,
        desc: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (req.method !== "PUT") {
      return new NextResponse("Method is incorrect!", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }
    const existingProduct = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        price: true,
      },
    });
    if (!existingProduct) {
      return new NextResponse("Product is unavailable!", { status: 401 });
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
    //todo:update
    const formattedImage = image.map((item: ImageType) => ({
      src: item.src,
    }));
    const formattedPrice = price.map((item: PriceType) => ({
      mass: item.mass,
      regularPrice: Number(item.regularPrice?.toString().split(".").join("")),
      discountPrice: Number(item.discountPrice?.toString().split(".").join("")),
    }));
    const formattedNotion = notion.map((item: NotionType) => ({
      title: item.title,
      content: item.content,
    }));
    const formattedDesc = desc.map((item: DescriptionType) => ({
      title: item.title,
      imgUrl: item.imgUrl,
      content: item.content,
    }));
    const productUpdated = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title,
        categoryId,
        image: {
          deleteMany: {},
          create: formattedImage,
        },
        price: {
          deleteMany: {},
          create: formattedPrice,
        },
        notion: {
          deleteMany: {},
          create: formattedNotion,
        },
        desc: {
          deleteMany: {},
          create: formattedDesc,
        },
      },
    });
    return NextResponse.json(productUpdated, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_UPDATE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (req.method !== "DELETE") {
      return new NextResponse("Method is incorrect!", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }
    const existingProduct = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      },
    });
    if (!existingProduct) {
      return new NextResponse("Product is unavailable!", { status: 401 });
    }
    const productDeleted = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(productDeleted, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
