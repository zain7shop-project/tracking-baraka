import { chromium } from 'playwright';
import { parseTracking } from './parser.js';

const URL=process.env.BARAKA_URL||'https://barakaexpress.co.id/cek-resi/';
const delay=ms=>new Promise(r=>setTimeout(r,ms));

export async function trackBatch(resis,{headless=true}={}) {
  const browser=await chromium.launch({headless});
  const page=await browser.newPage({locale:'id-ID'});
  try {
    await page.goto(URL,{waitUntil:'domcontentloaded',timeout:60000});
    await page.waitForLoadState('networkidle',{timeout:15000}).catch(()=>{});
    const inputs=page.locator('input').filter({has:undefined});
    const candidates=await page.locator('input').evaluateAll(els=>els.map((e,i)=>({i,name:e.name,id:e.id,placeholder:e.placeholder,type:e.type})).filter(x=>x.type!=='hidden'));
    const visible=candidates.filter(x=>/resi|waybill|pelac|tracking/i.test(`${x.name} ${x.id} ${x.placeholder}`));
    if(!visible.length) throw new Error('Input resi Baraka tidak ditemukan. Selector perlu disesuaikan dari halaman live.');
    const first=page.locator('input').nth(visible[0].i);
    await first.fill(resis[0]);
    for(let i=1;i<resis.length;i++){
      const add=page.getByRole('button',{name:/tambah/i});
      await add.click();
      const all=page.locator('input').filter({hasText:''});
      const vals=await page.locator('input').evaluateAll(els=>els.map((e,i)=>({i,name:e.name,id:e.id,placeholder:e.placeholder,type:e.type,value:e.value})).filter(x=>x.type!=='hidden'));
      const matches=vals.filter(x=>/resi|waybill|pelac|tracking/i.test(`${x.name} ${x.id} ${x.placeholder}`));
      const target=page.locator('input').nth(matches[matches.length-1].i);
      await target.fill(resis[i]);
    }
    await page.getByRole('button',{name:/lacak/i}).click();
    await page.waitForTimeout(2500);
    await page.waitForLoadState('networkidle',{timeout:10000}).catch(()=>{});
    const html=await page.locator('body').innerHTML();
    return parseTracking(html,resis);
  } finally { await browser.close(); }
}
