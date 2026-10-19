import React, { useEffect, useRef, useState } from 'react';

// Animated layer over the hero artwork, built from /assets/hero-layers (cut from hero.png:
// a background plate without cards, plus each card as its own image). One 6s loop: a light scans
// the spreadsheet, a pulse travels each lime route, the port flashes and the card it reaches bumps
// and its check pulses. Cards sway on their connection point and the faded background cards drift.
// Coordinates are in the artwork's own pixels (1254×1254). The SVG uses "slice" so it crops exactly
// like the <img> with object-fit: cover; the static <img> stays visible until every layer has loaded.
const L = `${import.meta.env.BASE_URL}assets/hero-layers/`;
const routes = [
 {delay:0.8, port:[829,362], d:'M544 467.9C547.3 468 557.3 468 564 468.5C570.7 469.1 577.3 470.3 584 471.1C590.7 471.9 597.3 472.8 604 473.4C610.7 474 617.3 474.7 624 474.5C630.7 474.3 637.3 473.7 644 472C650.7 470.3 657.3 468.1 664 464.3C670.7 460.5 677.3 456.1 684 449.5C690.7 442.8 697.3 432.7 704 424.4C710.7 416.1 717.3 407.1 724 399.8C730.7 392.4 737.3 385.3 744 380.1C750.7 374.9 757.3 371.5 764 368.6C770.7 365.8 777.3 364.1 784 362.9C790.7 361.7 797.3 361.3 804 361.4C810.7 361.5 820.7 363.2 824 363.5'},
 {delay:1.05, port:[829,382], d:'M544 491.7C547.3 491.7 557.3 491.4 564 491.8C570.7 492.2 577.3 493.5 584 494.3C590.7 495.1 597.3 495.9 604 496.7C610.7 497.4 617.3 498.3 624 498.8C630.7 499.3 637.3 499.8 644 499.6C650.7 499.3 657.3 498.8 664 497.2C670.7 495.6 677.3 493.5 684 489.9C690.7 486.3 697.3 482 704 475.5C710.7 469 717.3 460.3 724 450.8C730.7 441.3 737.3 427.7 744 418.6C750.7 409.6 757.3 402 764 396.6C770.7 391.1 777.3 388.3 784 385.9C790.7 383.5 797.3 382.9 804 382.1C810.7 381.3 820.7 381.2 824 381'},
 {delay:1.4, port:[852,596], d:'M544 511C548.7 511.5 561.3 512.8 572 514C582.7 515.2 596 516.8 608 518C620 519.2 632 519.5 644 521C656 522.5 670 524.3 680 527C690 529.7 696 532.3 704 537C712 541.7 721.5 549.7 728 555C734.5 560.3 737 564 743 569C749 574 756.5 581 764 585C771.5 589 780 591.4 788 593C796 594.6 801.7 594.2 812 594.5C822.3 594.8 843.7 594.9 850 595'},
 {delay:1.65, port:[852,615], d:'M544 553.5C547.3 553.8 557.3 554.4 564 555C570.7 555.6 577.3 556.4 584 557.1C590.7 557.7 597.3 558.2 604 559C610.7 559.8 617.3 560.2 624 561.7C630.7 563.2 637.3 564.7 644 567.9C650.7 571 657.3 575.2 664 580.6C670.7 586 677.3 594.4 684 600.4C690.7 606.3 697.3 612.1 704 616.2C710.7 620.4 717.3 623.8 724 625.4C730.7 626.9 737.3 626.1 744 625.7C750.7 625.4 757.3 624.4 764 623.1C770.7 621.7 777.3 619.2 784 617.8C790.7 616.4 797.3 615.3 804 614.7C810.7 614.2 817.3 614.5 824 614.5C830.7 614.5 839.7 614.8 844 614.8C848.3 614.8 849 614.7 850 614.6'},
 {delay:2, port:[802,782], d:'M544 579.2C547.3 579 557.3 578 564 578.2C570.7 578.3 577.3 579.5 584 580.2C590.7 580.8 597.3 581.2 604 582C610.7 582.8 617.3 583.3 624 585.1C630.7 587 637.3 588.9 644 592.9C650.7 596.8 657.3 601.3 664 609C670.7 616.7 677.3 626.2 684 639.1C690.7 652 697.3 671 704 686.6C710.7 702.2 717.3 720.4 724 732.6C730.7 744.7 737.3 752.7 744 759.5C750.7 766.2 757.3 770 764 773.4C770.7 776.7 777.7 778.1 784 779.8C790.3 781.4 799 782.7 802 783.3'},
 {delay:2.25, port:[802,803], d:'M544 607C547.3 607 557.3 606.5 564 606.7C570.7 607 577.3 607.7 584 608.4C590.7 609.2 597.3 609.6 604 611.2C610.7 612.7 617.3 614.5 624 617.8C630.7 621.1 637.3 625 644 631.1C650.7 637.2 657.3 644.3 664 654.4C670.7 664.4 677.3 677.7 684 691.2C690.7 704.6 697.3 722.5 704 735.2C710.7 748 717.3 758.7 724 767.6C730.7 776.4 737.3 783.7 744 788.5C750.7 793.3 757.3 794.3 764 796.3C770.7 798.3 777.7 799.7 784 800.6C790.3 801.5 799 801.4 802 801.5'},
 {delay:2.5, port:[802,803], d:'M544 636C547.3 636.1 557.3 635.9 564 636.2C570.7 636.5 577.3 637 584 637.8C590.7 638.6 597.3 639.1 604 640.9C610.7 642.8 617.3 645 624 648.9C630.7 652.8 637.3 657.5 644 664.4C650.7 671.3 657.3 680.5 664 690.5C670.7 700.4 677.3 713.3 684 724.1C690.7 734.9 697.3 746.5 704 755.2C710.7 763.9 717.3 770.9 724 776.4C730.7 782 737.3 785.2 744 788.5C750.7 791.8 757.3 794.3 764 796.3C770.7 798.3 777.7 799.7 784 800.6C790.3 801.5 799 801.4 802 801.5'}
];
// Pivot = the card's connection point, so swaying never pulls it off its lines.
const cards = [
 {src:'card-1', box:[816,272,315,206], pivot:[832,372], check:[1077.5,383], delay:1.05, dur:7, phase:-1},
 {src:'card-2', box:[840,514,328,204], pivot:[857,605], check:[1114,623], delay:1.65, dur:8.4, phase:-3.5},
 {src:'card-3', box:[792,724,324,220], pivot:[809,792], check:[1063.5,845], delay:2.5, dur:7.6, phase:-5}
];
// Drift direction points away from the lines and the spreadsheet.
const ghosts = [
 {src:'ghost-1', box:[697,162,231,160], d:[-6,-9], dur:8, phase:-2},
 {src:'ghost-2', box:[533,239,195,160], d:[6,-8], dur:9.5, phase:-5},
 {src:'ghost-3', box:[1014,405,214,140], d:[7,-6], dur:7.5, phase:-1},
 {src:'ghost-4', box:[1087,686,167,136], d:[6,8], dur:8.8, phase:-4},
 {src:'ghost-5', box:[560,755,194,156], d:[-7,8], dur:10, phase:-6}
];
const images = 1 + cards.length + ghosts.length;
const layers = ['glow','tail','core','head'];
const Img = ({name,box,onLoad}) => <image href={`${L}${name}.webp`} x={box[0]} y={box[1]} width={box[2]} height={box[3]} onLoad={onLoad}/>;

export function HeroMotion(){
 const ref = useRef(null);
 const [loaded,setLoaded] = useState(0); const [onScreen,setOnScreen] = useState(true);
 const onLoad = ()=>setLoaded(n=>n+1);
 // Pause the loop while the hero is off screen.
 useEffect(()=>{const el=ref.current; if(!el||!('IntersectionObserver' in window))return; const io=new IntersectionObserver(([e])=>setOnScreen(e.isIntersecting)); io.observe(el); return()=>io.disconnect()},[]);
 const cls = ['hero-motion', loaded>=images && 'ready', !onScreen && 'paused'].filter(Boolean).join(' ');
 return <svg ref={ref} className={cls} viewBox="0 0 1254 1254" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs>
   <clipPath id="hm-sheet"><rect x="143" y="398" width="392" height="438" rx="4"/></clipPath>
   <linearGradient id="hm-scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9ffb0" stopOpacity="0"/><stop offset=".55" stopColor="#e9ffb0" stopOpacity=".22"/><stop offset=".62" stopColor="#f6ffe0" stopOpacity=".5"/><stop offset="1" stopColor="#e9ffb0" stopOpacity="0"/></linearGradient>
  </defs>
  <image href={`${L}plate.webp`} width="1254" height="1254" onLoad={onLoad}/>
  <g clipPath="url(#hm-sheet)"><rect className="scan" x="143" y="352" width="392" height="46" fill="url(#hm-scan)"/></g>
  {ghosts.map(g=><g key={g.src} className="ghost" style={{'--dx':`${g.d[0]}px`,'--dy':`${g.d[1]}px`,'--dur':`${g.dur}s`,'--phase':`${g.phase}s`}}><Img name={g.src} box={g.box} onLoad={onLoad}/></g>)}
  {routes.map((r,i)=><g key={i} className="route" style={{'--delay':`${r.delay}s`}}>
   {layers.map(l=><path key={l} className={`comet ${l}`} d={r.d} pathLength="1"/>)}
  </g>)}
  {cards.map(c=><g key={c.src} className="card" style={{'--px':`${c.pivot[0]}px`,'--py':`${c.pivot[1]}px`,'--dur':`${c.dur}s`,'--phase':`${c.phase}s`}}>
   <g className="card-bump" style={{'--delay':`${c.delay}s`}}>
    <Img name={c.src} box={c.box} onLoad={onLoad}/>
    <circle className="check-glow" cx={c.check[0]} cy={c.check[1]} r="19"/>
    <circle className="check-ring" cx={c.check[0]} cy={c.check[1]} r="21"/>
   </g>
  </g>)}
  {routes.map((r,i)=><circle key={i} className="port-flash" cx={r.port[0]} cy={r.port[1]} r="5" style={{'--delay':`${r.delay}s`}}/>)}
 </svg>;
}
