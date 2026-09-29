import nodemailer from 'nodemailer';
export async function sendReport(file,total,date=new Date()){
  if(!process.env.SMTP_USER||!process.env.SMTP_PASS||!process.env.REPORT_TO) throw new Error('SMTP belum dikonfigurasi.');
  const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||465),secure:String(process.env.SMTP_SECURE||'true')==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
  await transporter.sendMail({from:process.env.SMTP_USER,to:process.env.REPORT_TO,subject:`Laporan Tracking Baraka ${date.toLocaleDateString('id-ID')}`,text:`Tracking selesai. Total resi: ${total}.`,attachments:[{filename:file.split(/[\\/]/).pop(),path:file}]});
}
