import XLSX from 'xlsx';
import fs from 'node:fs';
import path from 'node:path';
export function writeReport(rows,date=new Date()){
  const dir=path.resolve('reports'); fs.mkdirSync(dir,{recursive:true});
  const stamp=date.toISOString().slice(0,10);
  const file=path.join(dir,`Tracking-Baraka-${stamp}.xlsx`);
  const data=rows.map((r,i)=>({No:i+1,'No. Resi':r.resi,Shipper:r.shipper||'',Penerima:r.penerima||'', 'Kota Tujuan':r.kota||'', 'Alamat Tujuan':r.alamat||'', 'Status Terakhir':r.status||'', 'Waktu Update':r.updatedAt||''}));
  XLSX.writeFile(XLSX.utils.book_new(),file);
  const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(data),'Tracking'); XLSX.writeFile(wb,file);
  return file;
}
