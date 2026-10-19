import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Counts from 0 to `value` the first time it scrolls into view, formatted for es-AR (10.001, 0,004).
// The final value is laid out invisibly underneath so the width never changes while counting,
// and screen readers only ever get the final value.
const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOut = t => 1 - Math.pow(1 - t, 4);

export function CountUp({value, decimals=0, delay=0, duration=1600}){
 const fmt = new Intl.NumberFormat('es-AR', {minimumFractionDigits:decimals, maximumFractionDigits:decimals});
 const final = fmt.format(value);
 const live = useRef(null);
 const [state,setState] = useState('idle'); // idle → counting → done
 // Show 0 before the first paint, unless the animation is not going to run.
 useLayoutEffect(()=>{if(!reduceMotion() && 'IntersectionObserver' in window) live.current.textContent = fmt.format(0)},[]);
 useEffect(()=>{
  if(reduceMotion() || !('IntersectionObserver' in window)) return;
  let raf, timer;
  const run = ()=>{
   setState('counting');
   let start;
   const tick = now=>{start ??= now; const t = Math.min(1, (now - start) / duration); live.current.textContent = fmt.format(value * easeOut(t)); if(t < 1) raf = requestAnimationFrame(tick); else setState('done')};
   raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect(); timer = setTimeout(run, delay)}}, {threshold:.6});
  io.observe(live.current);
  return ()=>{io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf)};
 },[]);
 return <span className={`count ${state}`}>
  <span className="count-final" aria-hidden="true">{final}</span>
  <span className="count-live" aria-hidden="true" ref={live}>{final}</span>
  <span className="sr-only">{final}</span>
 </span>;
}
