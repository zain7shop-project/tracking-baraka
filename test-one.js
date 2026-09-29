import 'dotenv/config';
import { trackBatch } from './baraka.js';
const resi=process.argv[2]||'G-005TAM/2609280009';
const out=await trackBatch([resi],{headless:false});
console.dir(out,{depth:null});
