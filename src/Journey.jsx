import React, { useEffect, useRef, useState } from 'react';

// "Cómo funciona" as a connected route: each step is a node on a lime line that fills in as the
// section scrolls through the viewport (horizontal on desktop, vertical on phones).
const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Journey({steps}){
 const ref = useRef(null);
 const last = steps.length - 1;
 const [progress,setProgress] = useState(1); // 0..1 along the whole route
 useEffect(()=>{
  if(reduceMotion()) return;
  const el = ref.current; let raf = 0;
  const update = ()=>{
   raf = 0;
   const nodes = [...el.querySelectorAll('.journey-node')].map(n=>n.getBoundingClientRect());
   const vh = window.innerHeight, first = nodes[0], end = nodes[last];
   const vertical = end.top - first.top > 10;
   // Vertical: the route follows a line at 70% of the viewport. Horizontal: it fills while the row rises from 85% to 40%.
   const p = vertical ? (vh * .7 - (first.top + first.height / 2)) / (end.top - first.top) : (vh * .85 - first.top) / (vh * .45);
   setProgress(Math.min(1, Math.max(0, p)));
  };
  const onScroll = ()=>{ if(!raf) raf = requestAnimationFrame(update) };
  update();
  window.addEventListener('scroll', onScroll, {passive:true}); window.addEventListener('resize', onScroll);
  return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) };
 },[]);
 const at = progress * last;
 return <ol className="journey" ref={ref}>
  {steps.map(([Icon,title,body],i)=><li key={title} className={at >= i - .02 ? 'lit' : ''} style={{'--seg': Math.min(1, Math.max(0, at - i))}}>
   <span className="journey-node"><Icon size={26} weight="regular"/></span>
   <div className="journey-card"><span className="number">0{i+1}</span><h3>{title}</h3><p>{body}</p></div>
  </li>)}
 </ol>;
}
