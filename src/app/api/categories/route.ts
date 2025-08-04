import { NextRequest, NextResponse } from "next/server";
import { CategoryType } from "@/types/types";
import prismadb from "@/lib/prismadb";

//todo: POST CREATE NEW CATEGORY
export async function POST(req: Request) {
  try {
    const method = req.method;
    if (method !== "POST") {
      return new NextResponse("Method is incorrect!", { status: 401, statusText: "Method is incorrect!" });
    }
    const body: CategoryType = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Category name value is required!", {
        status: 406, statusText: "Category name value is required!"
      });
    }
    const existingCategory: CategoryType | null = await prismadb.category.findFirst({
      where: {
        name,
      },
    });
    if (existingCategory) {
      return new NextResponse("Category name already exists!", { status: 406, statusText: "Category name already exists!" })
    }
    const categoryCreated: CategoryType = await prismadb.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(categoryCreated, { status: 200, statusText: "Category created successfully!" });
  } catch (error: unknown) {
    console.log("[CATEGORY_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500, statusText: "Internal Error" });
  }
}

//todo: GET ALL CATEGORIES
export async function GET(req: Request) {
  try {
    const method = req.method;
    if (method !== "GET") {
      return new NextResponse("Method is incorrect!", { status: 401, statusText: "Method is incorrect!" });
    }
    const catrgories: CategoryType[] = await prismadb.category.findMany();
    return NextResponse.json(catrgories, { status: 200, statusText: "Categories fetched successfully!" });
  } catch (error: unknown) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500, statusText: "Internal Error" });
  }
}

//todo: UPDATE SORT CATEGORIES
export async function PUT(req: NextRequest) {
  try {
    if (req.method != "PUT") {
      return new NextResponse("Method is incorrect!", { status: 401 });
    }
    const categories: CategoryType[] = await req.json();

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
  } catch (error) {
    console.log("[CATEGORIES_UPDATE_PUT]", error);
  }
}
