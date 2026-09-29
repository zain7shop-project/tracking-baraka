import { load } from 'cheerio';
export function parseTracking(html,resis){
  const $=load(html); const text=$('body').text().replace(/\s+/g,' ').trim();
  return resis.map(resi=>({resi,raw:text,status:'PARSE_PENDING'}));
}
