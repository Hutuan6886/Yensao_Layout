import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { massId: string } }) {
    try {
        if (req.method !== 'PUT') {
            return new NextResponse('Method is unavailable!', { status: 40, statusText: 'Method is unavailable!' })
        }
        if (!params.massId) {
            return new NextResponse('Params is unavailable!', { status: 401, statusText: 'Params is unavailable!' })
        }
        const body = await req.json()
        const { value } = body
        if (!value) {
            return new NextResponse('Value is required!', { status: 400, statusText: 'Value is required!' })
        }
        const existingMass = await prismadb.mass.findFirst({
            where: {
                value: Number(value)
            }
        })
        if (existingMass) {
            return new NextResponse('Value is existed!', { status: 400, statusText: 'Mass value is existed!' })
        }
        const massUpdated = await prismadb.mass.update({
            where: {
                id: params.massId
            },
            data: {
                value: Number(value)
            }
        })
        return NextResponse.json(massUpdated, { status: 200, statusText: 'Updated mass successfully!' })
    } catch (error) {
        console.log("[MASS_UPDATE_PUT]", error);
        return new NextResponse("Internal Error", { status: 500, statusText: 'Internal Error' });
    }
}

export async function DELETE(req: Request, { params }: { params: { massId: string } }) {
    try {
        if (req.method !== "DELETE") {
            return new NextResponse("Method is unavailable!", { status: 401, statusText: 'Method is unavailable!' });
        }
        if (!params.massId) {
            return new NextResponse('Params is unavailable!', { status: 401, statusText: 'Params is unavailable!' })
        }
        const massDeleted = await prismadb.mass.delete({
            where: {
                id: params.massId,
            },
        });
        return NextResponse.json(massDeleted, { status: 200, statusText: 'Deleted mass successfully!' });
    } catch (error) {
        console.log("[MASS_CREATE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}