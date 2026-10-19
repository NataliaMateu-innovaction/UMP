import React, { useState } from 'react';
import { Copy, Check } from '@phosphor-icons/react';

// The API example as a terminal window. Highlighting is cosmetic: the "$" prompt is drawn by CSS,
// so "Copiar" still copies the exact sample text.
const TOKEN = /("[^"]*"|'[^']*'|\$\([^)]*\)|\$[A-Z_]+|(?<=^|\s)-[A-Za-z](?=\s)|^curl\b)/g;
const kind = t => t === 'curl' ? 'tk-cmd' : t[0] === '"' || t[0] === "'" ? 'tk-str' : t[0] === '$' ? 'tk-var' : 'tk-flag';
function highlight(line){
 if(line.startsWith('#')) return <span className="tk-comment">{line}</span>;
 return line.split(TOKEN).map((part,i)=>i % 2 ? <span key={i} className={kind(part)}>{part}</span> : part);
}

export function CodeTerminal({title, code}){
 const [copied,setCopied] = useState(false); const [copyError,setCopyError] = useState(false);
 async function copyCode(){try{await navigator.clipboard.writeText(code);setCopied(true);setCopyError(false);setTimeout(()=>setCopied(false),2200)}catch{setCopyError(true)}}
 const lines = code.split('\n');
 return <div className="terminal">
  <div className="terminal-bar"><span className="terminal-dots" aria-hidden="true"><i/><i/><i/></span><span className="terminal-title">{title}</span><button onClick={copyCode} aria-label="Copiar ejemplo de código">{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copiado':'Copiar'}</button></div>
  <pre tabIndex="0" aria-label="Ejemplo de API REST"><code>{lines.map((line,i)=><React.Fragment key={i}><span className={line.startsWith('curl')?'tk-line tk-prompt':'tk-line'}>{highlight(line)}{i===lines.length-1&&<span className="terminal-cursor" aria-hidden="true"/>}</span>{'\n'}</React.Fragment>)}</code></pre>
  <span className="sr-only" role="status">{copied?'Código copiado al portapapeles':copyError?'No se pudo copiar. Seleccioná el código para copiarlo manualmente.':''}</span>
 </div>;
}
