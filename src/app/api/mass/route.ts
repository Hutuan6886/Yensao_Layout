import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return new NextResponse("Method is unavailable!", { status: 401, statusText: 'Method is unavailable!' });
    }
    const body = await req.json();
    const { value } = body;

    if (!value) {
      return new NextResponse("Mass value is required!", { status: 401, statusText: 'Mass value is required!' });
    }
    const existingMass = await prismadb.mass.findFirst({
      where: {
        value: Number(value)
      }
    })
    if (existingMass) {
      return new NextResponse("Mass value is existed!", { status: 401, statusText: 'Mass value is existed!' });
    }
    const massCreated = await prismadb.mass.create({
      data: {
        value: Number(value),
      },
    });
    return NextResponse.json(massCreated, { status: 200, statusText: 'Created new mass successfully!' });
  } catch (error) {
    console.log("[MASS_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
