import { NextRequest, NextResponse } from "next/server";
import { getEleves } from "../../eleves/getEleves";
import ExcelJS from "exceljs";

export async function GET(request: NextRequest) {
    const data = await getEleves();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Elèves");
    worksheet.columns = [
        { header: "Nom", key: "nom", width: 20 },
        { header: "Prénom", key: "prenom", width: 20 },
        { header: "Classe", key: "classe", width: 15 },
        { header: "Ville", key: "villeNom", width: 20 },
        { header: "Diplome", key: "diplome", width: 20 },
    ];
    data.forEach(eleve => worksheet.addRow({
        ...eleve,
        diplome: eleve.diplome ?? ""
    }));
    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
        status: 200,
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": "attachment; filename=eleves.xlsx"
        }
    });
}
