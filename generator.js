export function resiFor(date, seq, agent=process.env.AGENT_CODE||'G-005TAM') {
  const yy=String(date.getFullYear()).slice(-2);
  const mm=String(date.getMonth()+1).padStart(2,'0');
  const dd=String(date.getDate()).padStart(2,'0');
  return `${agent}/${yy}${mm}${dd}${String(seq).padStart(4,'0')}`;
}
