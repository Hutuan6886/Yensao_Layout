import prismadb from "@/lib/prismadb";
import { CategoryType } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (req.method !== "GET") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }

    const category = await prismadb.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_ITEM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (req.method !== "PUT") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }
    const body: CategoryType = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required!", { status: 200 });
    }
    const categoryUpdated: CategoryType = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(categoryUpdated, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_UPDATE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (req.method !== "DELETE") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("Params is unavailable!", { status: 401 });
    }
    const categoryDeleted: CategoryType = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(categoryDeleted, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
