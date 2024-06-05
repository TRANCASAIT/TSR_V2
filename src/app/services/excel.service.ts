import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { JwtService } from './jwt.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private _workbook!: Workbook;
  uname: string = '';
  date: Date = new Date();
  nameDocument: string = `tsr_report_${this.date}.xlsx`;
  lang: string = '';

  constructor(
    private jwt: JwtService,
    private lss: LocalstorageService
  ) { }

  dowloadExcel(dataExcel: any): void {
    console.log(dataExcel)
    this.uname = this.jwt.getUserName();
    this._workbook = new Workbook();
    this._workbook.creator = this.uname;
    this._createTsrTable(dataExcel);

    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, this.nameDocument);
    });
  }

  private _createTsrTable(dataSet: any): void {
    //creamos la primera hoja
    const sheet = this._workbook.addWorksheet('tsr_report');
    const {
      serviceRequestId,
      customerName,
      boxNumber,
      operationTypeName,
      stopNumber,
      createdAt,
      tmwOrder,
      statusDescription,
      inward,
      ace,
      layout,
      layoutAccepteddtm,
      acceptedBy,
      uuid,
      consignmentNote,
      xml,
      originalPdf,
      operationsPdf,
    } = dataSet;
    //establecemos ancho y estilo de columnas
    sheet.getColumn("A").width = 21;
    sheet.getColumn("B").width = 21;
    sheet.getColumn("C").width = 21;
    sheet.getColumn("D").width = 21;
    sheet.getColumn("E").width = 21;
    sheet.getColumn("F").width = 21;
    sheet.getColumn("G").width = 21;
    sheet.getColumn("H").width = 21;
    sheet.getColumn("I").width = 21;
    sheet.getColumn("J").width = 21;
    sheet.getColumn("K").width = 21;
    sheet.getColumn("L").width = 21;
    sheet.getColumn("M").width = 21;
    sheet.getColumn("N").width = 21;
    sheet.getColumn("O").width = 21;
    sheet.getColumn("P").width = 21;
    sheet.getColumn("Q").width = 21;
    sheet.getColumn("R").width = 21;
    sheet.getColumn("S").width = 21;

    sheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', wrapText: true };
    });

    let titleCell = sheet.getCell('C2');
    titleCell.value = 'Reporte de solicitudes';
    titleCell.style.font = { bold: true, size: 22 };

    let headerRow = sheet.getRow(4);

    headerRow.values = [
      'Folio',
      'Referencia',
      'Cliente',
      'Caja',
      'Operacion',
      'Stop',
      'Creacion',
      'TMW',
      'Estatus',
      'Entry/Manifiesto',
      'ACE',
      'Layout',
      'Layout Aceptado',
      'Aceptado Por',
      'Folio Fiscal',
      'Num. Carta Porte',
      'XML',
      'PDF Original',
      'PDF Operacional',
    ];

    headerRow.font = { bold: true, size: 12 }
    const rowsToInsert = sheet.getRows(5, dataSet.length)!;
    for (let index = 0; index < rowsToInsert?.length; index++) {
      const row = rowsToInsert[index]; //obtenemos el item segun la iteracion
      const itemData = dataSet[index]; //obtenemos la primera fila segun el index de la iteracion

      //los valores de itemData seran asignados al row
      row.values = [
        itemData.serviceRequestId,
        itemData.reference,
        itemData.customerName,
        itemData.boxNumber,
        itemData.operationTypeName,
        itemData.stopNumber,
        itemData.createdAt,
        itemData.tmwOrder,
        itemData.statusDescription,
        itemData.inward,
        itemData.ace,
        itemData.layout,
        itemData.layoutAccepteddtm,
        itemData.acceptedBy,
        itemData.uuid,
        itemData.consignmentNote,
        itemData.xml,
        itemData.originalPdf,
        itemData.operationsPdf,
      ];
    }
  }

}
