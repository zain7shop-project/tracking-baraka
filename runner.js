import 'dotenv/config';
import { trackBatch } from './baraka.js';
import { resiFor } from './generator.js';
import { writeReport } from './report.js';
import { sendReport } from './mailer.js';

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const max=Number(process.env.MAX_RESI||150), batch=Number(process.env.BATCH_SIZE||3), delay=Number(process.env.BATCH_DELAY_MS||2500);
const today=new Date();

async function main(){
  const rows=[];
  for(let start=1;start<=max;start+=batch){
    const resis=Array.from({length:Math.min(batch,max-start+1)},(_,i)=>resiFor(today,start+i));
    console.log('TRACK',resis.join(', '));
    const result=await trackBatch(resis,{headless:String(process.env.HEADLESS||'true')==='true'});
    rows.push(...result);
    await sleep(delay);
  }
  const file=writeReport(rows,today); await sendReport(file,rows.length,today); console.log(`DONE ${file} total=${rows.length}`);
}
main().catch(e=>{console.error(e);process.exit(1)});
