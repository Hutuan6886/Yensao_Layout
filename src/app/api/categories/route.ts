import { NextResponse } from "next/server";
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
