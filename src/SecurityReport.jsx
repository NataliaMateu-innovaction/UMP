import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ShieldCheck } from '@phosphor-icons/react';

// Security controls as a verification report: the checks tick one after another the first time
// the panel scrolls into view. Without motion (or IntersectionObserver) they start ticked.
const EXPLORER = 'https://explorer.testnet.arc.io/address/0xa8765a8296c70A66713876558B70F811de948A55';
const animate = () => typeof matchMedia === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;

export function SecurityReport({items}){
 const ref = useRef(null);
 const [checked,setChecked] = useState(true);
 useLayoutEffect(()=>{if(animate()) setChecked(false)},[]);
 useEffect(()=>{
  if(!animate()) return;
  const io = new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect(); setChecked(true)}}, {threshold:.25});
  io.observe(ref.current);
  return ()=>io.disconnect();
 },[]);
 return <div className={checked?'report checked':'report'} ref={ref}>
  <div className="report-head"><ShieldCheck size={22} weight="regular"/><span>Controles de seguridad</span><span className="report-meta">BatchDistributor v6 · Arc Testnet</span></div>
  <ul className="report-list">{items.map(([title,body],i)=><li key={title} style={{'--i':i}}>
   <span className="report-check" aria-hidden="true"><Check size={14} weight="bold"/></span>
   <div><h3>{title}</h3><p>{body}</p>{i===0&&<a className="inline-link" href={EXPLORER} target="_blank" rel="noreferrer">Ver 0xa876…8A55 en el explorador <ArrowUpRight size={16}/></a>}</div>
  </li>)}</ul>
 </div>;
}
