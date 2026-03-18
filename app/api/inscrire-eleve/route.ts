import { NextResponse } from "next/server";
import { inscrireEleve } from "../../inscriptions/actions";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await inscrireEleve(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}
