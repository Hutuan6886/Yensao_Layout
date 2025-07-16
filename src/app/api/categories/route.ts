import { NextRequest, NextResponse } from "next/server";
import { CategoryType } from "@/types/types";
import prismadb from "@/lib/prismadb";

//todo: POST CREATE NEW CATEGORY
export async function POST(req: Request) {
  try {
    const method = req.method;
    if (method !== "POST") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    const body: CategoryType = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Category name value is required!", {
        status: 406,
      });
    }

    const categoryCreated: CategoryType = await prismadb.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(categoryCreated, { status: 200 });
  } catch (error: unknown) {
    console.log("[CATEGORY_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//todo: GET ALL CATEGORIES
export async function GET(req: Request) {
  try {
    const method = req.method;
    if (method !== "GET") {
      return new NextResponse("Method is available!", { status: 401 });
    }
    const catrgories: CategoryType[] = await prismadb.category.findMany();
    return NextResponse.json(catrgories, { status: 200 });
  } catch (error: unknown) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//todo: UPDATE SORT CATEGORIES
export async function PUT(req: NextRequest) {
  try {
    if (req.method != "PUT") {
      return new NextResponse("Method is available!", { status: 401 });
    }
    const categories: CategoryType[] = await req.json();
    console.log("categories", categories);

    //todo:dùng for update tuần tự thành phần trong mảng => promiseAll
    for (const category of categories) {
      await prismadb.category.update({
        where: {
          id: category.id,
        },
        data: {
          name: category.name,
        },
      });
    }
    return NextResponse.json("", { status: 200 });
  } catch (error) {}
}
