import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    const body = await req.json();
    const { value } = body;

    if (!value) {
      return new NextResponse("Mass value is required!", { status: 401 });
    }
    const massCreated = await prismadb.mass.create({
      data: {
        value: Number(value),
      },
    });
    return NextResponse.json(massCreated, { status: 200 });
  } catch (error) {
    console.log("[MASS_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (req.method !== "PUT") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
  } catch (error) {
    console.log("[MASS_UPDATE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (req.method !== "DELETE") {
      return new NextResponse("Method is unavailable!", { status: 401 });
    }
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return new NextResponse("Id mass is required!", { status: 401 });
    }
    const massDeleted = await prismadb.mass.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(massDeleted, { status: 200 });
  } catch (error) {
    console.log("[MASS_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
