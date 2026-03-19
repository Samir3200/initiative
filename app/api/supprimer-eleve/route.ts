import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";
import { eleves } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }
    try {
        await db.delete(eleves).where(eq(eleves.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}
