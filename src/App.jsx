import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, ArrowUpRight, Wallet, FileText, Signature, Play, Lightning, Coins, ShieldCheck, Fingerprint, Globe, CheckCircle, List, X, Plus, Users, Buildings, Gift, ChartLine, PaperPlaneTilt } from '@phosphor-icons/react';
import '@fontsource-variable/inter';
import { HeroMotion } from './HeroMotion.jsx';
import { CountUp } from './CountUp.jsx';
import { Journey } from './Journey.jsx';
import { CodeTerminal } from './CodeTerminal.jsx';
import { SecurityReport } from './SecurityReport.jsx';
const A = `${import.meta.env.BASE_URL}assets/`;
// The start buttons and legal links go to the redesigned pages in public/ (app sign-in mockup and legal texts).
// The real app lives at https://apisix-production-e04e.up.railway.app; wiring it in is a later step.
const APP = import.meta.env.VITE_APP_URL || '/app';
const TERMS = import.meta.env.VITE_TERMS_URL || '/legal/terms';
const DISCLAIMER = import.meta.env.VITE_DISCLAIMER_URL || '/legal/disclaimer';
const DOCS = 'https://github.com/DApps-Factory/-ARC-NextGenPayments/blob/mvp/apps/backend/README.md';
const steps = [
 [Wallet,'Conectá tu wallet','MetaMask, Ledger o cualquier wallet EIP-⁠1193. Tu wallet es tu cuenta.'],
 [FileText,'Subí el CSV o Excel','Una fila por pago: wallet, monto y referencia. O creá el lote desde tu sistema con la API.'],
 [Signature,'Verificá y firmá una vez','Tu navegador revisa el lote antes de firmar. Una sola firma autoriza todos los pagos.'],
 [Play,'Seguí los pagos en vivo','Cada pago con su hash de transacción. Al terminar, exportá el Excel de comprobantes.']
];
const benefits = [
 [Lightning,'Velocidad','Miles de pagos en minutos, ejecutados en paralelo.'],
 [Coins,'Costo','Centavos de gas por pago y un 1% de plataforma, informado antes de firmar.'],
 [Wallet,'Control','Los fondos quedan en tu wallet hasta que se ejecuta cada pago.'],
 [Fingerprint,'Trazabilidad y conciliación','Un hash por pago, estado en vivo y un Excel listo para conciliar.'],
 [CheckCircle,'Simple, sin registro','Sin formularios ni aprobaciones: conectás la wallet y empezás.'],
 [Globe,'Global','Disponible 24/7 y en 6 idiomas, para pagar a cualquier wallet del mundo.']
];
const usecases = [
 [Users,'Nómina','Los sueldos de todo el equipo en un solo lote.'],
 [Buildings,'Proveedores','Pagos a proveedores con la referencia de cada factura.'],
 [ChartLine,'Comisiones','Comisiones de vendedores y afiliados, período a período.'],
 [Gift,'Premios y airdrops corporativos','Incentivos, premios y airdrops para clientes y comunidades.'],
 [PaperPlaneTilt,'Remesas','Envíos a familias y colaboradores en otros países.']
];
const security = [
 ['Contrato v6 verificado','El contrato BatchDistributor v6 se puede revisar en el explorador de la red.'],
 ['EIP-712 y Merkle','Firmás datos legibles, y un árbol Merkle ata cada pago a esa única firma.'],
 ['Ejecución acotada','Solo los relayers del lote pueden ejecutar, y un pago nunca se ejecuta dos veces.'],
 ['Verificación en el navegador','Antes de firmar, tu navegador recalcula el lote y lo compara con lo que vas a firmar.'],
 ['Auditoría basada en OWASP','Revisión de seguridad con el marco OWASP y sus correcciones aplicadas.'],
 ['Antifragilidad','Reintentos, varios proveedores RPC y conciliación contra la cadena.']
];
const faqs = [
 ['¿Tengo que registrarme?','No. Conectás tu wallet y firmás un mensaje para iniciar sesión. No pedimos email ni datos personales.'],
 ['¿Ustedes custodian mis fondos?','No. Los USDC quedan en tu wallet, y el contrato solo puede mover lo que autorizaste con tu firma, pago por pago.'],
 ['¿Cuánto cuesta?','El gas de la red (centavos por pago) más un 1% de plataforma. Ves el total exacto antes de firmar.'],
 ['¿Qué pasa si un pago falla?','Se reintenta automáticamente. Si no se puede completar, queda marcado con su motivo y ese monto no sale de tu wallet.'],
 ['¿Funciona con Ledger?','Sí. Podés firmar con tu Ledger a través de MetaMask, y la app te guía para revisar los datos en la pantalla del dispositivo.'],
 ['¿Hay una API?','Sí. Creás lotes con una API REST y una API key, recibís webhooks firmados y consultás el estado de cada pago.']
];
const sample = `# 1. Create the batch (Excel, CSV or JSON)
curl -X POST https://<host>/api/v1/batches \\
  -H "X-API-Key: $API_KEY" \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -F file=@payroll.xlsx
# -> 201 { "batchId": "42", "typedData": { "startBatch": { ... } } }

# 2. Sign typedData.startBatch (EIP-712) with the funder wallet
curl -X POST https://<host>/api/v1/batches/42/signature \\
  -H "X-API-Key: $API_KEY" -H "Idempotency-Key: $(uuidgen)" \\
  -H "Content-Type: application/json" \\
  -d '{"startSignature":"0x..."}'

# 3. Webhooks: HMAC X-Signature, ordered by X-Event-Seq`;
function CTA({small=false}){return <a className={`button primary ${small?'small':''}`} href={APP}>Empezar ahora <ArrowRight size={20}/></a>}
function Brand(){return <a className="brand" href="#top" aria-label="USDC Massive Payments, inicio"><img src={`${A}ump.png`} alt="UMP" width="92" height="55"/><span>USDC Massive Payments</span></a>}
export function App(){
 const [menu,setMenu]=useState(false);
 useEffect(()=>{if(!menu)return; const onKey=e=>{if(e.key==='Escape')setMenu(false)}; window.addEventListener('keydown',onKey); return()=>window.removeEventListener('keydown',onKey)},[menu]);
 const [showTop,setShowTop]=useState(false);
 useEffect(()=>{const onScroll=()=>setShowTop(window.scrollY>600); onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <><a className="skip" href="#main">Saltar al contenido</a>
 <header id="top"><div className="shell header-inner"><Brand/><nav className={menu?'nav open':'nav'} aria-label="Navegación principal" id="navigation">{[['#how','Cómo funciona'],['#benefits','Beneficios'],['#security','Seguridad'],['#faq','FAQ']].map(([href,text])=><a key={href} href={href} onClick={()=>setMenu(false)}>{text}</a>)}</nav><div className="header-actions"><CTA small/><button className="menu-toggle" aria-label={menu?'Cerrar menú':'Abrir menú'} aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?<X size={24}/>:<List size={24}/>}</button></div></div></header>
 <main id="main"><section className="hero shell" aria-labelledby="hero-title"><div className="hero-copy"><span className="testnet"><span aria-hidden="true"/>Disponible en Arc Testnet</span><h1 id="hero-title">Payroll y pagos<br/> masivos en USDC,<br/> en segundos.</h1><p>Subí tu Excel, firmá una sola vez y cada pago llega con su comprobante on-chain. Sin registro ni intermediarios: solo tu wallet.</p><div className="hero-actions"><CTA/><a className="text-link" href="#how">Ver cómo funciona <ArrowRight size={20}/></a></div></div><div className="hero-visual"><HeroMotion/><picture><source type="image/avif" srcSet={`${A}hero-800.avif 800w, ${A}hero-1254.avif 1254w`} sizes="(max-width: 760px) 100vw, 55vw"/><source type="image/webp" srcSet={`${A}hero-800.webp 800w, ${A}hero-1254.webp 1254w`} sizes="(max-width: 760px) 100vw, 55vw"/><img src={`${A}hero.png`} alt="Una planilla de empleados distribuye pagos a múltiples wallets con sus comprobantes." fetchPriority="high" width="1254" height="1254"/></picture></div></section>
 <section className="stats" aria-label="Cifras medidas"><div className="shell"><div className="stats-grid"><div><strong><CountUp value={10001}/></strong><span>pagos en 7&nbsp;min 50&nbsp;s</span></div><div><strong>~<CountUp value={27} delay={150}/></strong><span>pagos por segundo</span></div><div><strong>~<CountUp value={0.004} decimals={3} delay={300}/> <small>USDC</small></strong><span>de gas por pago</span></div><div><strong><CountUp value={1} delay={450} duration={900}/></strong><span>firma por lote</span></div></div><p className="stats-note">Medido en Arc Testnet.</p></div></section>
 <section id="how" className="section shell how"><div className="ruled-heading"><h2>Cómo funciona</h2><span/></div><p className="section-sub">Cuatro pasos, de la planilla a los comprobantes.</p><Journey steps={steps}/></section>
 <section id="benefits" className="section benefits"><div className="shell"><div className="section-heading"><div><span className="eyebrow">BENEFICIOS</span><h2>Muchos pagos.<br/>Todo bajo control.</h2></div><p>Pensado para equipos de finanzas que pagan a muchas personas a la vez.</p></div><div className="benefit-grid">{benefits.map(([Icon,title,body])=><article key={title}><Icon size={30} weight="light"/><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
 <section id="usecases" className="section shell usecases"><div className="usecase-intro"><span className="eyebrow">CASOS DE USO</span><h2>Un lote.<br/>Muchas posibilidades.</h2><a className="text-link" href={APP}>Creá tu primer lote <ArrowRight size={20}/></a></div><div className="usecase-list">{usecases.map(([Icon,title,body],i)=><article key={title}><span className="number">0{i+1}</span><Icon size={25} weight="light"/><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
 <section id="developers" className="section developer-section"><div className="shell developers"><div><span className="eyebrow">PARA DESARROLLADORES</span><h2>Tu sistema.<br/>Nuestra API.</h2><p className="lead">Integrá los pagos masivos en tu sistema con una API REST.</p><ul className="dev-list"><li><CheckCircle/><span>Creá el lote con <code>POST /api/v1/batches</code> y firmá con la wallet el typedData {'EIP-⁠712'} que devuelve.</span></li><li><CheckCircle/><span>Webhooks firmados con HMAC, que se ordenan por <code>X-Event-Seq</code>.</span></li><li><CheckCircle/><span>Idempotencia con <code>Idempotency-Key</code>: reintentar nunca duplica un lote.</span></li></ul><a className="text-link" href={DOCS} target="_blank" rel="noreferrer">Ver la documentación de la API <ArrowUpRight size={20}/></a></div><CodeTerminal title="Crear y firmar un lote" code={sample}/></div></section>
 <section id="security" className="section shell security"><div className="section-heading"><div><span className="eyebrow"><ShieldCheck size={20}/> SEGURIDAD Y TECNOLOGÍA</span><h2>Verificable.<br/>De principio a fin.</h2></div><p>Cada control importante se apoya en tu firma y en el contrato, no en la confianza.</p></div><SecurityReport items={security}/></section>
 <section id="faq" className="section faq-section"><div className="shell faq"><div><span className="eyebrow">ANTES DE EMPEZAR</span><h2>Preguntas<br/>frecuentes.</h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<Plus size={22}/></summary><p>{a}</p></details>)}</div></div></section>
 <section className="final-cta"><div className="shell"><span className="eyebrow">DE TU PLANILLA AL MUNDO</span><h2>Mandá tu primer lote <br/>en minutos.</h2><p>Sin registro, sin papeleo y sin esperas.<br/>Solo tu wallet y tu planilla.</p><CTA/></div></section></main>
 <footer><div className="shell"><div className="footer-top"><Brand/><a href="https://dappsfactory.io/" target="_blank" rel="noreferrer">Powered by <strong>DApps Factory</strong><ArrowUpRight size={16}/></a></div><nav className="footer-links" aria-label="Enlaces del sitio"><a href="https://github.com/DApps-Factory/-ARC-NextGenPayments">GitHub</a><a href={DOCS}>Documentación</a><a href="https://dappsfactory.io/contacto/">Contacto</a><a href={TERMS}>Términos y Condiciones</a><a href={DISCLAIMER}>Descargo de responsabilidad</a></nav><div className="footer-bottom"><span className="testnet">Arc Testnet</span><p>USDC es una marca registrada de Circle Internet Financial, LLC. USDC Massive Payments es una herramienta independiente, no afiliada ni respaldada por Circle. Arc es una red de Circle.</p></div></div></footer>
 <button className={showTop?'to-top visible':'to-top'} onClick={()=>window.scrollTo({top:0})} aria-label="Volver arriba"><ArrowUp size={18} weight="bold"/></button></>;
}
