import { NextResponse } from "next/server";
import { modifierEleve } from "../../inscriptions/actions";

export async function POST(request: Request) {
  try {
    const { eleveId, ...data } = await request.json();
    const result = await modifierEleve(eleveId, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}
