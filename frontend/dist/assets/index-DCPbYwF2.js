(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function _d(i){const t={jazz:{file:"soft-jazz.mp3",label:"Soft jazz"},piano:{file:"quiet-piano.mp3",label:"Quiet piano"}},e="terrarium-music-v1";let n="jazz",s=.3;try{const C=JSON.parse(localStorage.getItem(e)||"null");(C?.track==="jazz"||C?.track==="piano")&&(n=C.track),typeof C?.volume=="number"&&Number.isFinite(C.volume)&&(s=Math.max(0,Math.min(1,C.volume)))}catch{}const r=document.querySelector("#sound"),o=document.querySelector("#music-settings"),a=document.querySelector("#music-panel"),c=document.querySelector("#music-track"),l=document.querySelector("#music-volume"),h=document.querySelector("#music-volume-value"),u=document.querySelector("#music-play"),d=document.querySelector("#music-status"),f=document.createElement("audio");f.id="habitat-music",f.loop=!0,f.preload="none",f.hidden=!0,f.src=`/assets/music/${t[n].file}`,a.append(f);let g=null,v=null,m=!1,p=!1,y=0;const x=()=>{try{localStorage.setItem(e,JSON.stringify({track:n,volume:s}))}catch{}},_=()=>{g&&v?(v.gain.cancelScheduledValues(g.currentTime),v.gain.setTargetAtTime(s,g.currentTime,.04)):f.volume=s,l.value=String(Math.round(s*100)),h.value=`${Math.round(s*100)}%`},M=()=>{r.innerHTML=`<i data-lucide="${m?"volume-2":"volume-x"}"></i>`,r.setAttribute("aria-label",m?"Pause music":"Play music"),r.title=m?"Pause music":"Play music",r.setAttribute("aria-pressed",String(m)),u.textContent=m?"Pause music":"Play music",i()},E=()=>{y++,m=!1,p=!1,f.pause(),d.textContent="Paused",M()},T=()=>{E(),d.textContent="Music could not play. Press Play to try again."},A=async()=>{const C=++y;m=!0,p=!0,d.textContent="Loading music…",M();try{if(!g){const U=window.AudioContext||window.webkitAudioContext;U&&(g=new U,v=g.createGain(),v.gain.value=0,g.createMediaElementSource(f).connect(v).connect(g.destination),f.volume=1)}_();const D=g?.resume(),P=f.play();if(await Promise.all([D,P]),C!==y)return;p=!1,d.textContent=`Playing · ${t[n].label}`}catch{C===y&&T()}};f.addEventListener("error",()=>{m&&f.error&&T()}),f.addEventListener("pause",()=>{m&&!p&&f.paused&&E()});const b=()=>{m?E():A()};r.onclick=b,u.onclick=b,c.value=n,c.onchange=()=>{const C=c.value;if(C!=="jazz"&&C!=="piano")return;const D=m;y++,p=D,f.pause(),n=C,f.src=`/assets/music/${t[n].file}`,x(),D?A():d.textContent="Paused"},l.oninput=()=>{s=Number(l.value)/100,_(),x()};const S=()=>{a.hidden=!0,o.setAttribute("aria-expanded","false")};o.onclick=()=>{a.hidden=!a.hidden,o.setAttribute("aria-expanded",String(!a.hidden))},document.addEventListener("click",C=>{!a.hidden&&!a.contains(C.target)&&!o.contains(C.target)&&!r.contains(C.target)&&S()}),document.addEventListener("keydown",C=>{C.key==="Escape"&&!a.hidden&&(S(),o.focus())}),window.addEventListener("pagehide",()=>{E(),g?.suspend()}),_(),M()}const vd={desk:"At the keyboard",sleep:"Napping",stretch:"Stretching",coffee:"Coffee break",hunt:"Hunting fruit flies"},Ml={desk:[12,25],sleep:[24,38],stretch:[9,12],coffee:[12,16],hunt:[18,24]};function xd(i){const t=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(i),e=s=>t.find(r=>r.type===s).value,n=Number(e("hour"))*60+Number(e("minute"));return["Sat","Sun"].includes(e("weekday"))||n<570||n>=960}class yd{constructor(t=Math.random){this.random=t,this.residents=Array.from({length:4},(e,n)=>({action:"desk",elapsed:0,duration:0,wait:3+n*3+t()*3,bag:[]}))}random;residents;cooldown=0;between(t){return t[0]+this.random()*(t[1]-t[0])}reset(t){const e=this.residents[t];e.action="desk",e.elapsed=0,e.wait=4+t*3+this.random()*8}step(t,e,n){const s=Math.max(0,Math.min(t,.25));return this.cooldown=Math.max(0,this.cooldown-s),this.residents.forEach((r,o)=>{if(!e||n[o]!==!1){r.action!=="desk"&&this.reset(o);return}if(r.action!=="desk"){r.elapsed+=s,r.elapsed>=r.duration&&(this.reset(o),r.wait=this.between(Ml.desk));return}if(r.wait-=s,!(r.wait>0||this.cooldown>0||this.residents.filter(a=>a.action!=="desk").length>=3)){if(!r.bag.length){r.bag=["sleep","stretch","coffee","hunt"];for(let a=r.bag.length-1;a>0;a--){const c=Math.floor(this.random()*(a+1));[r.bag[a],r.bag[c]]=[r.bag[c],r.bag[a]]}}o<2&&r.bag.at(-1)==="hunt"&&this.residents.slice(0,2).some((a,c)=>c!==o&&a.action==="hunt")||(r.action=r.bag.pop(),r.elapsed=0,r.duration=this.between(Ml[r.action]),this.cooldown=2+this.random()*2)}}),this.residents}}function Md(i,t=new Date){if(i.market_clock_fresh===!0)return i.market_open?{allowed:!1,label:"Market open · at the desks"}:{allowed:!0,label:"Market closed · routines enabled"};const e=i.server_time?new Date(i.server_time):t;return Number.isFinite(e.getTime())&&xd(e)?{allowed:!0,label:"Off hours · routines enabled"}:{allowed:!1,label:i.credentials_present?"Waiting for the market clock":"Market hours · at the desks"}}const fu=(i,t,e=[])=>{const n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(t).forEach(s=>{n.setAttribute(s,String(t[s]))}),e.length&&e.forEach(s=>{const r=fu(...s);n.appendChild(r)}),n};var Sd=([i,t,e])=>fu(i,t,e);const bd=i=>Array.from(i.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),Ed=i=>typeof i=="string"?i:!i||!i.class?"":i.class&&typeof i.class=="string"?i.class.split(" "):i.class&&Array.isArray(i.class)?i.class:"",Td=i=>i.flatMap(Ed).map(e=>e.trim()).filter(Boolean).filter((e,n,s)=>s.indexOf(e)===n).join(" "),wd=i=>i.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,n)=>e.toUpperCase()+n.toLowerCase()),Sl=(i,{nameAttr:t,icons:e,attrs:n})=>{const s=i.getAttribute(t);if(s==null)return;const r=wd(s),o=e[r];if(!o)return console.warn(`${i.outerHTML} icon name was not found in the provided icons object.`);const a=bd(i),[c,l,h]=o,u={...l,"data-lucide":s,...n,...a},d=Td(["lucide",`lucide-${s}`,a,n]);d&&Object.assign(u,{class:d});const f=Sd([c,u,h]);return i.parentNode?.replaceChild(f,i)};const ae={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const Ad=["svg",ae,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];const Rd=["svg",ae,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];const Cd=["svg",ae,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];const Pd=["svg",ae,[["path",{d:"M12 16v5"}],["path",{d:"M16 14v7"}],["path",{d:"M20 10v11"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"}],["path",{d:"M4 18v3"}],["path",{d:"M8 14v7"}]]];const Id=["svg",ae,[["path",{d:"M20 6 9 17l-5-5"}]]];const Dd=["svg",ae,[["path",{d:"m9 18 6-6-6-6"}]]];const Ld=["svg",ae,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]];const Ud=["svg",ae,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16.5 12"}]]];const Nd=["svg",ae,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];const Fd=["svg",ae,[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]]];const Od=["svg",ae,[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]]];const Bd=["svg",ae,[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]]];const zd=["svg",ae,[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"}]]];const kd=["svg",ae,[["polyline",{points:"15 3 21 3 21 9"}],["polyline",{points:"9 21 3 21 3 15"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]]];const Hd=["svg",ae,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];const Vd=["svg",ae,[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]]];const Gd=["svg",ae,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];const Wd=["svg",ae,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];const Xd=["svg",ae,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{cx:"12",cy:"12",r:"1"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"}]]];const qd=["svg",ae,[["path",{d:"M20 7h-9"}],["path",{d:"M14 17H5"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]]];const Yd=["svg",ae,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];const $d=["svg",ae,[["path",{d:"M7 20h10"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"}]]];const jd=["svg",ae,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]]];const Kd=["svg",ae,[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]]];const Zd=["svg",ae,[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]]];const Jd=["svg",ae,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];const Qd=({icons:i={},nameAttr:t="data-lucide",attrs:e={}}={})=>{if(!Object.values(i).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const n=document.querySelectorAll(`[${t}]`);if(Array.from(n).forEach(s=>Sl(s,{nameAttr:t,icons:i,attrs:e})),t==="data-lucide"){const s=document.querySelectorAll("[icon-name]");s.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(s).forEach(r=>Sl(r,{nameAttr:"icon-name",icons:i,attrs:e})))}};const ur="180",fs={ROTATE:0,DOLLY:1,PAN:2},hs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tf=0,bl=1,ef=2,pu=1,mu=2,kn=3,Dn=0,Ze=1,Ae=2,si=0,ps=1,El=2,Tl=3,wl=4,nf=5,wi=100,sf=101,rf=102,of=103,af=104,cf=200,lf=201,hf=202,uf=203,Ga=204,Wa=205,df=206,ff=207,pf=208,mf=209,gf=210,_f=211,vf=212,xf=213,yf=214,Xa=0,qa=1,Ya=2,Ms=3,$a=4,ja=5,Ka=6,Za=7,gu=0,Mf=1,Sf=2,ri=0,bf=1,Ef=2,Tf=3,_u=4,wf=5,Af=6,Rf=7,vu=300,Ss=301,bs=302,Ja=303,Qa=304,Do=306,Ci=1e3,Pi=1001,tc=1002,hn=1003,Cf=1004,_r=1005,In=1006,Xo=1007,Ii=1008,Ln=1009,xu=1010,yu=1011,sr=1012,Wc=1013,oi=1014,mn=1015,dr=1016,Xc=1017,qc=1018,rr=1020,Mu=35902,Su=35899,bu=1021,Eu=1022,ln=1023,or=1026,ar=1027,Yc=1028,Lo=1029,Tu=1030,$c=1031,jc=1033,po=33776,mo=33777,go=33778,_o=33779,ec=35840,nc=35841,ic=35842,sc=35843,rc=36196,oc=37492,ac=37496,cc=37808,lc=37809,hc=37810,uc=37811,dc=37812,fc=37813,pc=37814,mc=37815,gc=37816,_c=37817,vc=37818,xc=37819,yc=37820,Mc=37821,Sc=36492,bc=36494,Ec=36495,Tc=36283,wc=36284,Ac=36285,Rc=36286,Pf=3200,If=3201,wu=0,Df=1,ni="",nn="srgb",Es="srgb-linear",So="linear",ee="srgb",Oi=7680,Al=519,Lf=512,Uf=513,Nf=514,Au=515,Ff=516,Of=517,Bf=518,zf=519,Rl=35044,Cl=35048,Pl="300 es",bn=2e3,bo=2001;class Ui{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Il=1234567;const Zs=Math.PI/180,Ts=180/Math.PI;function As(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Ut(i,t,e){return Math.max(t,Math.min(e,i))}function Kc(i,t){return(i%t+t)%t}function kf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hf(i,t,e){return i!==t?(e-i)/(t-i):0}function Js(i,t,e){return(1-e)*i+e*t}function Vf(i,t,e,n){return Js(i,t,1-Math.exp(-e*n))}function Gf(i,t=1){return t-Math.abs(Kc(i,t*2)-t)}function Wf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Xf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function qf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Yf(i,t){return i+Math.random()*(t-i)}function $f(i){return i*(.5-Math.random())}function jf(i){i!==void 0&&(Il=i);let t=Il+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Kf(i){return i*Zs}function Zf(i){return i*Ts}function Jf(i){return(i&i-1)===0&&i!==0}function Qf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ep(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function je(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const cr={DEG2RAD:Zs,RAD2DEG:Ts,generateUUID:As,clamp:Ut,euclideanModulo:Kc,mapLinear:kf,inverseLerp:Hf,lerp:Js,damp:Vf,pingpong:Gf,smoothstep:Wf,smootherstep:Xf,randInt:qf,randFloat:Yf,randFloatSpread:$f,seededRandom:jf,degToRad:Kf,radToDeg:Zf,isPowerOfTwo:Jf,ceilPowerOfTwo:Qf,floorPowerOfTwo:tp,setQuaternionFromProperEuler:ep,normalize:je,denormalize:cs};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ai{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*v,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const M=Math.sqrt(x),E=Math.atan2(M,p*y);m=Math.sin(m*E)/M,a=Math.sin(a*E)/M}const _=a*y;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-a){const M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ut(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qo.copy(this).projectOnVector(t),this.sub(qo)}reflect(t){return this.sub(qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qo=new I,Dl=new ai;class Ht{constructor(t,e,n,s,r,o,a,c,l){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],x=s[4],_=s[7],M=s[2],E=s[5],T=s[8];return r[0]=o*v+a*y+c*M,r[3]=o*m+a*x+c*E,r[6]=o*p+a*_+c*T,r[1]=l*v+h*y+u*M,r[4]=l*m+h*x+u*E,r[7]=l*p+h*_+u*T,r[2]=d*v+f*y+g*M,r[5]=d*m+f*x+g*E,r[8]=d*p+f*_+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yo.makeScale(t,e)),this}rotate(t){return this.premultiply(Yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yo=new Ht;function Ru(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Eo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function np(){const i=Eo("canvas");return i.style.display="block",i}const Ll={};function lr(i){i in Ll||(Ll[i]=!0,console.warn(i))}function ip(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ul=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sp(){const i={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ee&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ee&&(s.r=ms(s.r),s.g=ms(s.g),s.b=ms(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?So:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return lr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return lr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Es]:{primaries:t,whitePoint:n,transfer:So,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const jt=sp();function Wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ms(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Bi;class rp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bi===void 0&&(Bi=Eo("canvas")),Bi.width=t.width,Bi.height=t.height;const s=Bi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Bi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Eo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Wn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wn(e[n]/255)*255):e[n]=Wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let op=0;class Zc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=As(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push($o(s[o].image)):r.push($o(s[o]))}else r=$o(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function $o(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ap=0;const jo=new I;class qe extends Ui{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=Pi,s=Pi,r=In,o=Ii,a=ln,c=Ln,l=qe.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=As(),this.name="",this.source=new Zc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(jo).x}get height(){return this.source.getSize(jo).y}get depth(){return this.source.getSize(jo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ci:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case tc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ci:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case tc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=vu;qe.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,s=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,_=(f+1)/2,M=(p+1)/2,E=(h+d)/4,T=(u+v)/4,A=(g+m)/4;return x>_&&x>M?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=E/n,r=T/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=A/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=T/r,s=A/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this.w=Ut(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this.w=Ut(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cp extends Ui{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new qe(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:In,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Zc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Li extends cp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Cu extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lp extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(t.matrixWorld),this.union(vr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Us),xr.subVectors(this.max,Us),zi.subVectors(t.a,Us),ki.subVectors(t.b,Us),Hi.subVectors(t.c,Us),$n.subVectors(ki,zi),jn.subVectors(Hi,ki),di.subVectors(zi,Hi);let e=[0,-$n.z,$n.y,0,-jn.z,jn.y,0,-di.z,di.y,$n.z,0,-$n.x,jn.z,0,-jn.x,di.z,0,-di.x,-$n.y,$n.x,0,-jn.y,jn.x,0,-di.y,di.x,0];return!Ko(e,zi,ki,Hi,xr)||(e=[1,0,0,0,1,0,0,0,1],!Ko(e,zi,ki,Hi,xr))?!1:(yr.crossVectors($n,jn),e=[yr.x,yr.y,yr.z],Ko(e,zi,ki,Hi,xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Nn=[new I,new I,new I,new I,new I,new I,new I,new I],vn=new I,vr=new oe,zi=new I,ki=new I,Hi=new I,$n=new I,jn=new I,di=new I,Us=new I,xr=new I,yr=new I,fi=new I;function Ko(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){fi.fromArray(i,r);const a=s.x*Math.abs(fi.x)+s.y*Math.abs(fi.y)+s.z*Math.abs(fi.z),c=t.dot(fi),l=e.dot(fi),h=n.dot(fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const hp=new oe,Ns=new I,Zo=new I;class _n{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);const e=Ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(Zo)),this.expandByPoint(Ns.copy(t.center).sub(Zo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Fn=new I,Jo=new I,Mr=new I,Kn=new I,Qo=new I,Sr=new I,ta=new I;class Rs{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Jo.copy(t).add(e).multiplyScalar(.5),Mr.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Jo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Mr),a=Kn.dot(this.direction),c=-Kn.dot(Mr),l=Kn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Jo).addScaledVector(Mr,d),f}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);const n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,s,r){Qo.subVectors(e,t),Sr.subVectors(n,t),ta.crossVectors(Qo,Sr);let o=this.direction.dot(ta),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,t);const c=a*this.direction.dot(Sr.crossVectors(Kn,Sr));if(c<0)return null;const l=a*this.direction.dot(Qo.cross(Kn));if(l<0||c+l>o)return null;const h=-a*Kn.dot(ta);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),o=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(up,t,dp)}lookAt(t,e,n){const s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),Zn.crossVectors(n,an),Zn.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),Zn.crossVectors(n,an)),Zn.normalize(),br.crossVectors(an,Zn),s[0]=Zn.x,s[4]=br.x,s[8]=an.x,s[1]=Zn.y,s[5]=br.y,s[9]=an.y,s[2]=Zn.z,s[6]=br.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],x=n[7],_=n[11],M=n[15],E=s[0],T=s[4],A=s[8],b=s[12],S=s[1],C=s[5],D=s[9],P=s[13],U=s[2],F=s[6],H=s[10],Y=s[14],X=s[3],it=s[7],ct=s[11],gt=s[15];return r[0]=o*E+a*S+c*U+l*X,r[4]=o*T+a*C+c*F+l*it,r[8]=o*A+a*D+c*H+l*ct,r[12]=o*b+a*P+c*Y+l*gt,r[1]=h*E+u*S+d*U+f*X,r[5]=h*T+u*C+d*F+f*it,r[9]=h*A+u*D+d*H+f*ct,r[13]=h*b+u*P+d*Y+f*gt,r[2]=g*E+v*S+m*U+p*X,r[6]=g*T+v*C+m*F+p*it,r[10]=g*A+v*D+m*H+p*ct,r[14]=g*b+v*P+m*Y+p*gt,r[3]=y*E+x*S+_*U+M*X,r[7]=y*T+x*C+_*F+M*it,r[11]=y*A+x*D+_*H+M*ct,r[15]=y*b+x*P+_*Y+M*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+v*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=u*m*l-v*d*l+v*c*f-a*m*f-u*c*p+a*d*p,x=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*v*l-g*u*l+g*a*f-o*v*f-h*a*p+o*u*p,M=g*u*c-h*v*c-g*a*d+o*v*d+h*a*m-o*u*m,E=e*y+n*x+s*_+r*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=y*T,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*T,t[2]=(a*m*r-v*c*r+v*s*l-n*m*l-a*s*p+n*c*p)*T,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*T,t[4]=x*T,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*T,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*T,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*T,t[8]=_*T,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*T,t[10]=(o*v*r-g*a*r+g*n*l-e*v*l-o*n*p+e*a*p)*T,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*T,t[12]=M*T,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*T,t[14]=(g*a*s-o*v*s-g*n*c+e*v*c+o*n*m-e*a*m)*T,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,y=c*l,x=c*h,_=c*u,M=n.x,E=n.y,T=n.z;return s[0]=(1-(v+p))*M,s[1]=(f+_)*M,s[2]=(g-x)*M,s[3]=0,s[4]=(f-_)*E,s[5]=(1-(d+p))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(g+x)*T,s[9]=(m-y)*T,s[10]=(1-(d+v))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Vi.set(s[0],s[1],s[2]).length();const o=Vi.set(s[4],s[5],s[6]).length(),a=Vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);const l=1/r,h=1/o,u=1/a;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,e.setFromRotationMatrix(xn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=bn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===bn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===bo)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=bn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===bn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===bo)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Vi=new I,xn=new Wt,up=new I(0,0,0),dp=new I(1,1,1),Zn=new I,br=new I,an=new I,Fl=new Wt,Ol=new ai;class Fe{constructor(t=0,e=0,n=0,s=Fe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ol.setFromEuler(this),this.setFromQuaternion(Ol,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fe.DEFAULT_ORDER="XYZ";class Jc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fp=0;const Bl=new I,Gi=new ai,On=new Wt,Er=new I,Fs=new I,pp=new I,mp=new ai,zl=new I(1,0,0),kl=new I(0,1,0),Hl=new I(0,0,1),Vl={type:"added"},gp={type:"removed"},Wi={type:"childadded",child:null},ea={type:"childremoved",child:null};class _e extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new I,e=new Fe,n=new ai,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Ht}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis(zl,t)}rotateY(t){return this.rotateOnAxis(kl,t)}rotateZ(t){return this.rotateOnAxis(Hl,t)}translateOnAxis(t,e){return Bl.copy(t).applyQuaternion(this.quaternion),this.position.add(Bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zl,t)}translateY(t){return this.translateOnAxis(kl,t)}translateZ(t){return this.translateOnAxis(Hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Er.copy(t):Er.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Fs,Er,this.up):On.lookAt(Er,Fs,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Gi.setFromRotationMatrix(On),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gp),ea.child=t,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,t,pp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,mp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}_e.DEFAULT_UP=new I(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new I,Bn=new I,na=new I,zn=new I,Xi=new I,qi=new I,Gl=new I,ia=new I,sa=new I,ra=new I,oa=new ie,aa=new ie,ca=new ie;class ze{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Bn.subVectors(n,e),na.subVectors(t,e);const o=yn.dot(yn),a=yn.dot(Bn),c=yn.dot(na),l=Bn.dot(Bn),h=Bn.dot(na),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(o,zn.y),c.addScaledVector(a,zn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return oa.setScalar(0),aa.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(t,e),aa.fromBufferAttribute(t,n),ca.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(oa,r.x),o.addScaledVector(aa,r.y),o.addScaledVector(ca,r.z),o}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Bn.subVectors(t,e),yn.cross(Bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),yn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ze.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Xi.subVectors(s,n),qi.subVectors(r,n),ia.subVectors(t,n);const c=Xi.dot(ia),l=qi.dot(ia);if(c<=0&&l<=0)return e.copy(n);sa.subVectors(t,s);const h=Xi.dot(sa),u=qi.dot(sa);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Xi,o);ra.subVectors(t,r);const f=Xi.dot(ra),g=qi.dot(ra);if(g>=0&&f<=g)return e.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(qi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Gl.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Gl,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Xi,o).addScaledVector(qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function la(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=Kc(t,1),e=Ut(e,0,1),n=Ut(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=la(o,r,t+1/3),this.g=la(o,r,t),this.b=la(o,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=Pu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return jt.workingToColorSpace(He.copy(this),t),Math.round(Ut(He.r*255,0,255))*65536+Math.round(Ut(He.g*255,0,255))*256+Math.round(Ut(He.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(He.copy(this),e);const n=He.r,s=He.g,r=He.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=nn){jt.workingToColorSpace(He.copy(this),t);const e=He.r,n=He.g,s=He.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Tr);const n=Js(Jn.h,Tr.h,e),s=Js(Jn.s,Tr.s,e),r=Js(Jn.l,Tr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new Xt;Xt.NAMES=Pu;let _p=0;class Ni extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=As(),this.name="",this.type="Material",this.blending=ps,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=Wa,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ga&&(n.blendSrc=this.blendSrc),this.blendDst!==Wa&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class gs extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new I,wr=new ot;let vp=0;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=je(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array),r=je(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rl&&(t.usage=this.usage),t}}class Iu extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Du extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xp=0;const fn=new Wt,ha=new _e,Yi=new I,cn=new oe,Os=new oe,Ue=new I;class Se extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ru(t)?Du:Iu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return ha.lookAt(t),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Kt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oe);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Os.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(cn.min,Os.min),cn.expandByPoint(Ue),Ue.addVectors(cn.max,Os.max),cn.expandByPoint(Ue)):(cn.expandByPoint(Os.min),cn.expandByPoint(Os.max))}cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ue.fromBufferAttribute(a,l),c&&(Yi.fromBufferAttribute(t,l),Ue.add(Yi)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<n.count;A++)a[A]=new I,c[A]=new I;const l=new I,h=new I,u=new I,d=new ot,f=new ot,g=new ot,v=new I,m=new I;function p(A,b,S){l.fromBufferAttribute(n,A),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),a[A].add(v),a[b].add(v),a[S].add(v),c[A].add(m),c[b].add(m),c[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let A=0,b=y.length;A<b;++A){const S=y[A],C=S.start,D=S.count;for(let P=C,U=C+D;P<U;P+=3)p(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const x=new I,_=new I,M=new I,E=new I;function T(A){M.fromBufferAttribute(s,A),E.copy(M);const b=a[A];x.copy(b),x.sub(M.multiplyScalar(M.dot(b))).normalize(),_.crossVectors(E,b);const C=_.dot(c[A])<0?-1:1;o.setXYZW(A,x.x,x.y,x.z,C)}for(let A=0,b=y.length;A<b;++A){const S=y[A],C=S.start,D=S.count;for(let P=C,U=C+D;P<U;P+=3)T(t.getX(P+0)),T(t.getX(P+1)),T(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ye(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wl=new Wt,pi=new Rs,Ar=new _n,Xl=new I,Rr=new I,Cr=new I,Pr=new I,ua=new I,Ir=new I,ql=new I,Dr=new I;class he extends _e{constructor(t=new Se,e=new gs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ir.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ua.fromBufferAttribute(u,t),o?Ir.addScaledVector(ua,h):Ir.addScaledVector(ua.sub(e),h))}e.add(Ir)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),pi.copy(t.ray).recast(t.near),!(Ar.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Ar,Xl)===null||pi.origin.distanceToSquared(Xl)>(t.far-t.near)**2))&&(Wl.copy(r).invert(),pi.copy(t.ray).applyMatrix4(Wl),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,pi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,M=x;_<M;_+=3){const E=a.getX(_),T=a.getX(_+1),A=a.getX(_+2);s=Lr(this,p,t,n,l,h,u,E,T,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),x=a.getX(m+1),_=a.getX(m+2);s=Lr(this,o,t,n,l,h,u,y,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,M=x;_<M;_+=3){const E=_,T=_+1,A=_+2;s=Lr(this,p,t,n,l,h,u,E,T,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,x=m+1,_=m+2;s=Lr(this,o,t,n,l,h,u,y,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function yp(i,t,e,n,s,r,o,a){let c;if(t.side===Ze?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Dn,a),c===null)return null;Dr.copy(a),Dr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Dr);return l<e.near||l>e.far?null:{distance:l,point:Dr.clone(),object:i}}function Lr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Rr),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Pr);const h=yp(i,t,e,n,Rr,Cr,Pr,ql);if(h){const u=new I;ze.getBarycoord(ql,Rr,Cr,Pr,u),s&&(h.uv=ze.getInterpolatedAttribute(s,a,c,l,u,new ot)),r&&(h.uv1=ze.getInterpolatedAttribute(r,a,c,l,u,new ot)),o&&(h.normal=ze.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};ze.getNormal(Rr,Cr,Pr,d.normal),h.face=d,h.barycoord=u}return h}class Cs extends Se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(u,2));function g(v,m,p,y,x,_,M,E,T,A,b){const S=_/T,C=M/A,D=_/2,P=M/2,U=E/2,F=T+1,H=A+1;let Y=0,X=0;const it=new I;for(let ct=0;ct<H;ct++){const gt=ct*C-P;for(let zt=0;zt<F;zt++){const Qt=zt*S-D;it[v]=Qt*y,it[m]=gt*x,it[p]=U,l.push(it.x,it.y,it.z),it[v]=0,it[m]=0,it[p]=E>0?1:-1,h.push(it.x,it.y,it.z),u.push(zt/T),u.push(1-ct/A),Y+=1}}for(let ct=0;ct<A;ct++)for(let gt=0;gt<T;gt++){const zt=d+gt+F*ct,Qt=d+gt+F*(ct+1),ce=d+(gt+1)+F*(ct+1),qt=d+(gt+1)+F*ct;c.push(zt,Qt,qt),c.push(Qt,ce,qt),X+=6}a.addGroup(f,X,b),f+=X,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ws(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ke(i){const t={};for(let e=0;e<i.length;e++){const n=ws(i[e]);for(const s in n)t[s]=n[s]}return t}function Mp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Lu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Sp={clone:ws,merge:Ke};var bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ep=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bp,this.fragmentShader=Ep,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ws(t.uniforms),this.uniformsGroups=Mp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Uu extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new I,Yl=new ot,$l=new ot;class sn extends Uu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ts*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,Yl,$l),e.subVectors($l,Yl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,ji=1;class Tp extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn($i,ji,t,e);s.layers=this.layers,this.add(s);const r=new sn($i,ji,t,e);r.layers=this.layers,this.add(r);const o=new sn($i,ji,t,e);o.layers=this.layers,this.add(o);const a=new sn($i,ji,t,e);a.layers=this.layers,this.add(a);const c=new sn($i,ji,t,e);c.layers=this.layers,this.add(c);const l=new sn($i,ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===bo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nu extends qe{constructor(t=[],e=Ss,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wp extends Li{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Nu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Cs(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:si});r.uniforms.tEquirect.value=e;const o=new he(s,r),a=e.minFilter;return e.minFilter===Ii&&(e.minFilter=In),new Tp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Ne extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ap={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ap)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Qc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xt(t),this.density=e}clone(){return new Qc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Rp extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fe,this.environmentIntensity=1,this.environmentRotation=new Fe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class vo extends qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=hn,h=hn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jl extends Ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ki=new Wt,Kl=new Wt,Ur=[],Zl=new oe,Cp=new Wt,Bs=new he,zs=new _n;class Qs extends he{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new jl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new oe),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),Zl.copy(t.boundingBox).applyMatrix4(Ki),this.boundingBox.union(Zl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new _n),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),zs.copy(t.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),t.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ki),Kl.multiplyMatrices(n,Ki),Bs.matrixWorld=Kl,Bs.raycast(t,Ur);for(let o=0,a=Ur.length;o<a;o++){const c=Ur[o];c.instanceId=r,c.object=this,e.push(c)}Ur.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vo(new Float32Array(s*this.count),s,this.count,Yc,mn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const fa=new I,Pp=new I,Ip=new Ht;class Cn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=fa.subVectors(n,e).cross(Pp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ip.getNormalMatrix(t),s=this.coplanarPoint(fa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new _n,Dp=new ot(.5,.5),Nr=new I;class fr{constructor(t=new Cn,e=new Cn,n=new Cn,s=new Cn,r=new Cn,o=new Cn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],y=r[12],x=r[13],_=r[14],M=r[15];if(s[0].setComponents(l-o,f-h,p-g,M-y).normalize(),s[1].setComponents(l+o,f+h,p+g,M+y).normalize(),s[2].setComponents(l+a,f+u,p+v,M+x).normalize(),s[3].setComponents(l-a,f-u,p-v,M-x).normalize(),n)s[4].setComponents(c,d,m,_).normalize(),s[5].setComponents(l-c,f-d,p-m,M-_).normalize();else if(s[4].setComponents(l-c,f-d,p-m,M-_).normalize(),e===bn)s[5].setComponents(l+c,f+d,p+m,M+_).normalize();else if(e===bo)s[5].setComponents(c,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(t){mi.center.set(0,0,0);const e=Dp.distanceTo(t.center);return mi.radius=.7071067811865476+e,mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Nr.x=s.normal.x>0?t.max.x:t.min.x,Nr.y=s.normal.y>0?t.max.y:t.min.y,Nr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const An=new Wt,Rn=new fr;class tl{constructor(){this.coordinateSystem=bn}intersectsObject(t,e){if(!e.isArrayCamera||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){const s=e.cameras[n];if(An.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),Rn.setFromProjectionMatrix(An,s.coordinateSystem,s.reversedDepth),Rn.intersectsObject(t))return!0}return!1}intersectsSprite(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){const s=e.cameras[n];if(An.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),Rn.setFromProjectionMatrix(An,s.coordinateSystem,s.reversedDepth),Rn.intersectsSprite(t))return!0}return!1}intersectsSphere(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){const s=e.cameras[n];if(An.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),Rn.setFromProjectionMatrix(An,s.coordinateSystem,s.reversedDepth),Rn.intersectsSphere(t))return!0}return!1}intersectsBox(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){const s=e.cameras[n];if(An.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),Rn.setFromProjectionMatrix(An,s.coordinateSystem,s.reversedDepth),Rn.intersectsBox(t))return!0}return!1}containsPoint(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){const s=e.cameras[n];if(An.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),Rn.setFromProjectionMatrix(An,s.coordinateSystem,s.reversedDepth),Rn.containsPoint(t))return!0}return!1}clone(){return new tl}}function pa(i,t){return i-t}function Lp(i,t){return i.z-t.z}function Up(i,t){return t.z-i.z}class Np{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,s){const r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=s}reset(){this.list.length=0,this.index=0}}const tn=new Wt,Fp=new Xt(1,1,1),Jl=new fr,Op=new tl,Fr=new oe,gi=new _n,ks=new I,Ql=new I,Bp=new I,ma=new Np,Ve=new he,Or=[];function zp(i,t,e=0){const n=t.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==t.array.constructor){const s=i.count;for(let r=0;r<s;r++)for(let o=0;o<n;o++)t.setComponent(r+e,o,i.getComponent(r,o))}else t.array.set(i.array,e*n);t.needsUpdate=!0}function _i(i,t){if(i.constructor!==t.constructor){const e=Math.min(i.length,t.length);for(let n=0;n<e;n++)t[n]=i[n]}else{const e=Math.min(i.length,t.length);t.set(new i.constructor(i.buffer,0,e))}}class kp extends he{constructor(t,e,n=e*2,s){super(new Se,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new vo(e,t,t,ln,mn);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new vo(e,t,t,Lo,oi);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new vo(e,t,t,ln,mn);n.colorSpace=jt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in t.attributes){const o=t.getAttribute(r),{array:a,itemSize:c,normalized:l}=o,h=new a.constructor(n*c),u=new Ye(h,c,l);e.setAttribute(r,u)}if(t.getIndex()!==null){const r=n>65535?new Uint32Array(s):new Uint16Array(s);e.setIndex(new Ye(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const s=t.getAttribute(n),r=e.getAttribute(n);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){const e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){const e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oe);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,s=e.length;n<s;n++){if(e[n].active===!1)continue;const r=e[n].geometryIndex;this.getMatrixAt(n,tn),this.getBoundingBoxAt(r,Fr).applyMatrix4(tn),t.union(Fr)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,s=e.length;n<s;n++){if(e[n].active===!1)continue;const r=e[n].geometryIndex;this.getMatrixAt(n,tn),this.getBoundingSphereAt(r,gi).applyMatrix4(tn),t.union(gi)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(pa),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;tn.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;const o=this._colorsTexture;return o&&(Fp.toArray(o.image.data,s*4),o.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const o=t.getIndex();if(o!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?o.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(pa),c=this._availableGeometryIds.shift(),r[c]=s):(c=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(c,t),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,c}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,s=n.getIndex()!==null,r=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(s&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const c=a.vertexStart,l=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const u=e.getAttribute(h),d=n.getAttribute(h);zp(u,d,c);const f=u.itemSize;for(let g=u.count,v=l;g<v;g++){const m=c+g;for(let p=0;p<f;p++)d.setComponent(m,p,0)}d.needsUpdate=!0,d.addUpdateRange(c*f,l*f)}if(s){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let d=0;d<o.count;d++)r.setX(h+d,c+o.getX(d));for(let d=o.count,f=u;d<f;d++)r.setX(h+d,c);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=s?a.indexStart:a.vertexStart,a.count=s?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let s=0,r=n.length;s<r;s++)n[s].active&&n[s].geometryIndex===t&&this.deleteInstance(s);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0;const n=this._geometryInfo,s=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){const c=s[o],l=n[c];if(l.active!==!1){if(r.index!==null){if(l.indexStart!==e){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=l,f=r.index,g=f.array,v=t-u;for(let m=h;m<h+d;m++)g[m]=g[m]+v;f.array.copyWithin(e,h,h+d),f.addUpdateRange(e,d),l.indexStart=e}e+=l.reservedIndexCount}if(l.vertexStart!==t){const{vertexStart:h,reservedVertexCount:u}=l,d=r.attributes;for(const f in d){const g=d[f],{array:v,itemSize:m}=g;v.copyWithin(t*m,h*m,(h+u)*m),g.addUpdateRange(t*m,u*m)}l.vertexStart=t}t+=l.reservedVertexCount,l.start=r.index?l.indexStart:l.vertexStart,this._nextIndexStart=r.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[t];if(s.boundingBox===null){const r=new oe,o=n.index,a=n.attributes.position;for(let c=s.start,l=s.start+s.count;c<l;c++){let h=c;o&&(h=o.getX(h)),r.expandByPoint(ks.fromBufferAttribute(a,h))}s.boundingBox=r}return e.copy(s.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[t];if(s.boundingSphere===null){const r=new _n;this.getBoundingBoxAt(t,Fr),Fr.getCenter(r.center);const o=n.index,a=n.attributes.position;let c=0;for(let l=s.start,h=s.start+s.count;l<h;l++){let u=l;o&&(u=o.getX(u)),ks.fromBufferAttribute(a,u),c=Math.max(c,r.center.distanceToSquared(ks))}r.radius=Math.sqrt(c),s.boundingSphere=r}return e.copy(s.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);const n=this._matricesTexture,s=this._matricesTexture.image.data;return e.toArray(s,t*16),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e?this:(this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(pa);e[e.length-1]===n.length-1;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const s=new Int32Array(t),r=new Int32Array(t);_i(this._multiDrawCounts,s),_i(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=t;const o=this._indirectTexture,a=this._matricesTexture,c=this._colorsTexture;o.dispose(),this._initIndirectTexture(),_i(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),_i(a.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),_i(c.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Se,this._initializeGeometry(r));const o=this.geometry;r.index&&_i(r.index.array,o.index.array);for(const a in r.attributes)_i(r.attributes[a].array,o.attributes[a].array)}raycast(t,e){const n=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Ve.material=this.material,Ve.geometry.index=o.index,Ve.geometry.attributes=o.attributes,Ve.geometry.boundingBox===null&&(Ve.geometry.boundingBox=new oe),Ve.geometry.boundingSphere===null&&(Ve.geometry.boundingSphere=new _n);for(let a=0,c=n.length;a<c;a++){if(!n[a].visible||!n[a].active)continue;const l=n[a].geometryIndex,h=s[l];Ve.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Ve.matrixWorld).premultiply(r),this.getBoundingBoxAt(l,Ve.geometry.boundingBox),this.getBoundingSphereAt(l,Ve.geometry.boundingSphere),Ve.raycast(t,Or);for(let u=0,d=Or.length;u<d;u++){const f=Or[u];f.object=this,f.batchId=a,e.push(f)}Or.length=0}Ve.material=null,Ve.geometry.index=null,Ve.geometry.attributes={},Ve.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,n,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=s.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._instanceInfo,l=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,g=f.image.data,v=n.isArrayCamera?Op:Jl;d&&!n.isArrayCamera&&(tn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Jl.setFromProjectionMatrix(tn,n.coordinateSystem,n.reversedDepth));let m=0;if(this.sortObjects){tn.copy(this.matrixWorld).invert(),ks.setFromMatrixPosition(n.matrixWorld).applyMatrix4(tn),Ql.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(tn);for(let x=0,_=c.length;x<_;x++)if(c[x].visible&&c[x].active){const M=c[x].geometryIndex;this.getMatrixAt(x,tn),this.getBoundingSphereAt(M,gi).applyMatrix4(tn);let E=!1;if(d&&(E=!v.intersectsSphere(gi,n)),!E){const T=u[M],A=Bp.subVectors(gi.center,ks).dot(Ql);ma.push(T.start,T.count,A,x)}}const p=ma.list,y=this.customSort;y===null?p.sort(r.transparent?Up:Lp):y.call(this,p,n);for(let x=0,_=p.length;x<_;x++){const M=p[x];l[m]=M.start*a,h[m]=M.count,g[m]=M.index,m++}ma.reset()}else for(let p=0,y=c.length;p<y;p++)if(c[p].visible&&c[p].active){const x=c[p].geometryIndex;let _=!1;if(d&&(this.getMatrixAt(p,tn),this.getBoundingSphereAt(x,gi).applyMatrix4(tn),_=!v.intersectsSphere(gi,n)),!_){const M=u[x];l[m]=M.start*a,h[m]=M.count,g[m]=p,m++}}f.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(t,e,n,s,r,o){this.onBeforeRender(t,null,s,r,o)}}class Hp extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const To=new I,wo=new I,th=new Wt,Hs=new Rs,Br=new _n,ga=new I,eh=new I;class Uo extends _e{constructor(t=new Se,e=new Hp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)To.fromBufferAttribute(e,s-1),wo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=To.distanceTo(wo);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;th.copy(s).invert(),Hs.copy(t.ray).applyMatrix4(th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=l){const p=h.getX(v),y=h.getX(v+1),x=zr(this,t,Hs,c,p,y,v);x&&e.push(x)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=zr(this,t,Hs,c,v,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=l){const p=zr(this,t,Hs,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=zr(this,t,Hs,c,g-1,f,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(To.fromBufferAttribute(a,s),wo.fromBufferAttribute(a,r),e.distanceSqToSegment(To,wo,ga,eh)>n)return;ga.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ga);if(!(l<t.near||l>t.far))return{distance:l,point:eh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const nh=new I,ih=new I;class Fu extends Uo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)nh.fromBufferAttribute(e,s),ih.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+nh.distanceTo(ih);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ou extends Uo{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Vp extends Ni{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const sh=new Wt,Cc=new Rs,kr=new _n,Hr=new I;class Bu extends _e{constructor(t=new Se,e=new Vp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;sh.copy(s).invert(),Cc.copy(t.ray).applyMatrix4(sh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,v=f;g<v;g++){const m=l.getX(g);Hr.fromBufferAttribute(u,m),rh(Hr,m,c,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)Hr.fromBufferAttribute(u,g),rh(Hr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rh(i,t,e,n,s,r,o){const a=Cc.distanceSqToPoint(i);if(a<e){const c=new I;Cc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class zu extends qe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ku extends qe{constructor(t,e,n=oi,s,r,o,a=hn,c=hn,l,h=or,u=1){if(h!==or&&h!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Zc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Hu extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ao extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new I,h=new ot;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(a,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class No extends Se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function y(){const _=new I,M=new I;let E=0;const T=(e-t)/n;for(let A=0;A<=r;A++){const b=[],S=A/r,C=S*(e-t)+t;for(let D=0;D<=s;D++){const P=D/s,U=P*c+a,F=Math.sin(U),H=Math.cos(U);M.x=C*F,M.y=-S*n+m,M.z=C*H,u.push(M.x,M.y,M.z),_.set(F,T,H).normalize(),d.push(_.x,_.y,_.z),f.push(P,1-S),b.push(g++)}v.push(b)}for(let A=0;A<s;A++)for(let b=0;b<r;b++){const S=v[b][A],C=v[b+1][A],D=v[b+1][A+1],P=v[b][A+1];(t>0||b!==0)&&(h.push(S,C,P),E+=3),(e>0||b!==r-1)&&(h.push(C,D,P),E+=3)}l.addGroup(p,E,0),p+=E}function x(_){const M=g,E=new ot,T=new I;let A=0;const b=_===!0?t:e,S=_===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;const C=g;for(let D=0;D<=s;D++){const U=D/s*c+a,F=Math.cos(U),H=Math.sin(U);T.x=b*H,T.y=m*S,T.z=b*F,u.push(T.x,T.y,T.z),d.push(0,S,0),E.x=F*.5+.5,E.y=H*.5*S+.5,f.push(E.x,E.y),g++}for(let D=0;D<s;D++){const P=M+D,U=C+D;_===!0?h.push(U,U+1,P):h.push(U+1,U,P),A+=3}l.addGroup(p,A,_===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new No(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class el extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const x=new I,_=new I,M=new I;for(let E=0;E<e.length;E+=3)f(e[E+0],x),f(e[E+1],_),f(e[E+2],M),c(x,_,M,y)}function c(y,x,_,M){const E=M+1,T=[];for(let A=0;A<=E;A++){T[A]=[];const b=y.clone().lerp(_,A/E),S=x.clone().lerp(_,A/E),C=E-A;for(let D=0;D<=C;D++)D===0&&A===E?T[A][D]=b:T[A][D]=b.clone().lerp(S,D/C)}for(let A=0;A<E;A++)for(let b=0;b<2*(E-A)-1;b++){const S=Math.floor(b/2);b%2===0?(d(T[A][S+1]),d(T[A+1][S]),d(T[A][S])):(d(T[A][S+1]),d(T[A+1][S+1]),d(T[A+1][S]))}}function l(y){const x=new I;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(y),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function h(){const y=new I;for(let x=0;x<r.length;x+=3){y.x=r[x+0],y.y=r[x+1],y.z=r[x+2];const _=m(y)/2/Math.PI+.5,M=p(y)/Math.PI+.5;o.push(_,1-M)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const x=o[y+0],_=o[y+2],M=o[y+4],E=Math.max(x,_,M),T=Math.min(x,_,M);E>.9&&T<.1&&(x<.2&&(o[y+0]+=1),_<.2&&(o[y+2]+=1),M<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,x){const _=y*3;x.x=t[_+0],x.y=t[_+1],x.z=t[_+2]}function g(){const y=new I,x=new I,_=new I,M=new I,E=new ot,T=new ot,A=new ot;for(let b=0,S=0;b<r.length;b+=9,S+=6){y.set(r[b+0],r[b+1],r[b+2]),x.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),E.set(o[S+0],o[S+1]),T.set(o[S+2],o[S+3]),A.set(o[S+4],o[S+5]),M.copy(y).add(x).add(_).divideScalar(3);const C=m(M);v(E,S+0,y,C),v(T,S+2,x,C),v(A,S+4,_,C)}}function v(y,x,_,M){M<0&&y.x===1&&(o[x]=y.x-1),_.x===0&&_.z===0&&(o[x]=M/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.vertices,t.indices,t.radius,t.details)}}class Yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new I,s=[],r=[],o=[],a=new I,c=new Wt;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ut(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ut(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vu extends Yn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gp extends Vu{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Vr=new I,_a=new nl,va=new nl,xa=new nl;class _s extends Yn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Vr.subVectors(s[0],s[1]).add(s[0]),l=Vr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),_a.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,v,m),va.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,v,m),xa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(_a.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),va.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),xa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(_a.calc(c),va.calc(c),xa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function oh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Wp(i,t){const e=1-i;return e*e*t}function Xp(i,t){return 2*(1-i)*i*t}function qp(i,t){return i*i*t}function tr(i,t,e,n){return Wp(i,t)+Xp(i,e)+qp(i,n)}function Yp(i,t){const e=1-i;return e*e*e*t}function $p(i,t){const e=1-i;return 3*e*e*i*t}function jp(i,t){return 3*(1-i)*i*i*t}function Kp(i,t){return i*i*i*t}function er(i,t,e,n,s){return Yp(i,t)+$p(i,e)+jp(i,n)+Kp(i,s)}class Zp extends Yn{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jp extends Yn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y),er(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Qp extends Yn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tm extends Yn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class em extends Yn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gu extends Yn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y),tr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nm extends Yn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(oh(a,c.x,l.x,h.x,u.x),oh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var im=Object.freeze({__proto__:null,ArcCurve:Gp,CatmullRomCurve3:_s,CubicBezierCurve:Zp,CubicBezierCurve3:Jp,EllipseCurve:Vu,LineCurve:Qp,LineCurve3:tm,QuadraticBezierCurve:em,QuadraticBezierCurve3:Gu,SplineCurve:nm});class nr extends el{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new nr(t.radius,t.detail)}}class Gn extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let x=0;x<l;x++){const _=x*u-r;g.push(_,-y,0),v.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const x=y+l*p,_=y+l*(p+1),M=y+1+l*(p+1),E=y+1+l*p;f.push(x,_,E),f.push(_,M,E)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gn(t.width,t.height,t.widthSegments,t.heightSegments)}}class il extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new I,g=new ot;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,x=y,_=y+n+1,M=y+n+2,E=y+1;a.push(x,_,E),a.push(_,M,E)}}this.setIndex(a),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new il(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class vs extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new I,d=new I,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],x=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let M=0;M<=e;M++){const E=M/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(E+_,1-x),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const x=h[p][y+1],_=h[p][y],M=h[p+1][y],E=h[p+1][y+1];(p!==0||o>0)&&f.push(x,_,E),(p!==n-1||c<Math.PI)&&f.push(_,M,E)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class sl extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new I,u=new I,d=new I;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,y=(s+1)*f+g;o.push(v,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class xs extends Se{constructor(t=new Gu(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new I,c=new I,l=new ot;let h=new I;const u=[],d=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function v(){for(let x=0;x<e;x++)m(x);m(r===!1?e:0),y(),p()}function m(x){h=t.getPointAt(x/e,h);const _=o.normals[x],M=o.binormals[x];for(let E=0;E<=s;E++){const T=E/s*Math.PI*2,A=Math.sin(T),b=-Math.cos(T);c.x=b*_.x+A*M.x,c.y=b*_.y+A*M.y,c.z=b*_.z+A*M.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let _=1;_<=s;_++){const M=(s+1)*(x-1)+(_-1),E=(s+1)*x+(_-1),T=(s+1)*x+_,A=(s+1)*(x-1)+_;g.push(M,E,A),g.push(E,T,A)}}function y(){for(let x=0;x<=e;x++)for(let _=0;_<=s;_++)l.x=x/e,l.y=_/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new xs(new im[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ge extends Ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wu,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gr extends Ge{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Xt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class sm extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class rm extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Fo extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class om extends Fo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ya=new Wt,ah=new I,ch=new I;class rl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fr,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(ah),ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ch),e.updateMatrixWorld(),ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ya,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ya)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class am extends rl{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Ts*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class cm extends Fo{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new am}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const lh=new Wt,Vs=new I,Ma=new I;class lm extends rl{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),Ma.copy(n.position),Ma.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ma),n.updateMatrixWorld(),s.makeTranslation(-Vs.x,-Vs.y,-Vs.z),lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh,n.coordinateSystem,n.reversedDepth)}}class hm extends Fo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Wu extends Uu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class um extends rl{constructor(){super(new Wu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dm extends Fo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new um}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class fm extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class pm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const hh=new Wt;class mm{constructor(t,e,n=0,s=1/0){this.ray=new Rs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Jc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return hh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hh),this}intersectObject(t,e=!0,n=[]){return Pc(t,this,n,e),n.sort(uh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Pc(t[s],this,n,e);return n.sort(uh),n}}function uh(i,t){return i.distance-t.distance}function Pc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Pc(r[o],t,e,!0)}}class dh{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ut(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const fh=new I,Wr=new I,Zi=new I,Ji=new I,Sa=new I,gm=new I,_m=new I;class Xn{constructor(t=new I,e=new I){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){fh.subVectors(t,this.start),Wr.subVectors(this.end,this.start);const n=Wr.dot(Wr);let r=Wr.dot(fh)/n;return e&&(r=Ut(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=gm,n=_m){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;Zi.subVectors(l,a),Ji.subVectors(h,c),Sa.subVectors(a,c);const u=Zi.dot(Zi),d=Ji.dot(Ji),f=Ji.dot(Sa);if(u<=s&&d<=s)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(u<=s)r=0,o=f/d,o=Ut(o,0,1);else{const g=Zi.dot(Sa);if(d<=s)o=0,r=Ut(-g/u,0,1);else{const v=Zi.dot(Ji),m=u*d-v*v;m!==0?r=Ut((v*f-g*d)/m,0,1):r=0,o=(v*r+f)/d,o<0?(o=0,r=Ut(-g/u,0,1)):o>1&&(o=1,r=Ut((v-g)/u,0,1))}}return e.copy(a).add(Zi.multiplyScalar(r)),n.copy(c).add(Ji.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class vm extends Ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function ph(i,t,e,n){const s=xm(n);switch(e){case bu:return i*t;case Yc:return i*t/s.components*s.byteLength;case Lo:return i*t/s.components*s.byteLength;case Tu:return i*t*2/s.components*s.byteLength;case $c:return i*t*2/s.components*s.byteLength;case Eu:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case jc:return i*t*4/s.components*s.byteLength;case po:case mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case go:case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nc:case sc:return Math.max(i,16)*Math.max(t,8)/4;case ec:case ic:return Math.max(i,8)*Math.max(t,8)/2;case rc:case oc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case hc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case uc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case dc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case fc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case pc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case mc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case gc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case vc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sc:case bc:case Ec:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Tc:case wc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ac:case Rc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xm(i){switch(i){case Ln:case xu:return{byteLength:1,components:1};case sr:case yu:case dr:return{byteLength:2,components:1};case Xc:case qc:return{byteLength:2,components:4};case oi:case Wc:case mn:return{byteLength:4,components:1};case Mu:case Su:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ur}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ur);function Xu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ym(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Em=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Am=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Pm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Im=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Um=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,km=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Km=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,eg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,og=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ag=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ag=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ug=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ng=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$g=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Kg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,e0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,s0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,r0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,o0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,a0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,c0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,l0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,h0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,p0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,m0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,x0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const y0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,A0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,R0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,C0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,L0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,N0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,z0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,H0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,V0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,X0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,j0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,K0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,J0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:Mm,alphahash_pars_fragment:Sm,alphamap_fragment:bm,alphamap_pars_fragment:Em,alphatest_fragment:Tm,alphatest_pars_fragment:wm,aomap_fragment:Am,aomap_pars_fragment:Rm,batching_pars_vertex:Cm,batching_vertex:Pm,begin_vertex:Im,beginnormal_vertex:Dm,bsdfs:Lm,iridescence_fragment:Um,bumpmap_pars_fragment:Nm,clipping_planes_fragment:Fm,clipping_planes_pars_fragment:Om,clipping_planes_pars_vertex:Bm,clipping_planes_vertex:zm,color_fragment:km,color_pars_fragment:Hm,color_pars_vertex:Vm,color_vertex:Gm,common:Wm,cube_uv_reflection_fragment:Xm,defaultnormal_vertex:qm,displacementmap_pars_vertex:Ym,displacementmap_vertex:$m,emissivemap_fragment:jm,emissivemap_pars_fragment:Km,colorspace_fragment:Zm,colorspace_pars_fragment:Jm,envmap_fragment:Qm,envmap_common_pars_fragment:tg,envmap_pars_fragment:eg,envmap_pars_vertex:ng,envmap_physical_pars_fragment:fg,envmap_vertex:ig,fog_vertex:sg,fog_pars_vertex:rg,fog_fragment:og,fog_pars_fragment:ag,gradientmap_pars_fragment:cg,lightmap_pars_fragment:lg,lights_lambert_fragment:hg,lights_lambert_pars_fragment:ug,lights_pars_begin:dg,lights_toon_fragment:pg,lights_toon_pars_fragment:mg,lights_phong_fragment:gg,lights_phong_pars_fragment:_g,lights_physical_fragment:vg,lights_physical_pars_fragment:xg,lights_fragment_begin:yg,lights_fragment_maps:Mg,lights_fragment_end:Sg,logdepthbuf_fragment:bg,logdepthbuf_pars_fragment:Eg,logdepthbuf_pars_vertex:Tg,logdepthbuf_vertex:wg,map_fragment:Ag,map_pars_fragment:Rg,map_particle_fragment:Cg,map_particle_pars_fragment:Pg,metalnessmap_fragment:Ig,metalnessmap_pars_fragment:Dg,morphinstance_vertex:Lg,morphcolor_vertex:Ug,morphnormal_vertex:Ng,morphtarget_pars_vertex:Fg,morphtarget_vertex:Og,normal_fragment_begin:Bg,normal_fragment_maps:zg,normal_pars_fragment:kg,normal_pars_vertex:Hg,normal_vertex:Vg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:Xg,clearcoat_pars_fragment:qg,iridescence_pars_fragment:Yg,opaque_fragment:$g,packing:jg,premultiplied_alpha_fragment:Kg,project_vertex:Zg,dithering_fragment:Jg,dithering_pars_fragment:Qg,roughnessmap_fragment:t0,roughnessmap_pars_fragment:e0,shadowmap_pars_fragment:n0,shadowmap_pars_vertex:i0,shadowmap_vertex:s0,shadowmask_pars_fragment:r0,skinbase_vertex:o0,skinning_pars_vertex:a0,skinning_vertex:c0,skinnormal_vertex:l0,specularmap_fragment:h0,specularmap_pars_fragment:u0,tonemapping_fragment:d0,tonemapping_pars_fragment:f0,transmission_fragment:p0,transmission_pars_fragment:m0,uv_pars_fragment:g0,uv_pars_vertex:_0,uv_vertex:v0,worldpos_vertex:x0,background_vert:y0,background_frag:M0,backgroundCube_vert:S0,backgroundCube_frag:b0,cube_vert:E0,cube_frag:T0,depth_vert:w0,depth_frag:A0,distanceRGBA_vert:R0,distanceRGBA_frag:C0,equirect_vert:P0,equirect_frag:I0,linedashed_vert:D0,linedashed_frag:L0,meshbasic_vert:U0,meshbasic_frag:N0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:B0,meshmatcap_frag:z0,meshnormal_vert:k0,meshnormal_frag:H0,meshphong_vert:V0,meshphong_frag:G0,meshphysical_vert:W0,meshphysical_frag:X0,meshtoon_vert:q0,meshtoon_frag:Y0,points_vert:$0,points_frag:j0,shadow_vert:K0,shadow_frag:Z0,sprite_vert:J0,sprite_frag:Q0},at={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Pn={basic:{uniforms:Ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ke([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ke([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ke([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ke([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ke([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ke([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ke([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ke([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Ke([at.common,at.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Ke([at.lights,at.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Pn.physical={uniforms:Ke([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Xr={r:0,b:0,g:0},vi=new Fe,t_=new Wt;function e_(i,t,e,n,s,r,o){const a=new Xt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const M=g(x);M===null?p(a,c):M&&M.isColor&&(p(M,1),_=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,_){const M=g(_);M&&(M.isCubeTexture||M.mapping===Do)?(h===void 0&&(h=new he(new Cs(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:ws(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),vi.copy(_.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(t_.makeRotationFromEuler(vi)),h.material.toneMapped=jt.getTransfer(M.colorSpace)!==ee,(u!==M||d!==M.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,f=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new he(new Gn(2,2),new ci({name:"BackgroundMaterial",uniforms:ws(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=jt.getTransfer(M.colorSpace)!==ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,_){x.getRGB(Xr,Lu(i)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,_,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:v,addToRenderList:m,dispose:y}}function n_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(S,C,D,P,U){let F=!1;const H=u(P,D,C);r!==H&&(r=H,l(r.object)),F=f(S,P,D,U),F&&g(S,P,D,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,_(S,C,D,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,C,D){const P=D.wireframe===!0;let U=n[S.id];U===void 0&&(U={},n[S.id]=U);let F=U[C.id];F===void 0&&(F={},U[C.id]=F);let H=F[P];return H===void 0&&(H=d(c()),F[P]=H),H}function d(S){const C=[],D=[],P=[];for(let U=0;U<e;U++)C[U]=0,D[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:P,object:S,attributes:{},index:null}}function f(S,C,D,P){const U=r.attributes,F=C.attributes;let H=0;const Y=D.getAttributes();for(const X in Y)if(Y[X].location>=0){const ct=U[X];let gt=F[X];if(gt===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(gt=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(gt=S.instanceColor)),ct===void 0||ct.attribute!==gt||gt&&ct.data!==gt.data)return!0;H++}return r.attributesNum!==H||r.index!==P}function g(S,C,D,P){const U={},F=C.attributes;let H=0;const Y=D.getAttributes();for(const X in Y)if(Y[X].location>=0){let ct=F[X];ct===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor));const gt={};gt.attribute=ct,ct&&ct.data&&(gt.data=ct.data),U[X]=gt,H++}r.attributes=U,r.attributesNum=H,r.index=P}function v(){const S=r.newAttributes;for(let C=0,D=S.length;C<D;C++)S[C]=0}function m(S){p(S,0)}function p(S,C){const D=r.newAttributes,P=r.enabledAttributes,U=r.attributeDivisors;D[S]=1,P[S]===0&&(i.enableVertexAttribArray(S),P[S]=1),U[S]!==C&&(i.vertexAttribDivisor(S,C),U[S]=C)}function y(){const S=r.newAttributes,C=r.enabledAttributes;for(let D=0,P=C.length;D<P;D++)C[D]!==S[D]&&(i.disableVertexAttribArray(D),C[D]=0)}function x(S,C,D,P,U,F,H){H===!0?i.vertexAttribIPointer(S,C,D,U,F):i.vertexAttribPointer(S,C,D,P,U,F)}function _(S,C,D,P){v();const U=P.attributes,F=D.getAttributes(),H=C.defaultAttributeValues;for(const Y in F){const X=F[Y];if(X.location>=0){let it=U[Y];if(it===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(it=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(it=S.instanceColor)),it!==void 0){const ct=it.normalized,gt=it.itemSize,zt=t.get(it);if(zt===void 0)continue;const Qt=zt.buffer,ce=zt.type,qt=zt.bytesPerElement,j=ce===i.INT||ce===i.UNSIGNED_INT||it.gpuType===Wc;if(it.isInterleavedBufferAttribute){const Z=it.data,pt=Z.stride,It=it.offset;if(Z.isInstancedInterleavedBuffer){for(let St=0;St<X.locationSize;St++)p(X.location+St,Z.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let St=0;St<X.locationSize;St++)m(X.location+St);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let St=0;St<X.locationSize;St++)x(X.location+St,gt/X.locationSize,ce,ct,pt*qt,(It+gt/X.locationSize*St)*qt,j)}else{if(it.isInstancedBufferAttribute){for(let Z=0;Z<X.locationSize;Z++)p(X.location+Z,it.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Z=0;Z<X.locationSize;Z++)m(X.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let Z=0;Z<X.locationSize;Z++)x(X.location+Z,gt/X.locationSize,ce,ct,gt*qt,gt/X.locationSize*Z*qt,j)}}else if(H!==void 0){const ct=H[Y];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(X.location,ct);break;case 3:i.vertexAttrib3fv(X.location,ct);break;case 4:i.vertexAttrib4fv(X.location,ct);break;default:i.vertexAttrib1fv(X.location,ct)}}}}y()}function M(){A();for(const S in n){const C=n[S];for(const D in C){const P=C[D];for(const U in P)h(P[U].object),delete P[U];delete C[D]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const D in C){const P=C[D];for(const U in P)h(P[U].object),delete P[U];delete C[D]}delete n[S.id]}function T(S){for(const C in n){const D=n[C];if(D[S.id]===void 0)continue;const P=D[S.id];for(const U in P)h(P[U].object),delete P[U];delete D[S.id]}}function A(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:b,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function i_(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function s_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const A=T===dr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==mn&&!A)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:M,maxSamples:E}}function r_(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Cn,a=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:n,x=y*4;let _=p.clippingState||null;c.value=_,_=h(g,d,x,f);for(let M=0;M!==x;++M)_[M]=e[M];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)o.copy(u[x]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function o_(i){let t=new WeakMap;function e(o,a){return a===Ja?o.mapping=Ss:a===Qa&&(o.mapping=bs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ja||a===Qa)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new wp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const us=4,mh=[.125,.215,.35,.446,.526,.582],Ai=20,ba=new Wu,gh=new Xt;let Ea=null,Ta=0,wa=0,Aa=!1;const Ti=(1+Math.sqrt(5))/2,Qi=1/Ti,_h=[new I(-Ti,Qi,0),new I(Ti,Qi,0),new I(-Qi,0,Ti),new I(Qi,0,Ti),new I(0,Ti,-Qi),new I(0,Ti,Qi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],a_=new I;class vh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=a_}=r;Ea=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ea,Ta,wa),this._renderer.xr.enabled=Aa,t.scissorTest=!1,qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ss||t.mapping===bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ea=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:In,minFilter:In,generateMipmaps:!1,type:dr,format:ln,colorSpace:Es,depthBuffer:!1},s=xh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=c_(r)),this._blurMaterial=l_(r,t,e)}return s}_compileMaterial(t){const e=new he(this._lodPlanes[0],t);this._renderer.compile(e,ba)}_sceneToCubeUV(t,e,n,s,r){const c=new sn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(gh),u.toneMapping=ri,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new gs({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),m=new he(new Cs,v);let p=!1;const y=t.background;y?y.isColor&&(v.color.copy(y),t.background=null,p=!0):(v.color.copy(gh),p=!0);for(let x=0;x<6;x++){const _=x%3;_===0?(c.up.set(0,l[x],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[x],r.y,r.z)):_===1?(c.up.set(0,0,l[x]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[x],r.z)):(c.up.set(0,l[x],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[x]));const M=this._cubeSize;qr(s,_*M,x>2?M:0,M,M),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ss||t.mapping===bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new he(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;qr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ba)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=_h[(s-r-1)%_h.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new he(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ai;m>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);const p=[];let y=0;for(let T=0;T<Ai;++T){const A=T/v,b=Math.exp(-A*A/2);p.push(b),T===0?y+=b:T<m&&(y+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const _=this._sizeLods[s],M=3*_*(s>x-us?s-x+us:0),E=4*(this._cubeSize-_);qr(e,M,E,3*_,2*_),c.setRenderTarget(e),c.render(u,ba)}}function c_(i){const t=[],e=[],n=[];let s=i;const r=i-us+1+mh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-us?c=mh[o-i+us-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),x=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let E=0;E<f;E++){const T=E%3*2/3-1,A=E>2?0:-1,b=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];y.set(b,v*g*E),x.set(d,m*g*E);const S=[E,E,E,E,E,E];_.set(S,p*g*E)}const M=new Se;M.setAttribute("position",new Ye(y,v)),M.setAttribute("uv",new Ye(x,m)),M.setAttribute("faceIndex",new Ye(_,p)),t.push(M),s>us&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xh(i,t,e){const n=new Li(i,t,e);return n.texture.mapping=Do,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function l_(i,t,e){const n=new Float32Array(Ai),s=new I(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function yh(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Mh(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function h_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ja||c===Qa,h=c===Ss||c===bs;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vh(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new vh(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function u_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&lr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function d_(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let x=0,_=y.length;x<_;x+=3){const M=y[x+0],E=y[x+1],T=y[x+2];d.push(M,E,E,T,T,M)}}else if(g!==void 0){const y=g.array;v=g.version;for(let x=0,_=y.length/3-1;x<_;x+=3){const M=x+0,E=x+1,T=x+2;d.push(M,E,E,T,T,M)}}else return;const m=new(Ru(d)?Du:Iu)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function f_(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*v[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function p_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function m_(i,t,e){const n=new WeakMap,s=new ie;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,E=1;M>t.maxTextureSize&&(E=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const T=new Float32Array(M*E*4*u),A=new Cu(T,M,E,u);A.type=mn,A.needsUpdate=!0;const b=_*4;for(let C=0;C<u;C++){const D=p[C],P=y[C],U=x[C],F=M*E*4*C;for(let H=0;H<D.count;H++){const Y=H*b;g===!0&&(s.fromBufferAttribute(D,H),T[F+Y+0]=s.x,T[F+Y+1]=s.y,T[F+Y+2]=s.z,T[F+Y+3]=0),v===!0&&(s.fromBufferAttribute(P,H),T[F+Y+4]=s.x,T[F+Y+5]=s.y,T[F+Y+6]=s.z,T[F+Y+7]=0),m===!0&&(s.fromBufferAttribute(U,H),T[F+Y+8]=s.x,T[F+Y+9]=s.y,T[F+Y+10]=s.z,T[F+Y+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new ot(M,E)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function g_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const qu=new qe,Sh=new ku(1,1),Yu=new Cu,$u=new lp,ju=new Nu,bh=[],Eh=[],Th=new Float32Array(16),wh=new Float32Array(9),Ah=new Float32Array(4);function Ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=bh[s];if(r===void 0&&(r=new Float32Array(s),bh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function De(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Oo(i,t){let e=Eh[t];e===void 0&&(e=new Int32Array(t),Eh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function __(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function v_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),De(e,t)}}function x_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),De(e,t)}}function y_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),De(e,t)}}function M_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;Ah.set(n),i.uniformMatrix2fv(this.addr,!1,Ah),De(e,n)}}function S_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;wh.set(n),i.uniformMatrix3fv(this.addr,!1,wh),De(e,n)}}function b_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;Th.set(n),i.uniformMatrix4fv(this.addr,!1,Th),De(e,n)}}function E_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function T_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),De(e,t)}}function w_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),De(e,t)}}function A_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),De(e,t)}}function R_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function C_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),De(e,t)}}function P_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),De(e,t)}}function I_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),De(e,t)}}function D_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sh.compareFunction=Au,r=Sh):r=qu,e.setTexture2D(t||r,s)}function L_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$u,s)}function U_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ju,s)}function N_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yu,s)}function F_(i){switch(i){case 5126:return __;case 35664:return v_;case 35665:return x_;case 35666:return y_;case 35674:return M_;case 35675:return S_;case 35676:return b_;case 5124:case 35670:return E_;case 35667:case 35671:return T_;case 35668:case 35672:return w_;case 35669:case 35673:return A_;case 5125:return R_;case 36294:return C_;case 36295:return P_;case 36296:return I_;case 35678:case 36198:case 36298:case 36306:case 35682:return D_;case 35679:case 36299:case 36307:return L_;case 35680:case 36300:case 36308:case 36293:return U_;case 36289:case 36303:case 36311:case 36292:return N_}}function O_(i,t){i.uniform1fv(this.addr,t)}function B_(i,t){const e=Ps(t,this.size,2);i.uniform2fv(this.addr,e)}function z_(i,t){const e=Ps(t,this.size,3);i.uniform3fv(this.addr,e)}function k_(i,t){const e=Ps(t,this.size,4);i.uniform4fv(this.addr,e)}function H_(i,t){const e=Ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function V_(i,t){const e=Ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function G_(i,t){const e=Ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function W_(i,t){i.uniform1iv(this.addr,t)}function X_(i,t){i.uniform2iv(this.addr,t)}function q_(i,t){i.uniform3iv(this.addr,t)}function Y_(i,t){i.uniform4iv(this.addr,t)}function $_(i,t){i.uniform1uiv(this.addr,t)}function j_(i,t){i.uniform2uiv(this.addr,t)}function K_(i,t){i.uniform3uiv(this.addr,t)}function Z_(i,t){i.uniform4uiv(this.addr,t)}function J_(i,t,e){const n=this.cache,s=t.length,r=Oo(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||qu,r[o])}function Q_(i,t,e){const n=this.cache,s=t.length,r=Oo(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||$u,r[o])}function tv(i,t,e){const n=this.cache,s=t.length,r=Oo(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ju,r[o])}function ev(i,t,e){const n=this.cache,s=t.length,r=Oo(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Yu,r[o])}function nv(i){switch(i){case 5126:return O_;case 35664:return B_;case 35665:return z_;case 35666:return k_;case 35674:return H_;case 35675:return V_;case 35676:return G_;case 5124:case 35670:return W_;case 35667:case 35671:return X_;case 35668:case 35672:return q_;case 35669:case 35673:return Y_;case 5125:return $_;case 36294:return j_;case 36295:return K_;case 36296:return Z_;case 35678:case 36198:case 36298:case 36306:case 35682:return J_;case 35679:case 36299:case 36307:return Q_;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return ev}}class iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=F_(e.type)}}class sv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=nv(e.type)}}class rv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function Rh(i,t){i.seq.push(t),i.map[t.id]=t}function ov(i,t,e){const n=i.name,s=n.length;for(Ra.lastIndex=0;;){const r=Ra.exec(n),o=Ra.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Rh(e,l===void 0?new iv(a,i,t):new sv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new rv(a),Rh(e,u)),e=u}}}class xo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);ov(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ch(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const av=37297;let cv=0;function lv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ph=new Ht;function hv(i){jt._getMatrix(Ph,jt.workingColorSpace,i);const t=`mat3( ${Ph.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case So:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ih(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+lv(i.getShaderSource(t),a)}else return r}function uv(i,t){const e=hv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function dv(i,t){let e;switch(t){case bf:e="Linear";break;case Ef:e="Reinhard";break;case Tf:e="Cineon";break;case _u:e="ACESFilmic";break;case Af:e="AgX";break;case Rf:e="Neutral";break;case wf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Yr=new I;function fv(){jt.getLuminanceCoefficients(Yr);const i=Yr.x.toFixed(4),t=Yr.y.toFixed(4),e=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function mv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function gv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ks(i){return i!==""}function Dh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _v=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ic(i){return i.replace(_v,xv)}const vv=new Map;function xv(i,t){let e=Gt[t];if(e===void 0){const n=vv.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ic(e)}const yv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uh(i){return i.replace(yv,Mv)}function Mv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Sv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===pu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===mu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function bv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ss:case bs:t="ENVMAP_TYPE_CUBE";break;case Do:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ev(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===bs&&(t="ENVMAP_MODE_REFRACTION"),t}function Tv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case gu:t="ENVMAP_BLENDING_MULTIPLY";break;case Mf:t="ENVMAP_BLENDING_MIX";break;case Sf:t="ENVMAP_BLENDING_ADD";break}return t}function wv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Av(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Sv(e),l=bv(e),h=Ev(e),u=Tv(e),d=wv(e),f=pv(e),g=mv(r),v=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ks).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ks).join(`
`),p.length>0&&(p+=`
`)):(m=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),p=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Gt.tonemapping_pars_fragment:"",e.toneMapping!==ri?dv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,uv("linearToOutputTexel",e.outputColorSpace),fv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Ic(o),o=Dh(o,e),o=Lh(o,e),a=Ic(a),a=Dh(a,e),a=Lh(a,e),o=Uh(o),a=Uh(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+m+o,_=y+p+a,M=Ch(s,s.VERTEX_SHADER,x),E=Ch(s,s.FRAGMENT_SHADER,_);s.attachShader(v,M),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(C){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",P=s.getShaderInfoLog(M)||"",U=s.getShaderInfoLog(E)||"",F=D.trim(),H=P.trim(),Y=U.trim();let X=!0,it=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,M,E);else{const ct=Ih(s,M,"vertex"),gt=Ih(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+ct+`
`+gt)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(H===""||Y==="")&&(it=!1);it&&(C.diagnostics={runnable:X,programLog:F,vertexShader:{log:H,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(M),s.deleteShader(E),A=new xo(s,v),b=gv(s,v)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,av)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=E,this}let Rv=0;class Cv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Pv(t),e.set(t,n)),n}}class Pv{constructor(t){this.id=Rv++,this.code=t,this.usedTimes=0}}function Iv(i,t,e,n,s,r,o){const a=new Jc,c=new Cv,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,C,D,P){const U=D.fog,F=P.geometry,H=b.isMeshStandardMaterial?D.environment:null,Y=(b.isMeshStandardMaterial?e:t).get(b.envMap||H),X=Y&&Y.mapping===Do?Y.image.height:null,it=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ct=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,gt=ct!==void 0?ct.length:0;let zt=0;F.morphAttributes.position!==void 0&&(zt=1),F.morphAttributes.normal!==void 0&&(zt=2),F.morphAttributes.color!==void 0&&(zt=3);let Qt,ce,qt,j;if(it){const Jt=Pn[it];Qt=Jt.vertexShader,ce=Jt.fragmentShader}else Qt=b.vertexShader,ce=b.fragmentShader,c.update(b),qt=c.getVertexShaderID(b),j=c.getFragmentShaderID(b);const Z=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),It=P.isInstancedMesh===!0,St=P.isBatchedMesh===!0,Yt=!!b.map,be=!!b.matcap,N=!!Y,de=!!b.aoMap,Bt=!!b.lightMap,Dt=!!b.bumpMap,xt=!!b.normalMap,fe=!!b.displacementMap,yt=!!b.emissiveMap,Vt=!!b.metalnessMap,Le=!!b.roughnessMap,ye=b.anisotropy>0,L=b.clearcoat>0,w=b.dispersion>0,V=b.iridescence>0,$=b.sheen>0,J=b.transmission>0,q=ye&&!!b.anisotropyMap,wt=L&&!!b.clearcoatMap,st=L&&!!b.clearcoatNormalMap,Mt=L&&!!b.clearcoatRoughnessMap,bt=V&&!!b.iridescenceMap,et=V&&!!b.iridescenceThicknessMap,ut=$&&!!b.sheenColorMap,Pt=$&&!!b.sheenRoughnessMap,Et=!!b.specularMap,lt=!!b.specularColorMap,kt=!!b.specularIntensityMap,O=J&&!!b.transmissionMap,nt=J&&!!b.thicknessMap,rt=!!b.gradientMap,mt=!!b.alphaMap,Q=b.alphaTest>0,K=!!b.alphaHash,vt=!!b.extensions;let Ot=ri;b.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const re={shaderID:it,shaderType:b.type,shaderName:b.name,vertexShader:Qt,fragmentShader:ce,defines:b.defines,customVertexShaderID:qt,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:St,batchingColor:St&&P._colorsTexture!==null,instancing:It,instancingColor:It&&P.instanceColor!==null,instancingMorph:It&&P.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Es,alphaToCoverage:!!b.alphaToCoverage,map:Yt,matcap:be,envMap:N,envMapMode:N&&Y.mapping,envMapCubeUVHeight:X,aoMap:de,lightMap:Bt,bumpMap:Dt,normalMap:xt,displacementMap:d&&fe,emissiveMap:yt,normalMapObjectSpace:xt&&b.normalMapType===Df,normalMapTangentSpace:xt&&b.normalMapType===wu,metalnessMap:Vt,roughnessMap:Le,anisotropy:ye,anisotropyMap:q,clearcoat:L,clearcoatMap:wt,clearcoatNormalMap:st,clearcoatRoughnessMap:Mt,dispersion:w,iridescence:V,iridescenceMap:bt,iridescenceThicknessMap:et,sheen:$,sheenColorMap:ut,sheenRoughnessMap:Pt,specularMap:Et,specularColorMap:lt,specularIntensityMap:kt,transmission:J,transmissionMap:O,thicknessMap:nt,gradientMap:rt,opaque:b.transparent===!1&&b.blending===ps&&b.alphaToCoverage===!1,alphaMap:mt,alphaTest:Q,alphaHash:K,combine:b.combine,mapUv:Yt&&v(b.map.channel),aoMapUv:de&&v(b.aoMap.channel),lightMapUv:Bt&&v(b.lightMap.channel),bumpMapUv:Dt&&v(b.bumpMap.channel),normalMapUv:xt&&v(b.normalMap.channel),displacementMapUv:fe&&v(b.displacementMap.channel),emissiveMapUv:yt&&v(b.emissiveMap.channel),metalnessMapUv:Vt&&v(b.metalnessMap.channel),roughnessMapUv:Le&&v(b.roughnessMap.channel),anisotropyMapUv:q&&v(b.anisotropyMap.channel),clearcoatMapUv:wt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:st&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:et&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&v(b.sheenRoughnessMap.channel),specularMapUv:Et&&v(b.specularMap.channel),specularColorMapUv:lt&&v(b.specularColorMap.channel),specularIntensityMapUv:kt&&v(b.specularIntensityMap.channel),transmissionMapUv:O&&v(b.transmissionMap.channel),thicknessMapUv:nt&&v(b.thicknessMap.channel),alphaMapUv:mt&&v(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(xt||ye),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!F.attributes.uv&&(Yt||mt),fog:!!U,useFog:b.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pt,skinning:P.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:zt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Yt&&b.map.isVideoTexture===!0&&jt.getTransfer(b.map.colorSpace)===ee,decodeVideoTextureEmissive:yt&&b.emissiveMap.isVideoTexture===!0&&jt.getTransfer(b.emissiveMap.colorSpace)===ee,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ae,flipSided:b.side===Ze,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:vt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&b.extensions.multiDraw===!0||St)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return re.vertexUv1s=l.has(1),re.vertexUv2s=l.has(2),re.vertexUv3s=l.has(3),l.clear(),re}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)S.push(C),S.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(y(S,b),x(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function x(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const S=g[b.type];let C;if(S){const D=Pn[S];C=Sp.clone(D.uniforms)}else C=b.uniforms;return C}function M(b,S){let C;for(let D=0,P=h.length;D<P;D++){const U=h[D];if(U.cacheKey===S){C=U,++C.usedTimes;break}}return C===void 0&&(C=new Av(i,S,b,r),h.push(C)),C}function E(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function T(b){c.remove(b)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:M,releaseProgram:E,releaseShaderCache:T,programs:h,dispose:A}}function Dv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Lv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Fh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Oh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Lv),n.length>1&&n.sort(d||Fh),s.length>1&&s.sort(d||Fh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Uv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Oh,i.set(n,[o])):s>=r.length?(o=new Oh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Nv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Xt};break;case"SpotLight":e={position:new I,direction:new I,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Fv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Ov=0;function Bv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function zv(i){const t=new Nv,e=Fv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new Wt,o=new Wt;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,x=0,_=0,M=0,E=0,T=0;l.sort(Bv);for(let b=0,S=l.length;b<S;b++){const C=l[b],D=C.color,P=C.intensity,U=C.distance,F=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=D.r*P,u+=D.g*P,d+=D.b*P;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],P);T++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Y=C.shadow,X=e.get(C);X.shadowIntensity=Y.intensity,X.shadowBias=Y.bias,X.shadowNormalBias=Y.normalBias,X.shadowRadius=Y.radius,X.shadowMapSize=Y.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=F,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=H,f++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(D).multiplyScalar(P),H.distance=U,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[v]=H;const Y=C.shadow;if(C.map&&(n.spotLightMap[M]=C.map,M++,Y.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[v]=Y.matrix,C.castShadow){const X=e.get(C);X.shadowIntensity=Y.intensity,X.shadowBias=Y.bias,X.shadowNormalBias=Y.normalBias,X.shadowRadius=Y.radius,X.shadowMapSize=Y.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=F,_++}v++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(D).multiplyScalar(P),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=H,m++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const Y=C.shadow,X=e.get(C);X.shadowIntensity=Y.intensity,X.shadowBias=Y.bias,X.shadowNormalBias=Y.normalBias,X.shadowRadius=Y.radius,X.shadowMapSize=Y.mapSize,X.shadowCameraNear=Y.camera.near,X.shadowCameraFar=Y.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=C.shadow.matrix,x++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(P),H.groundColor.copy(C.groundColor).multiplyScalar(P),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==v||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==y||A.numPointShadows!==x||A.numSpotShadows!==_||A.numSpotMaps!==M||A.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,A.directionalLength=f,A.pointLength=g,A.spotLength=v,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=y,A.numPointShadows=x,A.numSpotShadows=_,A.numSpotMaps=M,A.numLightProbes=T,n.version=Ov++)}function c(l,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const x=l[p];if(x.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(x.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Bh(i){const t=new zv(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function kv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Bh(i),t.set(s,[a])):r>=o.length?(a=new Bh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Gv(i,t,e){let n=new fr;const s=new ot,r=new ot,o=new ie,a=new sm({depthPacking:If}),c=new rm,l={},h=e.maxTextureSize,u={[Dn]:Ze,[Ze]:Dn,[Ae]:Ae},d=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Hv,fragmentShader:Vv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new he(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pu;let p=this.type;this.render=function(E,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),D=i.state;D.setBlending(si),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const P=p!==kn&&this.type===kn,U=p===kn&&this.type!==kn;for(let F=0,H=E.length;F<H;F++){const Y=E[F],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const it=X.getFrameExtents();if(s.multiply(it),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,X.mapSize.y=r.y)),X.map===null||P===!0||U===!0){const gt=this.type!==kn?{minFilter:hn,magFilter:hn}:{};X.map!==null&&X.map.dispose(),X.map=new Li(s.x,s.y,gt),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const ct=X.getViewportCount();for(let gt=0;gt<ct;gt++){const zt=X.getViewport(gt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),D.viewport(o),X.updateMatrices(Y,gt),n=X.getFrustum(),_(T,A,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===kn&&y(X,A),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,C)};function y(E,T){const A=t.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Li(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(T,null,A,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(T,null,A,f,v,null)}function x(E,T,A,b){let S=null;const C=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)S=C;else if(S=A.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const D=S.uuid,P=T.uuid;let U=l[D];U===void 0&&(U={},l[D]=U);let F=U[P];F===void 0&&(F=S.clone(),U[P]=F,T.addEventListener("dispose",M)),S=F}if(S.visible=T.visible,S.wireframe=T.wireframe,b===kn?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:u[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,A.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const D=i.properties.get(S);D.light=A}return S}function _(E,T,A,b,S){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===kn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const P=t.update(E),U=E.material;if(Array.isArray(U)){const F=P.groups;for(let H=0,Y=F.length;H<Y;H++){const X=F[H],it=U[X.materialIndex];if(it&&it.visible){const ct=x(E,it,b,S);E.onBeforeShadow(i,E,T,A,P,ct,X),i.renderBufferDirect(A,null,P,ct,E,X),E.onAfterShadow(i,E,T,A,P,ct,X)}}}else if(U.visible){const F=x(E,U,b,S);E.onBeforeShadow(i,E,T,A,P,F,null),i.renderBufferDirect(A,null,P,F,E,null),E.onAfterShadow(i,E,T,A,P,F,null)}}const D=E.children;for(let P=0,U=D.length;P<U;P++)_(D[P],T,A,b,S)}function M(E){E.target.removeEventListener("dispose",M);for(const A in l){const b=l[A],S=E.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const Wv={[Xa]:qa,[Ya]:Ka,[$a]:Za,[Ms]:ja,[qa]:Xa,[Ka]:Ya,[Za]:$a,[ja]:Ms};function Xv(i,t){function e(){let O=!1;const nt=new ie;let rt=null;const mt=new ie(0,0,0,0);return{setMask:function(Q){rt!==Q&&!O&&(i.colorMask(Q,Q,Q,Q),rt=Q)},setLocked:function(Q){O=Q},setClear:function(Q,K,vt,Ot,re){re===!0&&(Q*=Ot,K*=Ot,vt*=Ot),nt.set(Q,K,vt,Ot),mt.equals(nt)===!1&&(i.clearColor(Q,K,vt,Ot),mt.copy(nt))},reset:function(){O=!1,rt=null,mt.set(-1,0,0,0)}}}function n(){let O=!1,nt=!1,rt=null,mt=null,Q=null;return{setReversed:function(K){if(nt!==K){const vt=t.get("EXT_clip_control");K?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),nt=K;const Ot=Q;Q=null,this.setClear(Ot)}},getReversed:function(){return nt},setTest:function(K){K?Z(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(K){rt!==K&&!O&&(i.depthMask(K),rt=K)},setFunc:function(K){if(nt&&(K=Wv[K]),mt!==K){switch(K){case Xa:i.depthFunc(i.NEVER);break;case qa:i.depthFunc(i.ALWAYS);break;case Ya:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case $a:i.depthFunc(i.EQUAL);break;case ja:i.depthFunc(i.GEQUAL);break;case Ka:i.depthFunc(i.GREATER);break;case Za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=K}},setLocked:function(K){O=K},setClear:function(K){Q!==K&&(nt&&(K=1-K),i.clearDepth(K),Q=K)},reset:function(){O=!1,rt=null,mt=null,Q=null,nt=!1}}}function s(){let O=!1,nt=null,rt=null,mt=null,Q=null,K=null,vt=null,Ot=null,re=null;return{setTest:function(Jt){O||(Jt?Z(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(Jt){nt!==Jt&&!O&&(i.stencilMask(Jt),nt=Jt)},setFunc:function(Jt,Un,wn){(rt!==Jt||mt!==Un||Q!==wn)&&(i.stencilFunc(Jt,Un,wn),rt=Jt,mt=Un,Q=wn)},setOp:function(Jt,Un,wn){(K!==Jt||vt!==Un||Ot!==wn)&&(i.stencilOp(Jt,Un,wn),K=Jt,vt=Un,Ot=wn)},setLocked:function(Jt){O=Jt},setClear:function(Jt){re!==Jt&&(i.clearStencil(Jt),re=Jt)},reset:function(){O=!1,nt=null,rt=null,mt=null,Q=null,K=null,vt=null,Ot=null,re=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,x=null,_=null,M=null,E=null,T=new Xt(0,0,0),A=0,b=!1,S=null,C=null,D=null,P=null,U=null;const F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Y=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=Y>=1):X.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=Y>=2);let it=null,ct={};const gt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),Qt=new ie().fromArray(gt),ce=new ie().fromArray(zt);function qt(O,nt,rt,mt){const Q=new Uint8Array(4),K=i.createTexture();i.bindTexture(O,K),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let vt=0;vt<rt;vt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(nt+vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return K}const j={};j[i.TEXTURE_2D]=qt(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=qt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=qt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=qt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Ms),Dt(!1),xt(bl),Z(i.CULL_FACE),de(si);function Z(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function pt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function It(O,nt){return u[O]!==nt?(i.bindFramebuffer(O,nt),u[O]=nt,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=nt),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function St(O,nt){let rt=f,mt=!1;if(O){rt=d.get(nt),rt===void 0&&(rt=[],d.set(nt,rt));const Q=O.textures;if(rt.length!==Q.length||rt[0]!==i.COLOR_ATTACHMENT0){for(let K=0,vt=Q.length;K<vt;K++)rt[K]=i.COLOR_ATTACHMENT0+K;rt.length=Q.length,mt=!0}}else rt[0]!==i.BACK&&(rt[0]=i.BACK,mt=!0);mt&&i.drawBuffers(rt)}function Yt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const be={[wi]:i.FUNC_ADD,[sf]:i.FUNC_SUBTRACT,[rf]:i.FUNC_REVERSE_SUBTRACT};be[of]=i.MIN,be[af]=i.MAX;const N={[cf]:i.ZERO,[lf]:i.ONE,[hf]:i.SRC_COLOR,[Ga]:i.SRC_ALPHA,[gf]:i.SRC_ALPHA_SATURATE,[pf]:i.DST_COLOR,[df]:i.DST_ALPHA,[uf]:i.ONE_MINUS_SRC_COLOR,[Wa]:i.ONE_MINUS_SRC_ALPHA,[mf]:i.ONE_MINUS_DST_COLOR,[ff]:i.ONE_MINUS_DST_ALPHA,[_f]:i.CONSTANT_COLOR,[vf]:i.ONE_MINUS_CONSTANT_COLOR,[xf]:i.CONSTANT_ALPHA,[yf]:i.ONE_MINUS_CONSTANT_ALPHA};function de(O,nt,rt,mt,Q,K,vt,Ot,re,Jt){if(O===si){v===!0&&(pt(i.BLEND),v=!1);return}if(v===!1&&(Z(i.BLEND),v=!0),O!==nf){if(O!==m||Jt!==b){if((p!==wi||_!==wi)&&(i.blendEquation(i.FUNC_ADD),p=wi,_=wi),Jt)switch(O){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case El:i.blendFunc(i.ONE,i.ONE);break;case Tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case El:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Tl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,x=null,M=null,E=null,T.set(0,0,0),A=0,m=O,b=Jt}return}Q=Q||nt,K=K||rt,vt=vt||mt,(nt!==p||Q!==_)&&(i.blendEquationSeparate(be[nt],be[Q]),p=nt,_=Q),(rt!==y||mt!==x||K!==M||vt!==E)&&(i.blendFuncSeparate(N[rt],N[mt],N[K],N[vt]),y=rt,x=mt,M=K,E=vt),(Ot.equals(T)===!1||re!==A)&&(i.blendColor(Ot.r,Ot.g,Ot.b,re),T.copy(Ot),A=re),m=O,b=!1}function Bt(O,nt){O.side===Ae?pt(i.CULL_FACE):Z(i.CULL_FACE);let rt=O.side===Ze;nt&&(rt=!rt),Dt(rt),O.blending===ps&&O.transparent===!1?de(si):de(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const mt=O.stencilWrite;a.setTest(mt),mt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),yt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function xt(O){O!==tf?(Z(i.CULL_FACE),O!==C&&(O===bl?i.cullFace(i.BACK):O===ef?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),C=O}function fe(O){O!==D&&(H&&i.lineWidth(O),D=O)}function yt(O,nt,rt){O?(Z(i.POLYGON_OFFSET_FILL),(P!==nt||U!==rt)&&(i.polygonOffset(nt,rt),P=nt,U=rt)):pt(i.POLYGON_OFFSET_FILL)}function Vt(O){O?Z(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function Le(O){O===void 0&&(O=i.TEXTURE0+F-1),it!==O&&(i.activeTexture(O),it=O)}function ye(O,nt,rt){rt===void 0&&(it===null?rt=i.TEXTURE0+F-1:rt=it);let mt=ct[rt];mt===void 0&&(mt={type:void 0,texture:void 0},ct[rt]=mt),(mt.type!==O||mt.texture!==nt)&&(it!==rt&&(i.activeTexture(rt),it=rt),i.bindTexture(O,nt||j[O]),mt.type=O,mt.texture=nt)}function L(){const O=ct[it];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function wt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Mt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(O){Qt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Qt.copy(O))}function Pt(O){ce.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),ce.copy(O))}function Et(O,nt){let rt=l.get(nt);rt===void 0&&(rt=new WeakMap,l.set(nt,rt));let mt=rt.get(O);mt===void 0&&(mt=i.getUniformBlockIndex(nt,O.name),rt.set(O,mt))}function lt(O,nt){const mt=l.get(nt).get(O);c.get(nt)!==mt&&(i.uniformBlockBinding(nt,mt,O.__bindingPointIndex),c.set(nt,mt))}function kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,ct={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,x=null,_=null,M=null,E=null,T=new Xt(0,0,0),A=0,b=!1,S=null,C=null,D=null,P=null,U=null,Qt.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:pt,bindFramebuffer:It,drawBuffers:St,useProgram:Yt,setBlending:de,setMaterial:Bt,setFlipSided:Dt,setCullFace:xt,setLineWidth:fe,setPolygonOffset:yt,setScissorTest:Vt,activeTexture:Le,bindTexture:ye,unbindTexture:L,compressedTexImage2D:w,compressedTexImage3D:V,texImage2D:bt,texImage3D:et,updateUBOMapping:Et,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:Mt,texSubImage2D:$,texSubImage3D:J,compressedTexSubImage2D:q,compressedTexSubImage3D:wt,scissor:ut,viewport:Pt,reset:kt}}function qv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,w){return f?new OffscreenCanvas(L,w):Eo("canvas")}function v(L,w,V){let $=1;const J=ye(L);if((J.width>V||J.height>V)&&($=V/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const q=Math.floor($*J.width),wt=Math.floor($*J.height);u===void 0&&(u=g(q,wt));const st=w?g(q,wt):u;return st.width=q,st.height=wt,st.getContext("2d").drawImage(L,0,0,q,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+wt+")."),st}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(L,w,V,$,J=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let q=w;if(w===i.RED&&(V===i.FLOAT&&(q=i.R32F),V===i.HALF_FLOAT&&(q=i.R16F),V===i.UNSIGNED_BYTE&&(q=i.R8)),w===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(q=i.R8UI),V===i.UNSIGNED_SHORT&&(q=i.R16UI),V===i.UNSIGNED_INT&&(q=i.R32UI),V===i.BYTE&&(q=i.R8I),V===i.SHORT&&(q=i.R16I),V===i.INT&&(q=i.R32I)),w===i.RG&&(V===i.FLOAT&&(q=i.RG32F),V===i.HALF_FLOAT&&(q=i.RG16F),V===i.UNSIGNED_BYTE&&(q=i.RG8)),w===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(q=i.RG8UI),V===i.UNSIGNED_SHORT&&(q=i.RG16UI),V===i.UNSIGNED_INT&&(q=i.RG32UI),V===i.BYTE&&(q=i.RG8I),V===i.SHORT&&(q=i.RG16I),V===i.INT&&(q=i.RG32I)),w===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(q=i.RGB8UI),V===i.UNSIGNED_SHORT&&(q=i.RGB16UI),V===i.UNSIGNED_INT&&(q=i.RGB32UI),V===i.BYTE&&(q=i.RGB8I),V===i.SHORT&&(q=i.RGB16I),V===i.INT&&(q=i.RGB32I)),w===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),V===i.UNSIGNED_INT&&(q=i.RGBA32UI),V===i.BYTE&&(q=i.RGBA8I),V===i.SHORT&&(q=i.RGBA16I),V===i.INT&&(q=i.RGBA32I)),w===i.RGB&&(V===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),w===i.RGBA){const wt=J?So:jt.getTransfer($);V===i.FLOAT&&(q=i.RGBA32F),V===i.HALF_FLOAT&&(q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(q=wt===ee?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function _(L,w){let V;return L?w===null||w===oi||w===rr?V=i.DEPTH24_STENCIL8:w===mn?V=i.DEPTH32F_STENCIL8:w===sr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===oi||w===rr?V=i.DEPTH_COMPONENT24:w===mn?V=i.DEPTH_COMPONENT32F:w===sr&&(V=i.DEPTH_COMPONENT16),V}function M(L,w){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==hn&&L.minFilter!==In?Math.log2(Math.max(w.width,w.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?w.mipmaps.length:1}function E(L){const w=L.target;w.removeEventListener("dispose",E),A(w),w.isVideoTexture&&h.delete(w)}function T(L){const w=L.target;w.removeEventListener("dispose",T),S(w)}function A(L){const w=n.get(L);if(w.__webglInit===void 0)return;const V=L.source,$=d.get(V);if($){const J=$[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(L),Object.keys($).length===0&&d.delete(V)}n.remove(L)}function b(L){const w=n.get(L);i.deleteTexture(w.__webglTexture);const V=L.source,$=d.get(V);delete $[w.__cacheKey],o.memory.textures--}function S(L){const w=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(w.__webglFramebuffer[$]))for(let J=0;J<w.__webglFramebuffer[$].length;J++)i.deleteFramebuffer(w.__webglFramebuffer[$][J]);else i.deleteFramebuffer(w.__webglFramebuffer[$]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[$])}else{if(Array.isArray(w.__webglFramebuffer))for(let $=0;$<w.__webglFramebuffer.length;$++)i.deleteFramebuffer(w.__webglFramebuffer[$]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let $=0;$<w.__webglColorRenderbuffer.length;$++)w.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[$]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const V=L.textures;for(let $=0,J=V.length;$<J;$++){const q=n.get(V[$]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(V[$])}n.remove(L)}let C=0;function D(){C=0}function P(){const L=C;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),C+=1,L}function U(L){const w=[];return w.push(L.wrapS),w.push(L.wrapT),w.push(L.wrapR||0),w.push(L.magFilter),w.push(L.minFilter),w.push(L.anisotropy),w.push(L.internalFormat),w.push(L.format),w.push(L.type),w.push(L.generateMipmaps),w.push(L.premultiplyAlpha),w.push(L.flipY),w.push(L.unpackAlignment),w.push(L.colorSpace),w.join()}function F(L,w){const V=n.get(L);if(L.isVideoTexture&&Vt(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&V.__version!==L.version){const $=L.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(V,L,w);return}}else L.isExternalTexture&&(V.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+w)}function H(L,w){const V=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&V.__version!==L.version){j(V,L,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+w)}function Y(L,w){const V=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&V.__version!==L.version){j(V,L,w);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+w)}function X(L,w){const V=n.get(L);if(L.version>0&&V.__version!==L.version){Z(V,L,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+w)}const it={[Ci]:i.REPEAT,[Pi]:i.CLAMP_TO_EDGE,[tc]:i.MIRRORED_REPEAT},ct={[hn]:i.NEAREST,[Cf]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[In]:i.LINEAR,[Xo]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},gt={[Lf]:i.NEVER,[zf]:i.ALWAYS,[Uf]:i.LESS,[Au]:i.LEQUAL,[Nf]:i.EQUAL,[Bf]:i.GEQUAL,[Ff]:i.GREATER,[Of]:i.NOTEQUAL};function zt(L,w){if(w.type===mn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===In||w.magFilter===Xo||w.magFilter===_r||w.magFilter===Ii||w.minFilter===In||w.minFilter===Xo||w.minFilter===_r||w.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,it[w.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,it[w.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,it[w.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,ct[w.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,ct[w.minFilter]),w.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,gt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===hn||w.minFilter!==_r&&w.minFilter!==Ii||w.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(L,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Qt(L,w){let V=!1;L.__webglInit===void 0&&(L.__webglInit=!0,w.addEventListener("dispose",E));const $=w.source;let J=d.get($);J===void 0&&(J={},d.set($,J));const q=U(w);if(q!==L.__cacheKey){J[q]===void 0&&(J[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),J[q].usedTimes++;const wt=J[L.__cacheKey];wt!==void 0&&(J[L.__cacheKey].usedTimes--,wt.usedTimes===0&&b(w)),L.__cacheKey=q,L.__webglTexture=J[q].texture}return V}function ce(L,w,V){return Math.floor(Math.floor(L/V)/w)}function qt(L,w,V,$){const q=L.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,V,$,w.data);else{q.sort((et,ut)=>et.start-ut.start);let wt=0;for(let et=1;et<q.length;et++){const ut=q[wt],Pt=q[et],Et=ut.start+ut.count,lt=ce(Pt.start,w.width,4),kt=ce(ut.start,w.width,4);Pt.start<=Et+1&&lt===kt&&ce(Pt.start+Pt.count-1,w.width,4)===lt?ut.count=Math.max(ut.count,Pt.start+Pt.count-ut.start):(++wt,q[wt]=Pt)}q.length=wt+1;const st=i.getParameter(i.UNPACK_ROW_LENGTH),Mt=i.getParameter(i.UNPACK_SKIP_PIXELS),bt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let et=0,ut=q.length;et<ut;et++){const Pt=q[et],Et=Math.floor(Pt.start/4),lt=Math.ceil(Pt.count/4),kt=Et%w.width,O=Math.floor(Et/w.width),nt=lt,rt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,kt),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,kt,O,nt,rt,V,$,w.data)}L.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,st),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(i.UNPACK_SKIP_ROWS,bt)}}function j(L,w,V){let $=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&($=i.TEXTURE_3D);const J=Qt(L,w),q=w.source;e.bindTexture($,L.__webglTexture,i.TEXTURE0+V);const wt=n.get(q);if(q.version!==wt.__version||J===!0){e.activeTexture(i.TEXTURE0+V);const st=jt.getPrimaries(jt.workingColorSpace),Mt=w.colorSpace===ni?null:jt.getPrimaries(w.colorSpace),bt=w.colorSpace===ni||st===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let et=v(w.image,!1,s.maxTextureSize);et=Le(w,et);const ut=r.convert(w.format,w.colorSpace),Pt=r.convert(w.type);let Et=x(w.internalFormat,ut,Pt,w.colorSpace,w.isVideoTexture);zt($,w);let lt;const kt=w.mipmaps,O=w.isVideoTexture!==!0,nt=wt.__version===void 0||J===!0,rt=q.dataReady,mt=M(w,et);if(w.isDepthTexture)Et=_(w.format===ar,w.type),nt&&(O?e.texStorage2D(i.TEXTURE_2D,1,Et,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,ut,Pt,null));else if(w.isDataTexture)if(kt.length>0){O&&nt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,kt[0].width,kt[0].height);for(let Q=0,K=kt.length;Q<K;Q++)lt=kt[Q],O?rt&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,Pt,lt.data):e.texImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,ut,Pt,lt.data);w.generateMipmaps=!1}else O?(nt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,et.width,et.height),rt&&qt(w,et,ut,Pt)):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,ut,Pt,et.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){O&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Et,kt[0].width,kt[0].height,et.depth);for(let Q=0,K=kt.length;Q<K;Q++)if(lt=kt[Q],w.format!==ln)if(ut!==null)if(O){if(rt)if(w.layerUpdates.size>0){const vt=ph(lt.width,lt.height,w.format,w.type);for(const Ot of w.layerUpdates){const re=lt.data.subarray(Ot*vt/lt.data.BYTES_PER_ELEMENT,(Ot+1)*vt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Ot,lt.width,lt.height,1,ut,re)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Et,lt.width,lt.height,et.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,Pt,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,Et,lt.width,lt.height,et.depth,0,ut,Pt,lt.data)}else{O&&nt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,kt[0].width,kt[0].height);for(let Q=0,K=kt.length;Q<K;Q++)lt=kt[Q],w.format!==ln?ut!==null?O?rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?rt&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,Pt,lt.data):e.texImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,ut,Pt,lt.data)}else if(w.isDataArrayTexture)if(O){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Et,et.width,et.height,et.depth),rt)if(w.layerUpdates.size>0){const Q=ph(et.width,et.height,w.format,w.type);for(const K of w.layerUpdates){const vt=et.data.subarray(K*Q/et.data.BYTES_PER_ELEMENT,(K+1)*Q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,ut,Pt,vt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,Pt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,et.width,et.height,et.depth,0,ut,Pt,et.data);else if(w.isData3DTexture)O?(nt&&e.texStorage3D(i.TEXTURE_3D,mt,Et,et.width,et.height,et.depth),rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,Pt,et.data)):e.texImage3D(i.TEXTURE_3D,0,Et,et.width,et.height,et.depth,0,ut,Pt,et.data);else if(w.isFramebufferTexture){if(nt)if(O)e.texStorage2D(i.TEXTURE_2D,mt,Et,et.width,et.height);else{let Q=et.width,K=et.height;for(let vt=0;vt<mt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Et,Q,K,0,ut,Pt,null),Q>>=1,K>>=1}}else if(kt.length>0){if(O&&nt){const Q=ye(kt[0]);e.texStorage2D(i.TEXTURE_2D,mt,Et,Q.width,Q.height)}for(let Q=0,K=kt.length;Q<K;Q++)lt=kt[Q],O?rt&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ut,Pt,lt):e.texImage2D(i.TEXTURE_2D,Q,Et,ut,Pt,lt);w.generateMipmaps=!1}else if(O){if(nt){const Q=ye(et);e.texStorage2D(i.TEXTURE_2D,mt,Et,Q.width,Q.height)}rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Pt,et)}else e.texImage2D(i.TEXTURE_2D,0,Et,ut,Pt,et);m(w)&&p($),wt.__version=q.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function Z(L,w,V){if(w.image.length!==6)return;const $=Qt(L,w),J=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+V);const q=n.get(J);if(J.version!==q.__version||$===!0){e.activeTexture(i.TEXTURE0+V);const wt=jt.getPrimaries(jt.workingColorSpace),st=w.colorSpace===ni?null:jt.getPrimaries(w.colorSpace),Mt=w.colorSpace===ni||wt===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const bt=w.isCompressedTexture||w.image[0].isCompressedTexture,et=w.image[0]&&w.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!bt&&!et?ut[K]=v(w.image[K],!0,s.maxCubemapSize):ut[K]=et?w.image[K].image:w.image[K],ut[K]=Le(w,ut[K]);const Pt=ut[0],Et=r.convert(w.format,w.colorSpace),lt=r.convert(w.type),kt=x(w.internalFormat,Et,lt,w.colorSpace),O=w.isVideoTexture!==!0,nt=q.__version===void 0||$===!0,rt=J.dataReady;let mt=M(w,Pt);zt(i.TEXTURE_CUBE_MAP,w);let Q;if(bt){O&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,kt,Pt.width,Pt.height);for(let K=0;K<6;K++){Q=ut[K].mipmaps;for(let vt=0;vt<Q.length;vt++){const Ot=Q[vt];w.format!==ln?Et!==null?O?rt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt,0,0,Ot.width,Ot.height,Et,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt,kt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt,0,0,Ot.width,Ot.height,Et,lt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt,kt,Ot.width,Ot.height,0,Et,lt,Ot.data)}}}else{if(Q=w.mipmaps,O&&nt){Q.length>0&&mt++;const K=ye(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,kt,K.width,K.height)}for(let K=0;K<6;K++)if(et){O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Et,lt,ut[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,ut[K].width,ut[K].height,0,Et,lt,ut[K].data);for(let vt=0;vt<Q.length;vt++){const re=Q[vt].image[K].image;O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt+1,0,0,re.width,re.height,Et,lt,re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt+1,kt,re.width,re.height,0,Et,lt,re.data)}}else{O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Et,lt,ut[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,Et,lt,ut[K]);for(let vt=0;vt<Q.length;vt++){const Ot=Q[vt];O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt+1,0,0,Et,lt,Ot.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,vt+1,kt,Et,lt,Ot.image[K])}}}m(w)&&p(i.TEXTURE_CUBE_MAP),q.__version=J.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function pt(L,w,V,$,J,q){const wt=r.convert(V.format,V.colorSpace),st=r.convert(V.type),Mt=x(V.internalFormat,wt,st,V.colorSpace),bt=n.get(w),et=n.get(V);if(et.__renderTarget=w,!bt.__hasExternalTextures){const ut=Math.max(1,w.width>>q),Pt=Math.max(1,w.height>>q);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,q,Mt,ut,Pt,w.depth,0,wt,st,null):e.texImage2D(J,q,Mt,ut,Pt,0,wt,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,L),yt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,J,et.__webglTexture,0,fe(w)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,J,et.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(L,w,V){if(i.bindRenderbuffer(i.RENDERBUFFER,L),w.depthBuffer){const $=w.depthTexture,J=$&&$.isDepthTexture?$.type:null,q=_(w.stencilBuffer,J),wt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=fe(w);yt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,q,w.width,w.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,q,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,q,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,L)}else{const $=w.textures;for(let J=0;J<$.length;J++){const q=$[J],wt=r.convert(q.format,q.colorSpace),st=r.convert(q.type),Mt=x(q.internalFormat,wt,st,q.colorSpace),bt=fe(w);V&&yt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,Mt,w.width,w.height):yt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,Mt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function St(L,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,L),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(w.depthTexture);$.__renderTarget=w,(!$.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),F(w.depthTexture,0);const J=$.__webglTexture,q=fe(w);if(w.depthTexture.format===or)yt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(w.depthTexture.format===ar)yt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Yt(L){const w=n.get(L),V=L.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==L.depthTexture){const $=L.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),$){const J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=$}if(L.depthTexture&&!w.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const $=L.texture.mipmaps;$&&$.length>0?St(w.__webglFramebuffer[0],L):St(w.__webglFramebuffer,L)}else if(V){w.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[$]),w.__webglDepthbuffer[$]===void 0)w.__webglDepthbuffer[$]=i.createRenderbuffer(),It(w.__webglDepthbuffer[$],L,!1);else{const J=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=w.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}else{const $=L.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),It(w.__webglDepthbuffer,L,!1);else{const J=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function be(L,w,V){const $=n.get(L);w!==void 0&&pt($.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Yt(L)}function N(L){const w=L.texture,V=n.get(L),$=n.get(w);L.addEventListener("dispose",T);const J=L.textures,q=L.isWebGLCubeRenderTarget===!0,wt=J.length>1;if(wt||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=w.version,o.memory.textures++),q){V.__webglFramebuffer=[];for(let st=0;st<6;st++)if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer[st]=[];for(let Mt=0;Mt<w.mipmaps.length;Mt++)V.__webglFramebuffer[st][Mt]=i.createFramebuffer()}else V.__webglFramebuffer[st]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer=[];for(let st=0;st<w.mipmaps.length;st++)V.__webglFramebuffer[st]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(wt)for(let st=0,Mt=J.length;st<Mt;st++){const bt=n.get(J[st]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&yt(L)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let st=0;st<J.length;st++){const Mt=J[st];V.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[st]);const bt=r.convert(Mt.format,Mt.colorSpace),et=r.convert(Mt.type),ut=x(Mt.internalFormat,bt,et,Mt.colorSpace,L.isXRRenderTarget===!0),Pt=fe(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,ut,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,V.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),It(V.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),zt(i.TEXTURE_CUBE_MAP,w);for(let st=0;st<6;st++)if(w.mipmaps&&w.mipmaps.length>0)for(let Mt=0;Mt<w.mipmaps.length;Mt++)pt(V.__webglFramebuffer[st][Mt],L,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt);else pt(V.__webglFramebuffer[st],L,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let st=0,Mt=J.length;st<Mt;st++){const bt=J[st],et=n.get(bt);let ut=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ut=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,et.__webglTexture),zt(ut,bt),pt(V.__webglFramebuffer,L,bt,i.COLOR_ATTACHMENT0+st,ut,0),m(bt)&&p(ut)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(st=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,$.__webglTexture),zt(st,w),w.mipmaps&&w.mipmaps.length>0)for(let Mt=0;Mt<w.mipmaps.length;Mt++)pt(V.__webglFramebuffer[Mt],L,w,i.COLOR_ATTACHMENT0,st,Mt);else pt(V.__webglFramebuffer,L,w,i.COLOR_ATTACHMENT0,st,0);m(w)&&p(st),e.unbindTexture()}L.depthBuffer&&Yt(L)}function de(L){const w=L.textures;for(let V=0,$=w.length;V<$;V++){const J=w[V];if(m(J)){const q=y(L),wt=n.get(J).__webglTexture;e.bindTexture(q,wt),p(q),e.unbindTexture()}}}const Bt=[],Dt=[];function xt(L){if(L.samples>0){if(yt(L)===!1){const w=L.textures,V=L.width,$=L.height;let J=i.COLOR_BUFFER_BIT;const q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(L),st=w.length>1;if(st)for(let bt=0;bt<w.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const Mt=L.texture.mipmaps;Mt&&Mt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let bt=0;bt<w.length;bt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);const et=n.get(w[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,V,$,0,0,V,$,J,i.NEAREST),c===!0&&(Bt.length=0,Dt.length=0,Bt.push(i.COLOR_ATTACHMENT0+bt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Bt.push(q),Dt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let bt=0;bt<w.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);const et=n.get(w[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const w=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function fe(L){return Math.min(s.maxSamples,L.samples)}function yt(L){const w=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Vt(L){const w=o.render.frame;h.get(L)!==w&&(h.set(L,w),L.update())}function Le(L,w){const V=L.colorSpace,$=L.format,J=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||V!==Es&&V!==ni&&(jt.getTransfer(V)===ee?($!==ln||J!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),w}function ye(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=D,this.setTexture2D=F,this.setTexture2DArray=H,this.setTexture3D=Y,this.setTextureCube=X,this.rebindTextures=be,this.setupRenderTarget=N,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=yt}function Yv(i,t){function e(n,s=ni){let r;const o=jt.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===Xc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Su)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===xu)return i.BYTE;if(n===yu)return i.SHORT;if(n===sr)return i.UNSIGNED_SHORT;if(n===Wc)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===dr)return i.HALF_FLOAT;if(n===bu)return i.ALPHA;if(n===Eu)return i.RGB;if(n===ln)return i.RGBA;if(n===or)return i.DEPTH_COMPONENT;if(n===ar)return i.DEPTH_STENCIL;if(n===Yc)return i.RED;if(n===Lo)return i.RED_INTEGER;if(n===Tu)return i.RG;if(n===$c)return i.RG_INTEGER;if(n===jc)return i.RGBA_INTEGER;if(n===po||n===mo||n===go||n===_o)if(o===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ec||n===nc||n===ic||n===sc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rc||n===oc||n===ac)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rc||n===oc)return o===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ac)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===_c||n===vc||n===xc||n===yc||n===Mc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mc)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sc||n===bc||n===Ec)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sc)return o===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tc||n===wc||n===Ac||n===Rc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Tc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ac)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const $v=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Kv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Hu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ci({vertexShader:$v,fragmentShader:jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new Gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zv extends Ui{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new Kv,p={},y=e.getContextAttributes();let x=null,_=null;const M=[],E=[],T=new ot;let A=null;const b=new sn;b.viewport=new ie;const S=new sn;S.viewport=new ie;const C=[b,S],D=new fm;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=M[j];return Z===void 0&&(Z=new da,M[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=M[j];return Z===void 0&&(Z=new da,M[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=M[j];return Z===void 0&&(Z=new da,M[j]=Z),Z.getHandSpace()};function F(j){const Z=E.indexOf(j.inputSource);if(Z===-1)return;const pt=M[Z];pt!==void 0&&(pt.update(j.inputSource,j.frame,l||o),pt.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",Y);for(let j=0;j<M.length;j++){const Z=E[j];Z!==null&&(E[j]=null,M[j].disconnect(Z))}P=null,U=null,m.reset();for(const j in p)delete p[j];t.setRenderTarget(x),f=null,d=null,u=null,s=null,_=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(x=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",H),s.addEventListener("inputsourceschange",Y),y.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,It=null,St=null;y.depth&&(St=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=y.stencil?ar:or,It=y.stencil?rr:oi);const Yt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Yt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Li(d.textureWidth,d.textureHeight,{format:ln,type:Ln,depthTexture:new ku(d.textureWidth,d.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const pt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Li(f.framebufferWidth,f.framebufferHeight,{format:ln,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),qt.setContext(s),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(j){for(let Z=0;Z<j.removed.length;Z++){const pt=j.removed[Z],It=E.indexOf(pt);It>=0&&(E[It]=null,M[It].disconnect(pt))}for(let Z=0;Z<j.added.length;Z++){const pt=j.added[Z];let It=E.indexOf(pt);if(It===-1){for(let Yt=0;Yt<M.length;Yt++)if(Yt>=E.length){E.push(pt),It=Yt;break}else if(E[Yt]===null){E[Yt]=pt,It=Yt;break}if(It===-1)break}const St=M[It];St&&St.connect(pt)}}const X=new I,it=new I;function ct(j,Z,pt){X.setFromMatrixPosition(Z.matrixWorld),it.setFromMatrixPosition(pt.matrixWorld);const It=X.distanceTo(it),St=Z.projectionMatrix.elements,Yt=pt.projectionMatrix.elements,be=St[14]/(St[10]-1),N=St[14]/(St[10]+1),de=(St[9]+1)/St[5],Bt=(St[9]-1)/St[5],Dt=(St[8]-1)/St[0],xt=(Yt[8]+1)/Yt[0],fe=be*Dt,yt=be*xt,Vt=It/(-Dt+xt),Le=Vt*-Dt;if(Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Le),j.translateZ(Vt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),St[10]===-1)j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const ye=be+Vt,L=N+Vt,w=fe-Le,V=yt+(It-Le),$=de*N/L*ye,J=Bt*N/L*ye;j.projectionMatrix.makePerspective(w,V,$,J,ye,L),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function gt(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Z=j.near,pt=j.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),D.near=S.near=b.near=Z,D.far=S.far=b.far=pt,(P!==D.near||U!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),P=D.near,U=D.far),D.layers.mask=j.layers.mask|6,b.layers.mask=D.layers.mask&3,S.layers.mask=D.layers.mask&5;const It=j.parent,St=D.cameras;gt(D,It);for(let Yt=0;Yt<St.length;Yt++)gt(St[Yt],It);St.length===2?ct(D,b,S):D.projectionMatrix.copy(b.projectionMatrix),zt(j,D,It)};function zt(j,Z,pt){pt===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(pt.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ts*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(j){return p[j]};let Qt=null;function ce(j,Z){if(h=Z.getViewerPose(l||o),g=Z,h!==null){const pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let It=!1;pt.length!==D.cameras.length&&(D.cameras.length=0,It=!0);for(let N=0;N<pt.length;N++){const de=pt[N];let Bt=null;if(f!==null)Bt=f.getViewport(de);else{const xt=u.getViewSubImage(d,de);Bt=xt.viewport,N===0&&(t.setRenderTargetTextures(_,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(_))}let Dt=C[N];Dt===void 0&&(Dt=new sn,Dt.layers.enable(N),Dt.viewport=new ie,C[N]=Dt),Dt.matrix.fromArray(de.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(de.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),N===0&&(D.matrix.copy(Dt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),It===!0&&D.cameras.push(Dt)}const St=s.enabledFeatures;if(St&&St.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const N=u.getDepthInformation(pt[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(St&&St.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let N=0;N<pt.length;N++){const de=pt[N].camera;if(de){let Bt=p[de];Bt||(Bt=new Hu,p[de]=Bt);const Dt=u.getCameraImage(de);Bt.sourceTexture=Dt}}}}for(let pt=0;pt<M.length;pt++){const It=E[pt],St=M[pt];It!==null&&St!==void 0&&St.update(It,Z,l||o)}Qt&&Qt(j,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const qt=new Xu;qt.setAnimationLoop(ce),this.setAnimationLoop=function(j){Qt=j},this.dispose=function(){}}}const xi=new Fe,Jv=new Wt;function Qv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ze&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ze&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),x=y.envMap,_=y.envMapRotation;x&&(m.envMap.value=x,xi.copy(_),xi.x*=-1,xi.y*=-1,xi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(Jv.makeRotationFromEuler(xi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ze&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function tx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const _=x.program;n.uniformBlockBinding(y,_)}function l(y,x){let _=s[y.id];_===void 0&&(g(y),_=h(y),s[y.id]=_,y.addEventListener("dispose",m));const M=x.program;n.updateUBOMapping(y,M);const E=t.render.frame;r[y.id]!==E&&(d(y),r[y.id]=E)}function h(y){const x=u();y.__bindingPointIndex=x;const _=i.createBuffer(),M=y.__size,E=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,M,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,_),_}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=s[y.id],_=y.uniforms,M=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,T=_.length;E<T;E++){const A=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,S=A.length;b<S;b++){const C=A[b];if(f(C,E,b,M)===!0){const D=C.__offset,P=Array.isArray(C.value)?C.value:[C.value];let U=0;for(let F=0;F<P.length;F++){const H=P[F],Y=v(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,D+U,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,U),U+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,x,_,M){const E=y.value,T=x+"_"+_;if(M[T]===void 0)return typeof E=="number"||typeof E=="boolean"?M[T]=E:M[T]=E.clone(),!0;{const A=M[T];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return M[T]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function g(y){const x=y.uniforms;let _=0;const M=16;for(let T=0,A=x.length;T<A;T++){const b=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,C=b.length;S<C;S++){const D=b[S],P=Array.isArray(D.value)?D.value:[D.value];for(let U=0,F=P.length;U<F;U++){const H=P[U],Y=v(H),X=_%M,it=X%Y.boundary,ct=X+it;_+=it,ct!==0&&M-ct<Y.storage&&(_+=M-ct),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=Y.storage}}}const E=_%M;return E>0&&(_+=M-E),y.__size=_,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const _=o.indexOf(x.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class ex{constructor(t={}){const{canvas:e=np(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let M=!1;this._outputColorSpace=nn;let E=0,T=0,A=null,b=-1,S=null;const C=new ie,D=new ie;let P=null;const U=new Xt(0);let F=0,H=e.width,Y=e.height,X=1,it=null,ct=null;const gt=new ie(0,0,H,Y),zt=new ie(0,0,H,Y);let Qt=!1;const ce=new fr;let qt=!1,j=!1;const Z=new Wt,pt=new I,It=new ie,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function be(){return A===null?X:1}let N=n;function de(R,z){return e.getContext(R,z)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ur}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",Q,!1),N===null){const z="webgl2";if(N=de(z,R),N===null)throw de(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Bt,Dt,xt,fe,yt,Vt,Le,ye,L,w,V,$,J,q,wt,st,Mt,bt,et,ut,Pt,Et,lt,kt;function O(){Bt=new u_(N),Bt.init(),Et=new Yv(N,Bt),Dt=new s_(N,Bt,t,Et),xt=new Xv(N,Bt),Dt.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),fe=new p_(N),yt=new Dv,Vt=new qv(N,Bt,xt,yt,Dt,Et,fe),Le=new o_(_),ye=new h_(_),L=new ym(N),lt=new n_(N,L),w=new d_(N,L,fe,lt),V=new g_(N,w,L,fe),et=new m_(N,Dt,Vt),st=new r_(yt),$=new Iv(_,Le,ye,Bt,Dt,lt,st),J=new Qv(_,yt),q=new Uv,wt=new kv(Bt),bt=new e_(_,Le,ye,xt,V,f,c),Mt=new Gv(_,V,Dt),kt=new tx(N,fe,Dt,xt),ut=new i_(N,Bt,fe),Pt=new f_(N,Bt,fe),fe.programs=$.programs,_.capabilities=Dt,_.extensions=Bt,_.properties=yt,_.renderLists=q,_.shadowMap=Mt,_.state=xt,_.info=fe}O();const nt=new Zv(_,N);this.xr=nt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const R=Bt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Bt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(R){R!==void 0&&(X=R,this.setSize(H,Y,!1))},this.getSize=function(R){return R.set(H,Y)},this.setSize=function(R,z,G=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=R,Y=z,e.width=Math.floor(R*X),e.height=Math.floor(z*X),G===!0&&(e.style.width=R+"px",e.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(H*X,Y*X).floor()},this.setDrawingBufferSize=function(R,z,G){H=R,Y=z,X=G,e.width=Math.floor(R*G),e.height=Math.floor(z*G),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(gt)},this.setViewport=function(R,z,G,W){R.isVector4?gt.set(R.x,R.y,R.z,R.w):gt.set(R,z,G,W),xt.viewport(C.copy(gt).multiplyScalar(X).round())},this.getScissor=function(R){return R.copy(zt)},this.setScissor=function(R,z,G,W){R.isVector4?zt.set(R.x,R.y,R.z,R.w):zt.set(R,z,G,W),xt.scissor(D.copy(zt).multiplyScalar(X).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(R){xt.setScissorTest(Qt=R)},this.setOpaqueSort=function(R){it=R},this.setTransparentSort=function(R){ct=R},this.getClearColor=function(R){return R.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(R=!0,z=!0,G=!0){let W=0;if(R){let k=!1;if(A!==null){const tt=A.texture.format;k=tt===jc||tt===$c||tt===Lo}if(k){const tt=A.texture.type,ht=tt===Ln||tt===oi||tt===sr||tt===rr||tt===Xc||tt===qc,_t=bt.getClearColor(),ft=bt.getClearAlpha(),Ct=_t.r,Lt=_t.g,At=_t.b;ht?(g[0]=Ct,g[1]=Lt,g[2]=At,g[3]=ft,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Ct,v[1]=Lt,v[2]=At,v[3]=ft,N.clearBufferiv(N.COLOR,0,v))}else W|=N.COLOR_BUFFER_BIT}z&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",Q,!1),bt.dispose(),q.dispose(),wt.dispose(),yt.dispose(),Le.dispose(),ye.dispose(),V.dispose(),lt.dispose(),kt.dispose(),$.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",wn),nt.removeEventListener("sessionend",ml),hi.stop()};function rt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=fe.autoReset,z=Mt.enabled,G=Mt.autoUpdate,W=Mt.needsUpdate,k=Mt.type;O(),fe.autoReset=R,Mt.enabled=z,Mt.autoUpdate=G,Mt.needsUpdate=W,Mt.type=k}function Q(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function K(R){const z=R.target;z.removeEventListener("dispose",K),vt(z)}function vt(R){Ot(R),yt.remove(R)}function Ot(R){const z=yt.get(R).programs;z!==void 0&&(z.forEach(function(G){$.releaseProgram(G)}),R.isShaderMaterial&&$.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,G,W,k,tt){z===null&&(z=St);const ht=k.isMesh&&k.matrixWorld.determinant()<0,_t=ud(R,z,G,W,k);xt.setMaterial(W,ht);let ft=G.index,Ct=1;if(W.wireframe===!0){if(ft=w.getWireframeAttribute(G),ft===void 0)return;Ct=2}const Lt=G.drawRange,At=G.attributes.position;let $t=Lt.start*Ct,te=(Lt.start+Lt.count)*Ct;tt!==null&&($t=Math.max($t,tt.start*Ct),te=Math.min(te,(tt.start+tt.count)*Ct)),ft!==null?($t=Math.max($t,0),te=Math.min(te,ft.count)):At!=null&&($t=Math.max($t,0),te=Math.min(te,At.count));const ve=te-$t;if(ve<0||ve===1/0)return;lt.setup(k,W,_t,G,ft);let le,se=ut;if(ft!==null&&(le=L.get(ft),se=Pt,se.setIndex(le)),k.isMesh)W.wireframe===!0?(xt.setLineWidth(W.wireframeLinewidth*be()),se.setMode(N.LINES)):se.setMode(N.TRIANGLES);else if(k.isLine){let Rt=W.linewidth;Rt===void 0&&(Rt=1),xt.setLineWidth(Rt*be()),k.isLineSegments?se.setMode(N.LINES):k.isLineLoop?se.setMode(N.LINE_LOOP):se.setMode(N.LINE_STRIP)}else k.isPoints?se.setMode(N.POINTS):k.isSprite&&se.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)lr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))se.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Rt=k._multiDrawStarts,pe=k._multiDrawCounts,Zt=k._multiDrawCount,rn=ft?L.get(ft).bytesPerElement:1,Fi=yt.get(W).currentProgram.getUniforms();for(let on=0;on<Zt;on++)Fi.setValue(N,"_gl_DrawID",on),se.render(Rt[on]/rn,pe[on])}else if(k.isInstancedMesh)se.renderInstances($t,ve,k.count);else if(G.isInstancedBufferGeometry){const Rt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,pe=Math.min(G.instanceCount,Rt);se.renderInstances($t,ve,pe)}else se.render($t,ve)};function re(R,z,G){R.transparent===!0&&R.side===Ae&&R.forceSinglePass===!1?(R.side=Ze,R.needsUpdate=!0,gr(R,z,G),R.side=Dn,R.needsUpdate=!0,gr(R,z,G),R.side=Ae):gr(R,z,G)}this.compile=function(R,z,G=null){G===null&&(G=R),p=wt.get(G),p.init(z),x.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),R!==G&&R.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const W=new Set;return R.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const tt=k.material;if(tt)if(Array.isArray(tt))for(let ht=0;ht<tt.length;ht++){const _t=tt[ht];re(_t,G,k),W.add(_t)}else re(tt,G,k),W.add(tt)}),p=x.pop(),W},this.compileAsync=function(R,z,G=null){const W=this.compile(R,z,G);return new Promise(k=>{function tt(){if(W.forEach(function(ht){yt.get(ht).currentProgram.isReady()&&W.delete(ht)}),W.size===0){k(R);return}setTimeout(tt,10)}Bt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Jt=null;function Un(R){Jt&&Jt(R)}function wn(){hi.stop()}function ml(){hi.start()}const hi=new Xu;hi.setAnimationLoop(Un),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(R){Jt=R,nt.setAnimationLoop(R),R===null?hi.stop():hi.start()},nt.addEventListener("sessionstart",wn),nt.addEventListener("sessionend",ml),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(z),z=nt.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,z,A),p=wt.get(R,x.length),p.init(z),x.push(p),Z.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ce.setFromProjectionMatrix(Z,bn,z.reversedDepth),j=this.localClippingEnabled,qt=st.init(this.clippingPlanes,j),m=q.get(R,y.length),m.init(),y.push(m),nt.enabled===!0&&nt.isPresenting===!0){const tt=_.xr.getDepthSensingMesh();tt!==null&&Go(tt,z,-1/0,_.sortObjects)}Go(R,z,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(it,ct),Yt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Yt&&bt.addToRenderList(m,R),this.info.render.frame++,qt===!0&&st.beginShadows();const G=p.state.shadowsArray;Mt.render(G,R,z),qt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){const tt=z.cameras;if(k.length>0)for(let ht=0,_t=tt.length;ht<_t;ht++){const ft=tt[ht];_l(W,k,R,ft)}Yt&&bt.render(R);for(let ht=0,_t=tt.length;ht<_t;ht++){const ft=tt[ht];gl(m,R,ft,ft.viewport)}}else k.length>0&&_l(W,k,R,z),Yt&&bt.render(R),gl(m,R,z);A!==null&&T===0&&(Vt.updateMultisampleRenderTarget(A),Vt.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(_,R,z),lt.resetDefaultState(),b=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],qt===!0&&st.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Go(R,z,G,W){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)G=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ce.intersectsSprite(R)){W&&It.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Z);const ht=V.update(R),_t=R.material;_t.visible&&m.push(R,ht,_t,G,It.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ce.intersectsObject(R))){const ht=V.update(R),_t=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),It.copy(R.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),It.copy(ht.boundingSphere.center)),It.applyMatrix4(R.matrixWorld).applyMatrix4(Z)),Array.isArray(_t)){const ft=ht.groups;for(let Ct=0,Lt=ft.length;Ct<Lt;Ct++){const At=ft[Ct],$t=_t[At.materialIndex];$t&&$t.visible&&m.push(R,ht,$t,G,It.z,At)}}else _t.visible&&m.push(R,ht,_t,G,It.z,null)}}const tt=R.children;for(let ht=0,_t=tt.length;ht<_t;ht++)Go(tt[ht],z,G,W)}function gl(R,z,G,W){const k=R.opaque,tt=R.transmissive,ht=R.transparent;p.setupLightsView(G),qt===!0&&st.setGlobalState(_.clippingPlanes,G),W&&xt.viewport(C.copy(W)),k.length>0&&mr(k,z,G),tt.length>0&&mr(tt,z,G),ht.length>0&&mr(ht,z,G),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function _l(R,z,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Li(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?dr:Ln,minFilter:Ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const tt=p.state.transmissionRenderTarget[W.id],ht=W.viewport||C;tt.setSize(ht.z*_.transmissionResolutionScale,ht.w*_.transmissionResolutionScale);const _t=_.getRenderTarget(),ft=_.getActiveCubeFace(),Ct=_.getActiveMipmapLevel();_.setRenderTarget(tt),_.getClearColor(U),F=_.getClearAlpha(),F<1&&_.setClearColor(16777215,.5),_.clear(),Yt&&bt.render(G);const Lt=_.toneMapping;_.toneMapping=ri;const At=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),qt===!0&&st.setGlobalState(_.clippingPlanes,W),mr(R,G,W),Vt.updateMultisampleRenderTarget(tt),Vt.updateRenderTargetMipmap(tt),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let te=0,ve=z.length;te<ve;te++){const le=z[te],se=le.object,Rt=le.geometry,pe=le.material,Zt=le.group;if(pe.side===Ae&&se.layers.test(W.layers)){const rn=pe.side;pe.side=Ze,pe.needsUpdate=!0,vl(se,G,W,Rt,pe,Zt),pe.side=rn,pe.needsUpdate=!0,$t=!0}}$t===!0&&(Vt.updateMultisampleRenderTarget(tt),Vt.updateRenderTargetMipmap(tt))}_.setRenderTarget(_t,ft,Ct),_.setClearColor(U,F),At!==void 0&&(W.viewport=At),_.toneMapping=Lt}function mr(R,z,G){const W=z.isScene===!0?z.overrideMaterial:null;for(let k=0,tt=R.length;k<tt;k++){const ht=R[k],_t=ht.object,ft=ht.geometry,Ct=ht.group;let Lt=ht.material;Lt.allowOverride===!0&&W!==null&&(Lt=W),_t.layers.test(G.layers)&&vl(_t,z,G,ft,Lt,Ct)}}function vl(R,z,G,W,k,tt){R.onBeforeRender(_,z,G,W,k,tt),R.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),k.onBeforeRender(_,z,G,W,R,tt),k.transparent===!0&&k.side===Ae&&k.forceSinglePass===!1?(k.side=Ze,k.needsUpdate=!0,_.renderBufferDirect(G,z,W,k,R,tt),k.side=Dn,k.needsUpdate=!0,_.renderBufferDirect(G,z,W,k,R,tt),k.side=Ae):_.renderBufferDirect(G,z,W,k,R,tt),R.onAfterRender(_,z,G,W,k,tt)}function gr(R,z,G){z.isScene!==!0&&(z=St);const W=yt.get(R),k=p.state.lights,tt=p.state.shadowsArray,ht=k.state.version,_t=$.getParameters(R,k.state,tt,z,G),ft=$.getProgramCacheKey(_t);let Ct=W.programs;W.environment=R.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(R.isMeshStandardMaterial?ye:Le).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Ct===void 0&&(R.addEventListener("dispose",K),Ct=new Map,W.programs=Ct);let Lt=Ct.get(ft);if(Lt!==void 0){if(W.currentProgram===Lt&&W.lightsStateVersion===ht)return yl(R,_t),Lt}else _t.uniforms=$.getUniforms(R),R.onBeforeCompile(_t,_),Lt=$.acquireProgram(_t,ft),Ct.set(ft,Lt),W.uniforms=_t.uniforms;const At=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(At.clippingPlanes=st.uniform),yl(R,_t),W.needsLights=fd(R),W.lightsStateVersion=ht,W.needsLights&&(At.ambientLightColor.value=k.state.ambient,At.lightProbe.value=k.state.probe,At.directionalLights.value=k.state.directional,At.directionalLightShadows.value=k.state.directionalShadow,At.spotLights.value=k.state.spot,At.spotLightShadows.value=k.state.spotShadow,At.rectAreaLights.value=k.state.rectArea,At.ltc_1.value=k.state.rectAreaLTC1,At.ltc_2.value=k.state.rectAreaLTC2,At.pointLights.value=k.state.point,At.pointLightShadows.value=k.state.pointShadow,At.hemisphereLights.value=k.state.hemi,At.directionalShadowMap.value=k.state.directionalShadowMap,At.directionalShadowMatrix.value=k.state.directionalShadowMatrix,At.spotShadowMap.value=k.state.spotShadowMap,At.spotLightMatrix.value=k.state.spotLightMatrix,At.spotLightMap.value=k.state.spotLightMap,At.pointShadowMap.value=k.state.pointShadowMap,At.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Lt,W.uniformsList=null,Lt}function xl(R){if(R.uniformsList===null){const z=R.currentProgram.getUniforms();R.uniformsList=xo.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function yl(R,z){const G=yt.get(R);G.outputColorSpace=z.outputColorSpace,G.batching=z.batching,G.batchingColor=z.batchingColor,G.instancing=z.instancing,G.instancingColor=z.instancingColor,G.instancingMorph=z.instancingMorph,G.skinning=z.skinning,G.morphTargets=z.morphTargets,G.morphNormals=z.morphNormals,G.morphColors=z.morphColors,G.morphTargetsCount=z.morphTargetsCount,G.numClippingPlanes=z.numClippingPlanes,G.numIntersection=z.numClipIntersection,G.vertexAlphas=z.vertexAlphas,G.vertexTangents=z.vertexTangents,G.toneMapping=z.toneMapping}function ud(R,z,G,W,k){z.isScene!==!0&&(z=St),Vt.resetTextureUnits();const tt=z.fog,ht=W.isMeshStandardMaterial?z.environment:null,_t=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Es,ft=(W.isMeshStandardMaterial?ye:Le).get(W.envMap||ht),Ct=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Lt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),At=!!G.morphAttributes.position,$t=!!G.morphAttributes.normal,te=!!G.morphAttributes.color;let ve=ri;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ve=_.toneMapping);const le=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,se=le!==void 0?le.length:0,Rt=yt.get(W),pe=p.state.lights;if(qt===!0&&(j===!0||R!==S)){const $e=R===S&&W.id===b;st.setState(W,R,$e)}let Zt=!1;W.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==pe.state.version||Rt.outputColorSpace!==_t||k.isBatchedMesh&&Rt.batching===!1||!k.isBatchedMesh&&Rt.batching===!0||k.isBatchedMesh&&Rt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Rt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Rt.instancing===!1||!k.isInstancedMesh&&Rt.instancing===!0||k.isSkinnedMesh&&Rt.skinning===!1||!k.isSkinnedMesh&&Rt.skinning===!0||k.isInstancedMesh&&Rt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Rt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Rt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Rt.instancingMorph===!1&&k.morphTexture!==null||Rt.envMap!==ft||W.fog===!0&&Rt.fog!==tt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==st.numPlanes||Rt.numIntersection!==st.numIntersection)||Rt.vertexAlphas!==Ct||Rt.vertexTangents!==Lt||Rt.morphTargets!==At||Rt.morphNormals!==$t||Rt.morphColors!==te||Rt.toneMapping!==ve||Rt.morphTargetsCount!==se)&&(Zt=!0):(Zt=!0,Rt.__version=W.version);let rn=Rt.currentProgram;Zt===!0&&(rn=gr(W,z,k));let Fi=!1,on=!1,Ls=!1;const me=rn.getUniforms(),un=Rt.uniforms;if(xt.useProgram(rn.program)&&(Fi=!0,on=!0,Ls=!0),W.id!==b&&(b=W.id,on=!0),Fi||S!==R){xt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),me.setValue(N,"projectionMatrix",R.projectionMatrix),me.setValue(N,"viewMatrix",R.matrixWorldInverse);const Qe=me.map.cameraPosition;Qe!==void 0&&Qe.setValue(N,pt.setFromMatrixPosition(R.matrixWorld)),Dt.logarithmicDepthBuffer&&me.setValue(N,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&me.setValue(N,"isOrthographic",R.isOrthographicCamera===!0),S!==R&&(S=R,on=!0,Ls=!0)}if(k.isSkinnedMesh){me.setOptional(N,k,"bindMatrix"),me.setOptional(N,k,"bindMatrixInverse");const $e=k.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),me.setValue(N,"boneTexture",$e.boneTexture,Vt))}k.isBatchedMesh&&(me.setOptional(N,k,"batchingTexture"),me.setValue(N,"batchingTexture",k._matricesTexture,Vt),me.setOptional(N,k,"batchingIdTexture"),me.setValue(N,"batchingIdTexture",k._indirectTexture,Vt),me.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&me.setValue(N,"batchingColorTexture",k._colorsTexture,Vt));const dn=G.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&et.update(k,G,rn),(on||Rt.receiveShadow!==k.receiveShadow)&&(Rt.receiveShadow=k.receiveShadow,me.setValue(N,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(un.envMap.value=ft,un.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(un.envMapIntensity.value=z.environmentIntensity),on&&(me.setValue(N,"toneMappingExposure",_.toneMappingExposure),Rt.needsLights&&dd(un,Ls),tt&&W.fog===!0&&J.refreshFogUniforms(un,tt),J.refreshMaterialUniforms(un,W,X,Y,p.state.transmissionRenderTarget[R.id]),xo.upload(N,xl(Rt),un,Vt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(xo.upload(N,xl(Rt),un,Vt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&me.setValue(N,"center",k.center),me.setValue(N,"modelViewMatrix",k.modelViewMatrix),me.setValue(N,"normalMatrix",k.normalMatrix),me.setValue(N,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const $e=W.uniformsGroups;for(let Qe=0,Wo=$e.length;Qe<Wo;Qe++){const ui=$e[Qe];kt.update(ui,rn),kt.bind(ui,rn)}}return rn}function dd(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function fd(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,z,G){const W=yt.get(R);W.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),yt.get(R.texture).__webglTexture=z,yt.get(R.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,z){const G=yt.get(R);G.__webglFramebuffer=z,G.__useDefaultFramebuffer=z===void 0};const pd=N.createFramebuffer();this.setRenderTarget=function(R,z=0,G=0){A=R,E=z,T=G;let W=!0,k=null,tt=!1,ht=!1;if(R){const ft=yt.get(R);if(ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(ft.__webglFramebuffer===void 0)Vt.setupRenderTarget(R);else if(ft.__hasExternalTextures)Vt.rebindTextures(R,yt.get(R.texture).__webglTexture,yt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const At=R.depthTexture;if(ft.__boundDepthTexture!==At){if(At!==null&&yt.has(At)&&(R.width!==At.image.width||R.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Vt.setupDepthRenderbuffer(R)}}const Ct=R.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Lt=yt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Lt[z])?k=Lt[z][G]:k=Lt[z],tt=!0):R.samples>0&&Vt.useMultisampledRTT(R)===!1?k=yt.get(R).__webglMultisampledFramebuffer:Array.isArray(Lt)?k=Lt[G]:k=Lt,C.copy(R.viewport),D.copy(R.scissor),P=R.scissorTest}else C.copy(gt).multiplyScalar(X).floor(),D.copy(zt).multiplyScalar(X).floor(),P=Qt;if(G!==0&&(k=pd),xt.bindFramebuffer(N.FRAMEBUFFER,k)&&W&&xt.drawBuffers(R,k),xt.viewport(C),xt.scissor(D),xt.setScissorTest(P),tt){const ft=yt.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,ft.__webglTexture,G)}else if(ht){const ft=z;for(let Ct=0;Ct<R.textures.length;Ct++){const Lt=yt.get(R.textures[Ct]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ct,Lt.__webglTexture,G,ft)}}else if(R!==null&&G!==0){const ft=yt.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,G)}b=-1},this.readRenderTargetPixels=function(R,z,G,W,k,tt,ht,_t=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ht!==void 0&&(ft=ft[ht]),ft){xt.bindFramebuffer(N.FRAMEBUFFER,ft);try{const Ct=R.textures[_t],Lt=Ct.format,At=Ct.type;if(!Dt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-W&&G>=0&&G<=R.height-k&&(R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),N.readPixels(z,G,W,k,Et.convert(Lt),Et.convert(At),tt))}finally{const Ct=A!==null?yt.get(A).__webglFramebuffer:null;xt.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(R,z,G,W,k,tt,ht,_t=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ht!==void 0&&(ft=ft[ht]),ft)if(z>=0&&z<=R.width-W&&G>=0&&G<=R.height-k){xt.bindFramebuffer(N.FRAMEBUFFER,ft);const Ct=R.textures[_t],Lt=Ct.format,At=Ct.type;if(!Dt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,$t),N.bufferData(N.PIXEL_PACK_BUFFER,tt.byteLength,N.STREAM_READ),R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),N.readPixels(z,G,W,k,Et.convert(Lt),Et.convert(At),0);const te=A!==null?yt.get(A).__webglFramebuffer:null;xt.bindFramebuffer(N.FRAMEBUFFER,te);const ve=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ip(N,ve,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,$t),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,tt),N.deleteBuffer($t),N.deleteSync(ve),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,z=null,G=0){const W=Math.pow(2,-G),k=Math.floor(R.image.width*W),tt=Math.floor(R.image.height*W),ht=z!==null?z.x:0,_t=z!==null?z.y:0;Vt.setTexture2D(R,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ht,_t,k,tt),xt.unbindTexture()};const md=N.createFramebuffer(),gd=N.createFramebuffer();this.copyTextureToTexture=function(R,z,G=null,W=null,k=0,tt=null){tt===null&&(k!==0?(lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=k,k=0):tt=0);let ht,_t,ft,Ct,Lt,At,$t,te,ve;const le=R.isCompressedTexture?R.mipmaps[tt]:R.image;if(G!==null)ht=G.max.x-G.min.x,_t=G.max.y-G.min.y,ft=G.isBox3?G.max.z-G.min.z:1,Ct=G.min.x,Lt=G.min.y,At=G.isBox3?G.min.z:0;else{const dn=Math.pow(2,-k);ht=Math.floor(le.width*dn),_t=Math.floor(le.height*dn),R.isDataArrayTexture?ft=le.depth:R.isData3DTexture?ft=Math.floor(le.depth*dn):ft=1,Ct=0,Lt=0,At=0}W!==null?($t=W.x,te=W.y,ve=W.z):($t=0,te=0,ve=0);const se=Et.convert(z.format),Rt=Et.convert(z.type);let pe;z.isData3DTexture?(Vt.setTexture3D(z,0),pe=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Vt.setTexture2DArray(z,0),pe=N.TEXTURE_2D_ARRAY):(Vt.setTexture2D(z,0),pe=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);const Zt=N.getParameter(N.UNPACK_ROW_LENGTH),rn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Fi=N.getParameter(N.UNPACK_SKIP_PIXELS),on=N.getParameter(N.UNPACK_SKIP_ROWS),Ls=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,le.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,le.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),N.pixelStorei(N.UNPACK_SKIP_ROWS,Lt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,At);const me=R.isDataArrayTexture||R.isData3DTexture,un=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){const dn=yt.get(R),$e=yt.get(z),Qe=yt.get(dn.__renderTarget),Wo=yt.get($e.__renderTarget);xt.bindFramebuffer(N.READ_FRAMEBUFFER,Qe.__webglFramebuffer),xt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Wo.__webglFramebuffer);for(let ui=0;ui<ft;ui++)me&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(R).__webglTexture,k,At+ui),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(z).__webglTexture,tt,ve+ui)),N.blitFramebuffer(Ct,Lt,ht,_t,$t,te,ht,_t,N.DEPTH_BUFFER_BIT,N.NEAREST);xt.bindFramebuffer(N.READ_FRAMEBUFFER,null),xt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||R.isRenderTargetTexture||yt.has(R)){const dn=yt.get(R),$e=yt.get(z);xt.bindFramebuffer(N.READ_FRAMEBUFFER,md),xt.bindFramebuffer(N.DRAW_FRAMEBUFFER,gd);for(let Qe=0;Qe<ft;Qe++)me?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,dn.__webglTexture,k,At+Qe):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,dn.__webglTexture,k),un?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,$e.__webglTexture,tt,ve+Qe):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,$e.__webglTexture,tt),k!==0?N.blitFramebuffer(Ct,Lt,ht,_t,$t,te,ht,_t,N.COLOR_BUFFER_BIT,N.NEAREST):un?N.copyTexSubImage3D(pe,tt,$t,te,ve+Qe,Ct,Lt,ht,_t):N.copyTexSubImage2D(pe,tt,$t,te,Ct,Lt,ht,_t);xt.bindFramebuffer(N.READ_FRAMEBUFFER,null),xt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else un?R.isDataTexture||R.isData3DTexture?N.texSubImage3D(pe,tt,$t,te,ve,ht,_t,ft,se,Rt,le.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(pe,tt,$t,te,ve,ht,_t,ft,se,le.data):N.texSubImage3D(pe,tt,$t,te,ve,ht,_t,ft,se,Rt,le):R.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,tt,$t,te,ht,_t,se,Rt,le.data):R.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,tt,$t,te,le.width,le.height,se,le.data):N.texSubImage2D(N.TEXTURE_2D,tt,$t,te,ht,_t,se,Rt,le);N.pixelStorei(N.UNPACK_ROW_LENGTH,Zt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,rn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Fi),N.pixelStorei(N.UNPACK_SKIP_ROWS,on),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ls),tt===0&&z.generateMipmaps&&N.generateMipmap(pe),xt.unbindTexture()},this.initRenderTarget=function(R){yt.get(R).__webglFramebuffer===void 0&&Vt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Vt.setTextureCube(R,0):R.isData3DTexture?Vt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Vt.setTexture2DArray(R,0):Vt.setTexture2D(R,0),xt.unbindTexture()},this.resetState=function(){E=0,T=0,A=null,xt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const zh={type:"change"},al={type:"start"},Ku={type:"end"},$r=new Rs,kh=new Cn,nx=Math.cos(70*cr.DEG2RAD),we=new I,en=2*Math.PI,ne={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ca=1e-6;class ix extends vm{constructor(t,e=null){super(t,e),this.state=ne.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fs.ROTATE,MIDDLE:fs.DOLLY,RIGHT:fs.PAN},this.touches={ONE:hs.ROTATE,TWO:hs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new ai,this._lastTargetPosition=new I,this._quat=new ai().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dh,this._sphericalDelta=new dh,this._scale=1,this._panOffset=new I,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new I,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=rx.bind(this),this._onPointerDown=sx.bind(this),this._onPointerUp=ox.bind(this),this._onContextMenu=fx.bind(this),this._onMouseWheel=lx.bind(this),this._onKeyDown=hx.bind(this),this._onTouchStart=ux.bind(this),this._onTouchMove=dx.bind(this),this._onMouseDown=ax.bind(this),this._onMouseMove=cx.bind(this),this._interceptControlDown=px.bind(this),this._interceptControlUp=mx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zh),this.update(),this.state=ne.NONE}update(t=null){const e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===ne.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=en:n>Math.PI&&(n-=en),s<-Math.PI?s+=en:s>Math.PI&&(s-=en),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=we.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):($r.origin.copy(this.object.position),$r.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($r.direction))<nx?this.object.lookAt(this.target):(kh.setFromNormalAndCoplanarPoint(this.object.up,this.target),$r.intersectPlane(kh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ca||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ca||this._lastTargetPosition.distanceToSquared(this.target)>Ca?(this.dispatchEvent(zh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?en/60*this.autoRotateSpeed*t:en/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(en*this._rotateDelta.x/e.clientHeight),this._rotateUp(en*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(en*this._rotateDelta.x/e.clientHeight),this._rotateUp(en*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function sx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function rx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ox(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ku),this.state=ne.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function ax(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case fs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ne.DOLLY;break;case fs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ne.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ne.ROTATE}break;case fs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ne.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ne.PAN}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(al)}function cx(i){switch(this.state){case ne.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ne.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ne.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function lx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ne.NONE||(i.preventDefault(),this.dispatchEvent(al),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ku))}function hx(i){this.enabled!==!1&&this._handleKeyDown(i)}function ux(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case hs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ne.TOUCH_ROTATE;break;case hs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ne.TOUCH_PAN;break;default:this.state=ne.NONE}break;case 2:switch(this.touches.TWO){case hs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ne.TOUCH_DOLLY_PAN;break;case hs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ne.TOUCH_DOLLY_ROTATE;break;default:this.state=ne.NONE}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(al)}function dx(i){switch(this._trackPointer(i),this.state){case ne.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ne.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ne.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ne.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ne.NONE}}function fx(i){this.enabled!==!1&&i.preventDefault()}function px(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zu(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Se;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(const h in r){const u=Hh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const g=Hh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Hh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ye(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);a.setComponent(d+u,g,v)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const Ju=0,gx=1,_x=2,Vh=2,Pa=1.25,Gh=1,We=32,Re=We/4,Qu=65535,yo=Math.pow(2,-24),cl=Symbol("SKIP_GENERATION"),td={strategy:Ju,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[cl]:!1};function xe(i,t,e){return e.min.x=t[i],e.min.y=t[i+1],e.min.z=t[i+2],e.max.x=t[i+3],e.max.y=t[i+4],e.max.z=t[i+5],e}function Dc(i){let t=-1,e=-1/0;for(let n=0;n<3;n++){const s=i[n+3]-i[n];s>e&&(e=s,t=n)}return t}function Wh(i,t){t.set(i)}function Xh(i,t,e){let n,s;for(let r=0;r<3;r++){const o=r+3;n=i[r],s=t[r],e[r]=n<s?n:s,n=i[o],s=t[o],e[o]=n>s?n:s}}function jr(i,t,e){for(let n=0;n<3;n++){const s=t[i+2*n],r=t[i+2*n+1],o=s-r,a=s+r;o<e[n]&&(e[n]=o),a>e[n+3]&&(e[n+3]=a)}}function Gs(i){const t=i[3]-i[0],e=i[4]-i[1],n=i[5]-i[2];return 2*(t*e+e*n+n*t)}function Me(i,t){return t[i+15]===Qu}function Oe(i,t){return t[i+6]}function Xe(i,t){return t[i+14]}function Ce(i){return i+Re}function Pe(i,t){const e=t[i+6];return i+e*Re}function ll(i,t){return t[i+7]}function Ia(i,t,e,n,s){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,h=-1/0,u=1/0,d=1/0,f=1/0,g=-1/0,v=-1/0,m=-1/0;const p=i.offset||0;for(let y=(t-p)*6,x=(t+e-p)*6;y<x;y+=6){const _=i[y+0],M=i[y+1],E=_-M,T=_+M;E<r&&(r=E),T>c&&(c=T),_<u&&(u=_),_>g&&(g=_);const A=i[y+2],b=i[y+3],S=A-b,C=A+b;S<o&&(o=S),C>l&&(l=C),A<d&&(d=A),A>v&&(v=A);const D=i[y+4],P=i[y+5],U=D-P,F=D+P;U<a&&(a=U),F>h&&(h=F),D<f&&(f=D),D>m&&(m=D)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=h,s[0]=u,s[1]=d,s[2]=f,s[3]=g,s[4]=v,s[5]=m}const Hn=32,vx=(i,t)=>i.candidate-t.candidate,ti=new Array(Hn).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Kr=new Float32Array(6);function xx(i,t,e,n,s,r){let o=-1,a=0;if(r===Ju)o=Dc(t),o!==-1&&(a=(t[o]+t[o+3])/2);else if(r===gx)o=Dc(i),o!==-1&&(a=yx(e,n,s,o));else if(r===_x){const c=Gs(i);let l=Pa*s;const h=e.offset||0,u=(n-h)*6,d=(n+s-h)*6;for(let f=0;f<3;f++){const g=t[f],p=(t[f+3]-g)/Hn;if(s<Hn/4){const y=[...ti];y.length=s;let x=0;for(let M=u;M<d;M+=6,x++){const E=y[x];E.candidate=e[M+2*f],E.count=0;const{bounds:T,leftCacheBounds:A,rightCacheBounds:b}=E;for(let S=0;S<3;S++)b[S]=1/0,b[S+3]=-1/0,A[S]=1/0,A[S+3]=-1/0,T[S]=1/0,T[S+3]=-1/0;jr(M,e,T)}y.sort(vx);let _=s;for(let M=0;M<_;M++){const E=y[M];for(;M+1<_&&y[M+1].candidate===E.candidate;)y.splice(M+1,1),_--}for(let M=u;M<d;M+=6){const E=e[M+2*f];for(let T=0;T<_;T++){const A=y[T];E>=A.candidate?jr(M,e,A.rightCacheBounds):(jr(M,e,A.leftCacheBounds),A.count++)}}for(let M=0;M<_;M++){const E=y[M],T=E.count,A=s-E.count,b=E.leftCacheBounds,S=E.rightCacheBounds;let C=0;T!==0&&(C=Gs(b)/c);let D=0;A!==0&&(D=Gs(S)/c);const P=Gh+Pa*(C*T+D*A);P<l&&(o=f,l=P,a=E.candidate)}}else{for(let _=0;_<Hn;_++){const M=ti[_];M.count=0,M.candidate=g+p+_*p;const E=M.bounds;for(let T=0;T<3;T++)E[T]=1/0,E[T+3]=-1/0}for(let _=u;_<d;_+=6){let T=~~((e[_+2*f]-g)/p);T>=Hn&&(T=Hn-1);const A=ti[T];A.count++,jr(_,e,A.bounds)}const y=ti[Hn-1];Wh(y.bounds,y.rightCacheBounds);for(let _=Hn-2;_>=0;_--){const M=ti[_],E=ti[_+1];Xh(M.bounds,E.rightCacheBounds,M.rightCacheBounds)}let x=0;for(let _=0;_<Hn-1;_++){const M=ti[_],E=M.count,T=M.bounds,b=ti[_+1].rightCacheBounds;E!==0&&(x===0?Wh(T,Kr):Xh(T,Kr,Kr)),x+=E;let S=0,C=0;x!==0&&(S=Gs(Kr)/c);const D=s-x;D!==0&&(C=Gs(b)/c);const P=Gh+Pa*(S*x+C*D);P<l&&(o=f,l=P,a=M.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function yx(i,t,e,n){let s=0;const r=i.offset;for(let o=t,a=t+e;o<a;o++)s+=i[(o-r)*6+n*2];return s/e}class Da{constructor(){this.boundingData=new Float32Array(6)}}function Mx(i,t,e,n,s,r){let o=n,a=n+s-1;const c=r.pos,l=r.axis*2,h=e.offset||0;for(;;){for(;o<=a&&e[(o-h)*6+l]<c;)o++;for(;o<=a&&e[(a-h)*6+l]>=c;)a--;if(o<a){for(let u=0;u<t;u++){let d=i[o*t+u];i[o*t+u]=i[a*t+u],i[a*t+u]=d}for(let u=0;u<6;u++){const d=o-h,f=a-h,g=e[d*6+u];e[d*6+u]=e[f*6+u],e[f*6+u]=g}o++,a--}else return o}}let ed,Mo,Lc,nd;const Sx=Math.pow(2,32);function Uc(i){return"count"in i?1:1+Uc(i.left)+Uc(i.right)}function bx(i,t,e){return ed=new Float32Array(e),Mo=new Uint32Array(e),Lc=new Uint16Array(e),nd=new Uint8Array(e),Nc(i,t)}function Nc(i,t){const e=i/4,n=i/2,s="count"in t,r=t.boundingData;for(let o=0;o<6;o++)ed[e+o]=r[o];if(s)return t.buffer?(nd.set(new Uint8Array(t.buffer),i),i+t.buffer.byteLength):(Mo[e+6]=t.offset,Lc[n+14]=t.count,Lc[n+15]=Qu,i+We);{const{left:o,right:a,splitAxis:c}=t,l=i+We;let h=Nc(l,o);const u=i/We,f=h/We-u;if(f>Sx)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Mo[e+6]=f,Mo[e+7]=c,Nc(h,a)}}function Ex(i,t,e,n,s,r){const{maxDepth:o,verbose:a,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:h,onProgress:u}=s,d=i.primitiveBuffer,f=i.primitiveBufferStride,g=new Float32Array(6);let v=!1;const m=new Da;return Ia(t,e,n,m.boundingData,g),y(m,e,n,g),m;function p(x){u&&u((x-r.offset)/r.count)}function y(x,_,M,E=null,T=0){!v&&T>=o&&(v=!0,a&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));const A=M>l;if(M<=c&&!A||T>=o)return p(_+M),x.offset=_,x.count=M,x;const b=xx(x.boundingData,E,t,_,M,h);let S=b.axis===-1?-1:Mx(d,f,t,_,M,b);if(b.axis===-1||S===_||S===_+M){if(!A)return p(_+M),x.offset=_,x.count=M,x;b.axis=Math.max(0,Dc(x.boundingData)),S=_+Math.max(1,Math.floor(M/2))}x.splitAxis=b.axis;const C=new Da,D=_,P=S-_;x.left=C,Ia(t,D,P,C.boundingData,g),y(C,D,P,g,T+1);const U=new Da,F=S,H=M-P;return x.right=U,Ia(t,F,H,U.boundingData,g),y(U,F,H,g,T+1),x}}function Tx(i,t){const e=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(t.range),s=n[0],r=n[n.length-1],o={offset:s.offset,count:r.offset+r.count-s.offset},a=new Float32Array(6*o.count);a.offset=o.offset,i.computePrimitiveBounds(o.offset,o.count,a),i._roots=n.map(c=>{const l=Ex(i,a,c.offset,c.count,t,o),h=Uc(l),u=new e(We*h);return bx(0,l,u),u})}class hl{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class wx{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const ue=new wx;let ii,ds;const ts=[],Zr=new hl(()=>new oe);function Ax(i,t,e,n,s,r){ii=Zr.getPrimitive(),ds=Zr.getPrimitive(),ts.push(ii,ds),ue.setBuffer(i._roots[t]);const o=Fc(0,i.geometry,e,n,s,r);ue.clearBuffer(),Zr.releasePrimitive(ii),Zr.releasePrimitive(ds),ts.pop(),ts.pop();const a=ts.length;return a>0&&(ds=ts[a-1],ii=ts[a-2]),o}function Fc(i,t,e,n,s=null,r=0,o=0){const{float32Array:a,uint16Array:c,uint32Array:l}=ue;let h=i*2;if(Me(h,c)){const g=Oe(i,l),v=Xe(h,c);return xe(i,a,ii),n(g,v,!1,o,r+i/Re,ii)}else{let D=function(U){const{uint16Array:F,uint32Array:H}=ue;let Y=U*2;for(;!Me(Y,F);)U=Ce(U),Y=U*2;return Oe(U,H)},P=function(U){const{uint16Array:F,uint32Array:H}=ue;let Y=U*2;for(;!Me(Y,F);)U=Pe(U,H),Y=U*2;return Oe(U,H)+Xe(Y,F)};var d=D,f=P;const g=Ce(i),v=Pe(i,l);let m=g,p=v,y,x,_,M;if(s&&(_=ii,M=ds,xe(m,a,_),xe(p,a,M),y=s(_),x=s(M),x<y)){m=v,p=g;const U=y;y=x,x=U,_=M}_||(_=ii,xe(m,a,_));const E=Me(m*2,c),T=e(_,E,y,o+1,r+m/Re);let A;if(T===Vh){const U=D(m),H=P(m)-U;A=n(U,H,!0,o+1,r+m/Re,_)}else A=T&&Fc(m,t,e,n,s,r,o+1);if(A)return!0;M=ds,xe(p,a,M);const b=Me(p*2,c),S=e(M,b,x,o+1,r+p/Re);let C;if(S===Vh){const U=D(p),H=P(p)-U;C=n(U,H,!0,o+1,r+p/Re,M)}else C=S&&Fc(p,t,e,n,s,r,o+1);return!!C}}const ir=new ue.constructor,Ro=new ue.constructor,ei=new hl(()=>new oe),es=new oe,ns=new oe,La=new oe,Ua=new oe;let Na=!1;function Rx(i,t,e,n){if(Na)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Na=!0;const s=i._roots,r=t._roots;let o,a=0,c=0;const l=new Wt().copy(e).invert();for(let h=0,u=s.length;h<u;h++){ir.setBuffer(s[h]),c=0;const d=ei.getPrimitive();xe(0,ir.float32Array,d),d.applyMatrix4(l);for(let f=0,g=r.length;f<g&&(Ro.setBuffer(r[f]),o=Sn(0,0,e,l,n,a,c,0,0,d),Ro.clearBuffer(),c+=r[f].byteLength/We,!o);f++);if(ei.releasePrimitive(d),ir.clearBuffer(),a+=s[h].byteLength/We,o)break}return Na=!1,o}function Sn(i,t,e,n,s,r=0,o=0,a=0,c=0,l=null,h=!1){let u,d;h?(u=Ro,d=ir):(u=ir,d=Ro);const f=u.float32Array,g=u.uint32Array,v=u.uint16Array,m=d.float32Array,p=d.uint32Array,y=d.uint16Array,x=i*2,_=t*2,M=Me(x,v),E=Me(_,y);let T=!1;if(E&&M)h?T=s(Oe(t,p),Xe(t*2,y),Oe(i,g),Xe(i*2,v),c,o+t/Re,a,r+i/Re):T=s(Oe(i,g),Xe(i*2,v),Oe(t,p),Xe(t*2,y),a,r+i/Re,c,o+t/Re);else if(E){const A=ei.getPrimitive();xe(t,m,A),A.applyMatrix4(e);const b=Ce(i),S=Pe(i,g);xe(b,f,es),xe(S,f,ns);const C=A.intersectsBox(es),D=A.intersectsBox(ns);T=C&&Sn(t,b,n,e,s,o,r,c,a+1,A,!h)||D&&Sn(t,S,n,e,s,o,r,c,a+1,A,!h),ei.releasePrimitive(A)}else{const A=Ce(t),b=Pe(t,p);xe(A,m,La),xe(b,m,Ua);const S=l.intersectsBox(La),C=l.intersectsBox(Ua);if(S&&C)T=Sn(i,A,e,n,s,r,o,a,c+1,l,h)||Sn(i,b,e,n,s,r,o,a,c+1,l,h);else if(S)if(M)T=Sn(i,A,e,n,s,r,o,a,c+1,l,h);else{const D=ei.getPrimitive();D.copy(La).applyMatrix4(e);const P=Ce(i),U=Pe(i,g);xe(P,f,es),xe(U,f,ns);const F=D.intersectsBox(es),H=D.intersectsBox(ns);T=F&&Sn(A,P,n,e,s,o,r,c,a+1,D,!h)||H&&Sn(A,U,n,e,s,o,r,c,a+1,D,!h),ei.releasePrimitive(D)}else if(C)if(M)T=Sn(i,b,e,n,s,r,o,a,c+1,l,h);else{const D=ei.getPrimitive();D.copy(Ua).applyMatrix4(e);const P=Ce(i),U=Pe(i,g);xe(P,f,es),xe(U,f,ns);const F=D.intersectsBox(es),H=D.intersectsBox(ns);T=F&&Sn(b,P,n,e,s,o,r,c,a+1,D,!h)||H&&Sn(b,U,n,e,s,o,r,c,a+1,D,!h),ei.releasePrimitive(D)}}return T}const Fa=new class{constructor(){let i=null,t=null,e=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(r,o)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=o,this.buffer=i=r._roots[o],this.uint16Array=e=new Uint16Array(i),this.uint32Array=t=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=e=null,this.uint32Array=t=null},this.getRangeStart=r=>{let o=r*2;for(;!Me(o,e);)r=Ce(r),o=r*2;return Oe(r,t)},this.getRangeEnd=r=>{let o=r*2;for(;!Me(o,e);)r=Pe(r,t),o=r*2;return Oe(r,t)+Xe(o,e)};const s=(r,o,a)=>{const c=o*2,l=Me(c,e);if(!r(a,l,o)&&!l){const u=Ce(o),d=Pe(o,t);s(r,u,a+1),s(r,d,a+1)}};this.traverseBuffer=r=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{s(r,0,0)}finally{n=!1}},this.traverse=r=>{this.traverseBuffer((o,a,c)=>{if(a){const l=c*2,h=t[c+6],u=e[l+14];return r(o,a,new Float32Array(i,c*4,6),h,u)}else{const l=ll(c,t);return r(o,a,new Float32Array(i,c*4,6),l)}})}}},qh=new oe,is=new Float32Array(6);class Cx{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...td,...t},"maxLeafSize"in t&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafSize}),Tx(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,s){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,h=-1/0;for(let u=t,d=t+e;u<d;u++){this.writePrimitiveBounds(u,is,0);const[f,g,v,m,p,y]=is;f<r&&(r=f),m>c&&(c=m),g<o&&(o=g),p>l&&(l=p),v<a&&(a=v),y>h&&(h=y)}return n[s+0]=r,n[s+1]=o,n[s+2]=a,n[s+3]=c,n[s+4]=l,n[s+5]=h,n}computePrimitiveBounds(t,e,n){const s=n.offset||0;for(let r=t,o=t+e;r<o;r++){this.writePrimitiveBounds(r,is,0);const[a,c,l,h,u,d]=is,f=(a+h)/2,g=(c+u)/2,v=(l+d)/2,m=(h-a)/2,p=(u-c)/2,y=(d-l)/2,x=(r-s)*6;n[x+0]=f,n[x+1]=m+(Math.abs(f)+m)*yo,n[x+2]=g,n[x+3]=p+(Math.abs(g)+p)*yo,n[x+4]=v,n[x+5]=y+(Math.abs(v)+y)*yo}return n}shiftPrimitiveOffsets(t){const e=this._indirectBuffer;if(e)for(let n=0,s=e.length;n<s;n++)e[n]+=t;else{const n=this._roots;for(let s=0;s<n.length;s++){const r=n[s],o=new Uint32Array(r),a=new Uint16Array(r),c=r.byteLength/We;for(let l=0;l<c;l++){const h=Re*l,u=2*h;Me(u,a)&&(o[h+6]+=t)}}}}traverse(t,e=0){Fa.setBVH(this,e),Fa.traverse(t),Fa.reset()}refit(){const t=this._roots;for(let e=0,n=t.length;e<n;e++){const s=t[e],r=new Uint32Array(s),o=new Uint16Array(s),a=new Float32Array(s),c=s.byteLength/We;for(let l=c-1;l>=0;l--){const h=l*Re,u=h*2;if(Me(u,o)){const f=Oe(h,r),g=Xe(u,o);this.writePrimitiveRangeBounds(f,g,is,0),a.set(is,h)}else{const f=Ce(h),g=Pe(h,r);for(let v=0;v<3;v++){const m=a[f+v],p=a[f+v+3],y=a[g+v],x=a[g+v+3];a[h+v]=m<y?m:y,a[h+v+3]=p>x?p:x}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{xe(0,new Float32Array(n),qh),t.union(qh)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:s,intersectsPrimitive:r,scratchPrimitive:o,iterate:a}=t;if(s&&r){const u=s;s=(d,f,g,v,m)=>u(d,f,g,v,m)?!0:a(d,f,this,r,g,v,o)}else s||(r?s=(u,d,f,g)=>a(u,d,this,r,f,g,o):s=(u,d,f)=>f);let c=!1,l=0;const h=this._roots;for(let u=0,d=h.length;u<d;u++){const f=h[u];if(c=Ax(this,u,n,s,e,l),c)break;l+=f.byteLength/We}return c}bvhcast(t,e,n){let{intersectsRanges:s}=n;return Rx(this,t,e,s)}}function Px(){return typeof SharedArrayBuffer<"u"}function ul(i){return i.index?i.index.count:i.attributes.position.count}function Bo(i){return ul(i)/3}function Ix(i,t=ArrayBuffer){return i>65535?new Uint32Array(new t(4*i)):new Uint16Array(new t(2*i))}function Dx(i,t){if(!i.index){const e=i.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=Ix(e,n);i.setIndex(new Ye(s,1));for(let r=0;r<e;r++)s[r]=r}}function Lx(i,t,e){const n=ul(i)/e,s=t||i.drawRange,r=s.start/e,o=(s.start+s.count)/e,a=Math.max(0,r),c=Math.min(n,o)-a;return{offset:Math.floor(a),count:Math.floor(c)}}function Ux(i,t){return i.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Yh(i,t,e){const n=Lx(i,t,e),s=Ux(i,e);if(!s.length)return[n];const r=[],o=n.offset,a=n.offset+n.count,c=ul(i)/e,l=[];for(const d of s){const{offset:f,count:g}=d,v=f,m=isFinite(g)?g:c-f,p=f+m;v<a&&p>o&&(l.push({pos:Math.max(o,v),isStart:!0}),l.push({pos:Math.min(a,p),isStart:!1}))}l.sort((d,f)=>d.pos!==f.pos?d.pos-f.pos:d.type==="end"?-1:1);let h=0,u=null;for(const d of l){const f=d.pos;h!==0&&f!==u&&r.push({offset:u,count:f-u}),h+=d.isStart?1:-1,u=f}return r}function Nx(i,t){const e=i[i.length-1],n=e.offset+e.count>2**16,s=i.reduce((l,h)=>l+h.count,0),r=n?4:2,o=t?new SharedArrayBuffer(s*r):new ArrayBuffer(s*r),a=n?new Uint32Array(o):new Uint16Array(o);let c=0;for(let l=0;l<i.length;l++){const{offset:h,count:u}=i[l];for(let d=0;d<u;d++)a[c+d]=h+d;c+=u}return a}class Fx extends Cx{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!Px())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...td,...e},e[cl]||this.init(e)}init(t){const{geometry:e,primitiveStride:n}=this;if(t.indirect){const s=Yh(e,t.range,n),r=Nx(s,t.useSharedArrayBuffer);this._indirectBuffer=r}else Dx(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new oe))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Yh(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class qn{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,s=-1/0;for(let r=0,o=t.length;r<o;r++){const c=t[r][e];n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}setFromPoints(t,e){let n=1/0,s=-1/0;for(let r=0,o=e.length;r<o;r++){const a=e[r],c=t.dot(a);n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}isSeparated(t){return this.min>t.max||t.min>this.max}}qn.prototype.setFromBox=(function(){const i=new I;return function(e,n){const s=n.min,r=n.max;let o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let h=0;h<=1;h++){i.x=s.x*c+r.x*(1-c),i.y=s.y*l+r.y*(1-l),i.z=s.z*h+r.z*(1-h);const u=e.dot(i);o=Math.min(u,o),a=Math.max(u,a)}this.min=o,this.max=a}})();const Ox=(function(){const i=new I,t=new I,e=new I;return function(s,r,o){const a=s.start,c=i,l=r.start,h=t;e.subVectors(a,l),i.subVectors(s.end,s.start),t.subVectors(r.end,r.start);const u=e.dot(h),d=h.dot(c),f=h.dot(h),g=e.dot(c),m=c.dot(c)*f-d*d;let p,y;m!==0?p=(u*d-g*f)/m:p=0,y=(u+p*d)/f,o.x=p,o.y=y}})(),dl=(function(){const i=new ot,t=new I,e=new I;return function(s,r,o,a){Ox(s,r,i);let c=i.x,l=i.y;if(c>=0&&c<=1&&l>=0&&l<=1){s.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let h;c<0?h=s.start:h=s.end;let u;l<0?u=r.start:u=r.end;const d=t,f=e;if(s.closestPointToPoint(u,!0,t),r.closestPointToPoint(h,!0,e),d.distanceToSquared(u)<=f.distanceToSquared(h)){o.copy(d),a.copy(u);return}else{o.copy(h),a.copy(f);return}}}})(),Bx=(function(){const i=new I,t=new I,e=new Cn,n=new Xn;return function(r,o){const{radius:a,center:c}=r,{a:l,b:h,c:u}=o;if(n.start=l,n.end=h,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a||(n.start=l,n.end=u,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a)||(n.start=h,n.end=u,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a))return!0;const v=o.getPlane(e);if(Math.abs(v.distanceToPoint(c))<=a){const p=v.projectPoint(c,t);if(o.containsPoint(p))return!0}return!1}})(),zx=["x","y","z"],Vn=1e-15,$h=Vn*Vn;function pn(i){return Math.abs(i)<Vn}class Tn extends ze{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new I),this.satBounds=new Array(4).fill().map(()=>new qn),this.points=[this.a,this.b,this.c],this.plane=new Cn,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Xn,this.needsUpdate=!0}intersectsSphere(t){return Bx(t,this)}update(){const t=this.a,e=this.b,n=this.c,s=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,s);const l=r[1],h=o[1];l.subVectors(t,e),h.setFromPoints(l,s);const u=r[2],d=o[2];u.subVectors(e,n),d.setFromPoints(u,s);const f=r[3],g=o[3];f.subVectors(n,t),g.setFromPoints(f,s);const v=l.length(),m=u.length(),p=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<Vn?m<Vn||p<Vn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):m<Vn?p<Vn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):p<Vn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}}Tn.prototype.closestPointToSegment=(function(){const i=new I,t=new I,e=new Xn;return function(s,r=null,o=null){const{start:a,end:c}=s,l=this.points;let h,u=1/0;for(let d=0;d<3;d++){const f=(d+1)%3;e.start.copy(l[d]),e.end.copy(l[f]),dl(e,s,i,t),h=i.distanceToSquared(t),h<u&&(u=h,r&&r.copy(i),o&&o.copy(t))}return this.closestPointToPoint(a,i),h=a.distanceToSquared(i),h<u&&(u=h,r&&r.copy(i),o&&o.copy(a)),this.closestPointToPoint(c,i),h=c.distanceToSquared(i),h<u&&(u=h,r&&r.copy(i),o&&o.copy(c)),Math.sqrt(u)}})();Tn.prototype.intersectsTriangle=(function(){const i=new Tn,t=new qn,e=new qn,n=new I,s=new I,r=new I,o=new I,a=new Xn,c=new Xn,l=new I,h=new ot,u=new ot;function d(x,_,M,E){const T=n;!x.isDegenerateIntoPoint&&!x.isDegenerateIntoSegment?T.copy(x.plane.normal):T.copy(_.plane.normal);const A=x.satBounds,b=x.satAxes;for(let D=1;D<4;D++){const P=A[D],U=b[D];if(t.setFromPoints(U,_.points),P.isSeparated(t)||(o.copy(T).cross(U),t.setFromPoints(o,x.points),e.setFromPoints(o,_.points),t.isSeparated(e)))return!1}const S=_.satBounds,C=_.satAxes;for(let D=1;D<4;D++){const P=S[D],U=C[D];if(t.setFromPoints(U,x.points),P.isSeparated(t)||(o.crossVectors(T,U),t.setFromPoints(o,x.points),e.setFromPoints(o,_.points),t.isSeparated(e)))return!1}return M&&(E||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),M.start.set(0,0,0),M.end.set(0,0,0)),!0}function f(x,_,M,E,T,A,b,S,C,D,P){let U=b/(b-S);D.x=E+(T-E)*U,P.start.subVectors(_,x).multiplyScalar(U).add(x),U=b/(b-C),D.y=E+(A-E)*U,P.end.subVectors(M,x).multiplyScalar(U).add(x)}function g(x,_,M,E,T,A,b,S,C,D,P){if(T>0)f(x.c,x.a,x.b,E,_,M,C,b,S,D,P);else if(A>0)f(x.b,x.a,x.c,M,_,E,S,b,C,D,P);else if(S*C>0||b!=0)f(x.a,x.b,x.c,_,M,E,b,S,C,D,P);else if(S!=0)f(x.b,x.a,x.c,M,_,E,S,b,C,D,P);else if(C!=0)f(x.c,x.a,x.b,E,_,M,C,b,S,D,P);else return!0;return!1}function v(x,_,M,E){const T=_.degenerateSegment,A=x.plane.distanceToPoint(T.start),b=x.plane.distanceToPoint(T.end);return pn(A)?pn(b)?d(x,_,M,E):(M&&(M.start.copy(T.start),M.end.copy(T.start)),x.containsPoint(T.start)):pn(b)?(M&&(M.start.copy(T.end),M.end.copy(T.end)),x.containsPoint(T.end)):x.plane.intersectLine(T,n)!=null?(M&&(M.start.copy(n),M.end.copy(n)),x.containsPoint(n)):!1}function m(x,_,M){const E=_.a;return pn(x.plane.distanceToPoint(E))&&x.containsPoint(E)?(M&&(M.start.copy(E),M.end.copy(E)),!0):!1}function p(x,_,M){const E=x.degenerateSegment,T=_.a;return E.closestPointToPoint(T,!0,n),T.distanceToSquared(n)<$h?(M&&(M.start.copy(T),M.end.copy(T)),!0):!1}function y(x,_,M,E){if(x.isDegenerateIntoSegment)if(_.isDegenerateIntoSegment){const T=x.degenerateSegment,A=_.degenerateSegment,b=s,S=r;T.delta(b),A.delta(S);const C=n.subVectors(A.start,T.start),D=b.x*S.y-b.y*S.x;if(pn(D))return!1;const P=(C.x*S.y-C.y*S.x)/D,U=-(b.x*C.y-b.y*C.x)/D;if(P<0||P>1||U<0||U>1)return!1;const F=T.start.z+b.z*P,H=A.start.z+S.z*U;return pn(F-H)?(M&&(M.start.copy(T.start).addScaledVector(b,P),M.end.copy(T.start).addScaledVector(b,P)),!0):!1}else return _.isDegenerateIntoPoint?p(x,_,M):v(_,x,M,E);else{if(x.isDegenerateIntoPoint)return _.isDegenerateIntoPoint?_.a.distanceToSquared(x.a)<$h?(M&&(M.start.copy(x.a),M.end.copy(x.a)),!0):!1:_.isDegenerateIntoSegment?p(_,x,M):m(_,x,M);if(_.isDegenerateIntoPoint)return m(x,_,M);if(_.isDegenerateIntoSegment)return v(x,_,M,E)}}return function(_,M=null,E=!1){this.needsUpdate&&this.update(),_.isExtendedTriangle?_.needsUpdate&&_.update():(i.copy(_),i.update(),_=i);const T=y(this,_,M,E);if(T!==void 0)return T;const A=this.plane,b=_.plane;let S=b.distanceToPoint(this.a),C=b.distanceToPoint(this.b),D=b.distanceToPoint(this.c);pn(S)&&(S=0),pn(C)&&(C=0),pn(D)&&(D=0);const P=S*C,U=S*D;if(P>0&&U>0)return!1;let F=A.distanceToPoint(_.a),H=A.distanceToPoint(_.b),Y=A.distanceToPoint(_.c);pn(F)&&(F=0),pn(H)&&(H=0),pn(Y)&&(Y=0);const X=F*H,it=F*Y;if(X>0&&it>0)return!1;s.copy(A.normal),r.copy(b.normal);const ct=s.cross(r);let gt=0,zt=Math.abs(ct.x);const Qt=Math.abs(ct.y);Qt>zt&&(zt=Qt,gt=1),Math.abs(ct.z)>zt&&(gt=2);const qt=zx[gt],j=this.a[qt],Z=this.b[qt],pt=this.c[qt],It=_.a[qt],St=_.b[qt],Yt=_.c[qt];if(g(this,j,Z,pt,P,U,S,C,D,h,a))return d(this,_,M,E);if(g(_,It,St,Yt,X,it,F,H,Y,u,c))return d(this,_,M,E);if(h.y<h.x){const be=h.y;h.y=h.x,h.x=be,l.copy(a.start),a.start.copy(a.end),a.end.copy(l)}if(u.y<u.x){const be=u.y;u.y=u.x,u.x=be,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return h.y<u.x||u.y<h.x?!1:(M&&(u.x>h.x?M.start.copy(c.start):M.start.copy(a.start),u.y<h.y?M.end.copy(c.end):M.end.copy(a.end)),!0)}})();Tn.prototype.distanceToPoint=(function(){const i=new I;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Tn.prototype.distanceToTriangle=(function(){const i=new I,t=new I,e=["a","b","c"],n=new Xn,s=new Xn;return function(o,a=null,c=null){const l=a||c?n:null;if(this.intersectsTriangle(o,l,!0))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let h=1/0;for(let u=0;u<3;u++){let d;const f=e[u],g=o[f];this.closestPointToPoint(g,i),d=g.distanceToSquared(i),d<h&&(h=d,a&&a.copy(i),c&&c.copy(g));const v=this[f];o.closestPointToPoint(v,i),d=v.distanceToSquared(i),d<h&&(h=d,a&&a.copy(v),c&&c.copy(i))}for(let u=0;u<3;u++){const d=e[u],f=e[(u+1)%3];n.set(this[d],this[f]);for(let g=0;g<3;g++){const v=e[g],m=e[(g+1)%3];s.set(o[v],o[m]),dl(n,s,i,t);const p=i.distanceToSquared(t);p<h&&(h=p,a&&a.copy(i),c&&c.copy(t))}}return Math.sqrt(h)}})();class Je{constructor(t,e,n){this.isOrientedBox=!0,this.min=new I,this.max=new I,this.matrix=new Wt,this.invMatrix=new Wt,this.points=new Array(8).fill().map(()=>new I),this.satAxes=new Array(3).fill().map(()=>new I),this.satBounds=new Array(3).fill().map(()=>new qn),this.alignedSatBounds=new Array(3).fill().map(()=>new qn),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}Je.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,n=this.max,s=this.points;for(let l=0;l<=1;l++)for(let h=0;h<=1;h++)for(let u=0;u<=1;u++){const d=1*l|2*h|4*u,f=s[d];f.x=l?n.x:e.x,f.y=h?n.y:e.y,f.z=u?n.z:e.z,f.applyMatrix4(t)}const r=this.satBounds,o=this.satAxes,a=s[0];for(let l=0;l<3;l++){const h=o[l],u=r[l],d=1<<l,f=s[d];h.subVectors(a,f),u.setFromPoints(h,s)}const c=this.alignedSatBounds;c[0].setFromPointsField(s,"x"),c[1].setFromPointsField(s,"y"),c[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Je.prototype.intersectsBox=(function(){const i=new qn;return function(e){this.needsUpdate&&this.update();const n=e.min,s=e.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,a[0].isSeparated(i)||(i.min=n.y,i.max=s.y,a[1].isSeparated(i))||(i.min=n.z,i.max=s.z,a[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){const l=o[c],h=r[c];if(i.setFromBox(l,e),h.isSeparated(i))return!1}return!0}})();Je.prototype.intersectsTriangle=(function(){const i=new Tn,t=new Array(3),e=new qn,n=new qn,s=new I;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(i.copy(o),i.update(),o=i);const a=this.satBounds,c=this.satAxes;t[0]=o.a,t[1]=o.b,t[2]=o.c;for(let d=0;d<3;d++){const f=a[d],g=c[d];if(e.setFromPoints(g,t),f.isSeparated(e))return!1}const l=o.satBounds,h=o.satAxes,u=this.points;for(let d=0;d<3;d++){const f=l[d],g=h[d];if(e.setFromPoints(g,u),f.isSeparated(e))return!1}for(let d=0;d<3;d++){const f=c[d];for(let g=0;g<4;g++){const v=h[g];if(s.crossVectors(f,v),e.setFromPoints(s,t),n.setFromPoints(s,u),e.isSeparated(n))return!1}}return!0}})();Je.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Je.prototype.distanceToPoint=(function(){const i=new I;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Je.prototype.distanceToBox=(function(){const i=["x","y","z"],t=new Array(12).fill().map(()=>new Xn),e=new Array(12).fill().map(()=>new Xn),n=new I,s=new I;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(s),this.closestPointToPoint(s,n),o.closestPointToPoint(n,s),c&&c.copy(n),l&&l.copy(s)),0;const h=a*a,u=o.min,d=o.max,f=this.points;let g=1/0;for(let m=0;m<8;m++){const p=f[m];s.copy(p).clamp(u,d);const y=p.distanceToSquared(s);if(y<g&&(g=y,c&&c.copy(p),l&&l.copy(s),y<h))return Math.sqrt(y)}let v=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let y=0;y<=1;y++){const x=(m+1)%3,_=(m+2)%3,M=p<<x|y<<_,E=1<<m|p<<x|y<<_,T=f[M],A=f[E];t[v].set(T,A);const S=i[m],C=i[x],D=i[_],P=e[v],U=P.start,F=P.end;U[S]=u[S],U[C]=p?u[C]:d[C],U[D]=y?u[D]:d[C],F[S]=d[S],F[C]=p?u[C]:d[C],F[D]=y?u[D]:d[C],v++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let y=0;y<=1;y++){s.x=m?d.x:u.x,s.y=p?d.y:u.y,s.z=y?d.z:u.z,this.closestPointToPoint(s,n);const x=s.distanceToSquared(n);if(x<g&&(g=x,c&&c.copy(n),l&&l.copy(s),x<h))return Math.sqrt(x)}for(let m=0;m<12;m++){const p=t[m];for(let y=0;y<12;y++){const x=e[y];dl(p,x,n,s);const _=n.distanceToSquared(s);if(_<g&&(g=_,c&&c.copy(n),l&&l.copy(s),_<h))return Math.sqrt(_)}}return Math.sqrt(g)}})();class kx extends hl{constructor(){super(()=>new Tn)}}const gn=new kx,Ws=new I,Oa=new I;function Hx(i,t,e={},n=0,s=1/0){const r=n*n,o=s*s;let a=1/0,c=null;if(i.shapecast({boundsTraverseOrder:h=>(Ws.copy(t).clamp(h.min,h.max),Ws.distanceToSquared(t)),intersectsBounds:(h,u,d)=>d<a&&d<o,intersectsTriangle:(h,u)=>{h.closestPointToPoint(t,Ws);const d=t.distanceToSquared(Ws);return d<a&&(Oa.copy(Ws),a=d,c=u),d<r}}),a===1/0)return null;const l=Math.sqrt(a);return e.point?e.point.copy(Oa):e.point=Oa.clone(),e.distance=l,e.faceIndex=c,e}const Jr=parseInt(ur)>=169,Vx=parseInt(ur)<=161,yi=new I,Mi=new I,Si=new I,Qr=new ot,to=new ot,eo=new ot,jh=new I,Kh=new I,Zh=new I,Xs=new I;function Gx(i,t,e,n,s,r,o,a){let c;if(r===Ze?c=i.intersectTriangle(n,e,t,!0,s):c=i.intersectTriangle(t,e,n,r!==Ae,s),c===null)return null;const l=i.origin.distanceTo(s);return l<o||l>a?null:{distance:l,point:s.clone()}}function Jh(i,t,e,n,s,r,o,a,c,l,h){yi.fromBufferAttribute(t,r),Mi.fromBufferAttribute(t,o),Si.fromBufferAttribute(t,a);const u=Gx(i,yi,Mi,Si,Xs,c,l,h);if(u){if(n){Qr.fromBufferAttribute(n,r),to.fromBufferAttribute(n,o),eo.fromBufferAttribute(n,a),u.uv=new ot;const f=ze.getInterpolation(Xs,yi,Mi,Si,Qr,to,eo,u.uv);Jr||(u.uv=f)}if(s){Qr.fromBufferAttribute(s,r),to.fromBufferAttribute(s,o),eo.fromBufferAttribute(s,a),u.uv1=new ot;const f=ze.getInterpolation(Xs,yi,Mi,Si,Qr,to,eo,u.uv1);Jr||(u.uv1=f),Vx&&(u.uv2=u.uv1)}if(e){jh.fromBufferAttribute(e,r),Kh.fromBufferAttribute(e,o),Zh.fromBufferAttribute(e,a),u.normal=new I;const f=ze.getInterpolation(Xs,yi,Mi,Si,jh,Kh,Zh,u.normal);u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1),Jr||(u.normal=f)}const d={a:r,b:o,c:a,normal:new I,materialIndex:0};if(ze.getNormal(yi,Mi,Si,d.normal),u.face=d,u.faceIndex=r,Jr){const f=new I;ze.getBarycoord(Xs,yi,Mi,Si,f),u.barycoord=f}}return u}function Qh(i){return i&&i.isMaterial?i.side:i}function zo(i,t,e,n,s,r,o){const a=n*3;let c=a+0,l=a+1,h=a+2;const{index:u,groups:d}=i;i.index&&(c=u.getX(c),l=u.getX(l),h=u.getX(h));const{position:f,normal:g,uv:v,uv1:m}=i.attributes;if(Array.isArray(t)){const p=n*3;for(let y=0,x=d.length;y<x;y++){const{start:_,count:M,materialIndex:E}=d[y];if(p>=_&&p<_+M){const T=Qh(t[E]),A=Jh(e,f,g,v,m,c,l,h,T,r,o);if(A)if(A.faceIndex=n,A.face.materialIndex=E,s)s.push(A);else return A}}}else{const p=Qh(t),y=Jh(e,f,g,v,m,c,l,h,p,r,o);if(y)if(y.faceIndex=n,y.face.materialIndex=0,s)s.push(y);else return y}return null}function Te(i,t,e,n){const s=i.a,r=i.b,o=i.c;let a=t,c=t+1,l=t+2;e&&(a=e.getX(a),c=e.getX(c),l=e.getX(l)),s.x=n.getX(a),s.y=n.getY(a),s.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}function Wx(i,t,e,n,s,r,o,a){const{geometry:c,_indirectBuffer:l}=i;for(let h=n,u=n+s;h<u;h++)zo(c,t,e,h,r,o,a)}function Xx(i,t,e,n,s,r,o){const{geometry:a,_indirectBuffer:c}=i;let l=1/0,h=null;for(let u=n,d=n+s;u<d;u++){let f;f=zo(a,t,e,u,null,r,o),f&&f.distance<l&&(h=f,l=f.distance)}return h}function qx(i,t,e,n,s,r,o){const{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let h=i,u=t+i;h<u;h++){let d;if(d=h,Te(o,d*3,c,l),o.needsUpdate=!0,n(o,d,s,r))return!0}return!1}function Yx(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let r,o,a,c,l=0;const h=i._roots;for(let d=0,f=h.length;d<f;d++)r=h[d],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),u(0,l),l+=r.byteLength;function u(d,f,g=!1){const v=d*2;if(Me(v,a)){const m=Oe(d,o),p=Xe(v,a);let y=1/0,x=1/0,_=1/0,M=-1/0,E=-1/0,T=-1/0;for(let A=3*m,b=3*(m+p);A<b;A++){let S=n[A];const C=s.getX(S),D=s.getY(S),P=s.getZ(S);C<y&&(y=C),C>M&&(M=C),D<x&&(x=D),D>E&&(E=D),P<_&&(_=P),P>T&&(T=P)}return c[d+0]!==y||c[d+1]!==x||c[d+2]!==_||c[d+3]!==M||c[d+4]!==E||c[d+5]!==T?(c[d+0]=y,c[d+1]=x,c[d+2]=_,c[d+3]=M,c[d+4]=E,c[d+5]=T,!0):!1}else{const m=Ce(d),p=Pe(d,o);let y=g,x=!1,_=!1;if(t){if(!y){const S=m/Re+f/We,C=p/Re+f/We;x=t.has(S),_=t.has(C),y=!x&&!_}}else x=!0,_=!0;const M=y||x,E=y||_;let T=!1;M&&(T=u(m,f,y));let A=!1;E&&(A=u(p,f,y));const b=T||A;if(b)for(let S=0;S<3;S++){const C=m+S,D=p+S,P=c[C],U=c[C+3],F=c[D],H=c[D+3];c[d+S]=P<F?P:F,c[d+S+3]=U>H?U:H}return b}}}function li(i,t,e,n,s){let r,o,a,c,l,h;const u=1/e.direction.x,d=1/e.direction.y,f=1/e.direction.z,g=e.origin.x,v=e.origin.y,m=e.origin.z;let p=t[i],y=t[i+3],x=t[i+1],_=t[i+3+1],M=t[i+2],E=t[i+3+2];return u>=0?(r=(p-g)*u,o=(y-g)*u):(r=(y-g)*u,o=(p-g)*u),d>=0?(a=(x-v)*d,c=(_-v)*d):(a=(_-v)*d,c=(x-v)*d),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),f>=0?(l=(M-m)*f,h=(E-m)*f):(l=(E-m)*f,h=(M-m)*f),r>h||l>o)?!1:((l>r||r!==r)&&(r=l),(h<o||o!==o)&&(o=h),r<=s&&o>=n)}function $x(i,t,e,n,s,r,o,a){const{geometry:c,_indirectBuffer:l}=i;for(let h=n,u=n+s;h<u;h++){let d=l?l[h]:h;zo(c,t,e,d,r,o,a)}}function jx(i,t,e,n,s,r,o){const{geometry:a,_indirectBuffer:c}=i;let l=1/0,h=null;for(let u=n,d=n+s;u<d;u++){let f;f=zo(a,t,e,c?c[u]:u,null,r,o),f&&f.distance<l&&(h=f,l=f.distance)}return h}function Kx(i,t,e,n,s,r,o){const{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let h=i,u=t+i;h<u;h++){let d;if(d=e.resolveTriangleIndex(h),Te(o,d*3,c,l),o.needsUpdate=!0,n(o,d,s,r))return!0}return!1}function Zx(i,t,e,n,s,r,o){ue.setBuffer(i._roots[t]),Oc(0,i,e,n,s,r,o),ue.clearBuffer()}function Oc(i,t,e,n,s,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=ue,h=i*2;if(Me(h,c)){const d=Oe(i,l),f=Xe(h,c);Wx(t,e,n,d,f,s,r,o)}else{const d=Ce(i);li(d,a,n,r,o)&&Oc(d,t,e,n,s,r,o);const f=Pe(i,l);li(f,a,n,r,o)&&Oc(f,t,e,n,s,r,o)}}const Jx=["x","y","z"];function Qx(i,t,e,n,s,r){ue.setBuffer(i._roots[t]);const o=Bc(0,i,e,n,s,r);return ue.clearBuffer(),o}function Bc(i,t,e,n,s,r){const{float32Array:o,uint16Array:a,uint32Array:c}=ue;let l=i*2;if(Me(l,a)){const u=Oe(i,c),d=Xe(l,a);return Xx(t,e,n,u,d,s,r)}else{const u=ll(i,c),d=Jx[u],g=n.direction[d]>=0;let v,m;g?(v=Ce(i),m=Pe(i,c)):(v=Pe(i,c),m=Ce(i));const y=li(v,o,n,s,r)?Bc(v,t,e,n,s,r):null;if(y){const M=y.point[d];if(g?M<=o[m+u]:M>=o[m+u+3])return y}const _=li(m,o,n,s,r)?Bc(m,t,e,n,s,r):null;return y&&_?y.distance<=_.distance?y:_:y||_||null}}const no=new oe,ss=new Tn,rs=new Tn,qs=new Wt,tu=new Je,io=new Je;function ty(i,t,e,n){ue.setBuffer(i._roots[t]);const s=zc(0,i,e,n);return ue.clearBuffer(),s}function zc(i,t,e,n,s=null){const{float32Array:r,uint16Array:o,uint32Array:a}=ue;let c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),tu.set(e.boundingBox.min,e.boundingBox.max,n),s=tu),Me(c,o)){const h=t.geometry,u=h.index,d=h.attributes.position,f=e.index,g=e.attributes.position,v=Oe(i,a),m=Xe(c,o);if(qs.copy(n).invert(),e.boundsTree)return xe(i,r,io),io.matrix.copy(qs),io.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>io.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let x=v*3,_=(m+v)*3;x<_;x+=3)if(Te(rs,x,u,d),rs.needsUpdate=!0,y.intersectsTriangle(rs))return!0;return!1}});{const p=Bo(e);for(let y=v*3,x=(m+v)*3;y<x;y+=3){Te(ss,y,u,d),ss.a.applyMatrix4(qs),ss.b.applyMatrix4(qs),ss.c.applyMatrix4(qs),ss.needsUpdate=!0;for(let _=0,M=p*3;_<M;_+=3)if(Te(rs,_,f,g),rs.needsUpdate=!0,ss.intersectsTriangle(rs))return!0}}}else{const h=Ce(i),u=Pe(i,a);return xe(h,r,no),!!(s.intersectsBox(no)&&zc(h,t,e,n,s)||(xe(u,r,no),s.intersectsBox(no)&&zc(u,t,e,n,s)))}}const so=new Wt,Ba=new Je,Ys=new Je,ey=new I,ny=new I,iy=new I,sy=new I;function ry(i,t,e,n={},s={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Ba.set(t.boundingBox.min,t.boundingBox.max,e),Ba.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,l=a.index,h=t.attributes.position,u=t.index,d=gn.getPrimitive(),f=gn.getPrimitive();let g=ey,v=ny,m=null,p=null;s&&(m=iy,p=sy);let y=1/0,x=null,_=null;return so.copy(e).invert(),Ys.matrix.copy(so),i.shapecast({boundsTraverseOrder:M=>Ba.distanceToBox(M),intersectsBounds:(M,E,T)=>T<y&&T<o?(E&&(Ys.min.copy(M.min),Ys.max.copy(M.max),Ys.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:A=>Ys.distanceToBox(A),intersectsBounds:(A,b,S)=>S<y&&S<o,intersectsRange:(A,b)=>{for(let S=A,C=A+b;S<C;S++){Te(f,3*S,u,h),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let D=M,P=M+E;D<P;D++){Te(d,3*D,l,c),d.needsUpdate=!0;const U=d.distanceToTriangle(f,g,m);if(U<y&&(v.copy(g),p&&p.copy(m),y=U,x=D,_=S),U<r)return!0}}}});{const T=Bo(t);for(let A=0,b=T;A<b;A++){Te(f,3*A,u,h),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let S=M,C=M+E;S<C;S++){Te(d,3*S,l,c),d.needsUpdate=!0;const D=d.distanceToTriangle(f,g,m);if(D<y&&(v.copy(g),p&&p.copy(m),y=D,x=S,_=A),D<r)return!0}}}}}),gn.releasePrimitive(d),gn.releasePrimitive(f),y===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=y,n.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(so),v.applyMatrix4(so),s.distance=v.sub(s.point).length(),s.faceIndex=_),n)}function oy(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let r,o,a,c,l=0;const h=i._roots;for(let d=0,f=h.length;d<f;d++)r=h[d],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),u(0,l),l+=r.byteLength;function u(d,f,g=!1){const v=d*2;if(Me(v,a)){const m=Oe(d,o),p=Xe(v,a);let y=1/0,x=1/0,_=1/0,M=-1/0,E=-1/0,T=-1/0;for(let A=m,b=m+p;A<b;A++){const S=3*i.resolveTriangleIndex(A);for(let C=0;C<3;C++){let D=S+C;D=n?n[D]:D;const P=s.getX(D),U=s.getY(D),F=s.getZ(D);P<y&&(y=P),P>M&&(M=P),U<x&&(x=U),U>E&&(E=U),F<_&&(_=F),F>T&&(T=F)}}return c[d+0]!==y||c[d+1]!==x||c[d+2]!==_||c[d+3]!==M||c[d+4]!==E||c[d+5]!==T?(c[d+0]=y,c[d+1]=x,c[d+2]=_,c[d+3]=M,c[d+4]=E,c[d+5]=T,!0):!1}else{const m=Ce(d),p=Pe(d,o);let y=g,x=!1,_=!1;if(t){if(!y){const S=m/Re+f/We,C=p/Re+f/We;x=t.has(S),_=t.has(C),y=!x&&!_}}else x=!0,_=!0;const M=y||x,E=y||_;let T=!1;M&&(T=u(m,f,y));let A=!1;E&&(A=u(p,f,y));const b=T||A;if(b)for(let S=0;S<3;S++){const C=m+S,D=p+S,P=c[C],U=c[C+3],F=c[D],H=c[D+3];c[d+S]=P<F?P:F,c[d+S+3]=U>H?U:H}return b}}}function ay(i,t,e,n,s,r,o){ue.setBuffer(i._roots[t]),kc(0,i,e,n,s,r,o),ue.clearBuffer()}function kc(i,t,e,n,s,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=ue,h=i*2;if(Me(h,c)){const d=Oe(i,l),f=Xe(h,c);$x(t,e,n,d,f,s,r,o)}else{const d=Ce(i);li(d,a,n,r,o)&&kc(d,t,e,n,s,r,o);const f=Pe(i,l);li(f,a,n,r,o)&&kc(f,t,e,n,s,r,o)}}const cy=["x","y","z"];function ly(i,t,e,n,s,r){ue.setBuffer(i._roots[t]);const o=Hc(0,i,e,n,s,r);return ue.clearBuffer(),o}function Hc(i,t,e,n,s,r){const{float32Array:o,uint16Array:a,uint32Array:c}=ue;let l=i*2;if(Me(l,a)){const u=Oe(i,c),d=Xe(l,a);return jx(t,e,n,u,d,s,r)}else{const u=ll(i,c),d=cy[u],g=n.direction[d]>=0;let v,m;g?(v=Ce(i),m=Pe(i,c)):(v=Pe(i,c),m=Ce(i));const y=li(v,o,n,s,r)?Hc(v,t,e,n,s,r):null;if(y){const M=y.point[d];if(g?M<=o[m+u]:M>=o[m+u+3])return y}const _=li(m,o,n,s,r)?Hc(m,t,e,n,s,r):null;return y&&_?y.distance<=_.distance?y:_:y||_||null}}const ro=new oe,os=new Tn,as=new Tn,$s=new Wt,eu=new Je,oo=new Je;function hy(i,t,e,n){ue.setBuffer(i._roots[t]);const s=Vc(0,i,e,n);return ue.clearBuffer(),s}function Vc(i,t,e,n,s=null){const{float32Array:r,uint16Array:o,uint32Array:a}=ue;let c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),eu.set(e.boundingBox.min,e.boundingBox.max,n),s=eu),Me(c,o)){const h=t.geometry,u=h.index,d=h.attributes.position,f=e.index,g=e.attributes.position,v=Oe(i,a),m=Xe(c,o);if($s.copy(n).invert(),e.boundsTree)return xe(i,r,oo),oo.matrix.copy($s),oo.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>oo.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let x=v,_=m+v;x<_;x++)if(Te(as,3*t.resolveTriangleIndex(x),u,d),as.needsUpdate=!0,y.intersectsTriangle(as))return!0;return!1}});{const p=Bo(e);for(let y=v,x=m+v;y<x;y++){const _=t.resolveTriangleIndex(y);Te(os,3*_,u,d),os.a.applyMatrix4($s),os.b.applyMatrix4($s),os.c.applyMatrix4($s),os.needsUpdate=!0;for(let M=0,E=p*3;M<E;M+=3)if(Te(as,M,f,g),as.needsUpdate=!0,os.intersectsTriangle(as))return!0}}}else{const h=Ce(i),u=Pe(i,a);return xe(h,r,ro),!!(s.intersectsBox(ro)&&Vc(h,t,e,n,s)||(xe(u,r,ro),s.intersectsBox(ro)&&Vc(u,t,e,n,s)))}}const ao=new Wt,za=new Je,js=new Je,uy=new I,dy=new I,fy=new I,py=new I;function my(i,t,e,n={},s={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),za.set(t.boundingBox.min,t.boundingBox.max,e),za.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,l=a.index,h=t.attributes.position,u=t.index,d=gn.getPrimitive(),f=gn.getPrimitive();let g=uy,v=dy,m=null,p=null;s&&(m=fy,p=py);let y=1/0,x=null,_=null;return ao.copy(e).invert(),js.matrix.copy(ao),i.shapecast({boundsTraverseOrder:M=>za.distanceToBox(M),intersectsBounds:(M,E,T)=>T<y&&T<o?(E&&(js.min.copy(M.min),js.max.copy(M.max),js.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(t.boundsTree){const T=t.boundsTree;return T.shapecast({boundsTraverseOrder:A=>js.distanceToBox(A),intersectsBounds:(A,b,S)=>S<y&&S<o,intersectsRange:(A,b)=>{for(let S=A,C=A+b;S<C;S++){const D=T.resolveTriangleIndex(S);Te(f,3*D,u,h),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let P=M,U=M+E;P<U;P++){const F=i.resolveTriangleIndex(P);Te(d,3*F,l,c),d.needsUpdate=!0;const H=d.distanceToTriangle(f,g,m);if(H<y&&(v.copy(g),p&&p.copy(m),y=H,x=P,_=S),H<r)return!0}}}})}else{const T=Bo(t);for(let A=0,b=T;A<b;A++){Te(f,3*A,u,h),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let S=M,C=M+E;S<C;S++){const D=i.resolveTriangleIndex(S);Te(d,3*D,l,c),d.needsUpdate=!0;const P=d.distanceToTriangle(f,g,m);if(P<y&&(v.copy(g),p&&p.copy(m),y=P,x=S,_=A),P<r)return!0}}}}}),gn.releasePrimitive(d),gn.releasePrimitive(f),y===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=y,n.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(ao),v.applyMatrix4(ao),s.distance=v.sub(s.point).length(),s.faceIndex=_),n)}function nu(i,t,e){return i===null?null:(i.point.applyMatrix4(t.matrixWorld),i.distance=i.point.distanceTo(e.ray.origin),i.object=t,i)}const co=new Je,lo=new Rs,iu=new I,su=new Wt,ru=new I,ka=["getX","getY","getZ"];class Co extends Fx{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,s=t._roots,r=t._indirectBuffer,o=n.getIndex(),a={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(a.roots=s.map(c=>c.slice()),a.index=o?o.array.slice():null,a.indirectBuffer=r?r.slice():null):(a.roots=s,a.index=o?o.array:null,a.indirectBuffer=r),a}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:s,roots:r,indirectBuffer:o}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),c(r));const a=new Co(e,{...n,[cl]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){const l=e.getIndex();if(l===null){const h=new Ye(t.index,1,!1);e.setIndex(h)}else l.array!==s&&(l.array.set(s),l.needsUpdate=!0)}return a;function c(l){for(let h=0;h<l.length;h++){const u=l[h],d=new Uint32Array(u),f=new Uint16Array(u);for(let g=0,v=u.byteLength/We;g<v;g++){const m=Re*g,p=2*m;Me(p,f)||(d[m+6]=d[m+6]/Re-g)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){const s=this.geometry,r=this._indirectBuffer,o=s.attributes.position,a=s.index?s.index.array:null,l=(r?r[t]:t)*3;let h=l+0,u=l+1,d=l+2;a&&(h=a[h],u=a[u],d=a[d]);for(let f=0;f<3;f++){const g=o[ka[f]](h),v=o[ka[f]](u),m=o[ka[f]](d);let p=g;v<p&&(p=v),m<p&&(p=m);let y=g;v>y&&(y=v),m>y&&(y=m),e[n+f]=p,e[n+f+3]=y}return e}computePrimitiveBounds(t,e,n){const s=this.geometry,r=this._indirectBuffer,o=s.attributes.position,a=s.index?s.index.array:null,c=o.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const l=o.array,h=o.offset||0;let u=3;o.isInterleavedBufferAttribute&&(u=o.data.stride);const d=["getX","getY","getZ"],f=n.offset;for(let g=t,v=t+e;g<v;g++){const p=(r?r[g]:g)*3,y=(g-f)*6;let x=p+0,_=p+1,M=p+2;a&&(x=a[x],_=a[_],M=a[M]),c||(x=x*u+h,_=_*u+h,M=M*u+h);for(let E=0;E<3;E++){let T,A,b;c?(T=o[d[E]](x),A=o[d[E]](_),b=o[d[E]](M)):(T=l[x+E],A=l[_+E],b=l[M+E]);let S=T;A<S&&(S=A),b<S&&(S=b);let C=T;A>C&&(C=A),b>C&&(C=b);const D=(C-S)/2,P=E*2;n[y+P+0]=S+D,n[y+P+1]=D+(Math.abs(S)+D)*yo}}return n}raycastObject3D(t,e,n=[]){const{material:s}=t;if(s===void 0)return;su.copy(t.matrixWorld).invert(),lo.copy(e.ray).applyMatrix4(su),ru.setFromMatrixScale(t.matrixWorld),iu.copy(lo.direction).multiply(ru);const r=iu.length(),o=e.near/r,a=e.far/r;if(e.firstHitOnly===!0){let c=this.raycastFirst(lo,s,o,a);c=nu(c,t,e),c&&n.push(c)}else{const c=this.raycast(lo,s,o,a);for(let l=0,h=c.length;l<h;l++){const u=nu(c[l],t,e);u&&n.push(u)}}return n}refit(t=null){return(this.indirect?oy:Yx)(this,t)}raycast(t,e=Dn,n=0,s=1/0){const r=this._roots,o=[],a=this.indirect?ay:Zx;for(let c=0,l=r.length;c<l;c++)a(this,c,e,t,o,n,s);return o}raycastFirst(t,e=Dn,n=0,s=1/0){const r=this._roots;let o=null;const a=this.indirect?ly:Qx;for(let c=0,l=r.length;c<l;c++){const h=a(this,c,e,t,n,s);h!=null&&(o==null||h.distance<o.distance)&&(o=h)}return o}intersectsGeometry(t,e){let n=!1;const s=this._roots,r=this.indirect?hy:ty;for(let o=0,a=s.length;o<a&&(n=r(this,o,t,e),!n);o++);return n}shapecast(t){const e=gn.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?Kx:qx});return gn.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:s,intersectsTriangles:r}=n;const o=gn.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{const v=this.resolveTriangleIndex(g);Te(o,v*3,a,c)}:g=>{Te(o,g*3,a,c)},h=gn.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position,f=t.indirect?g=>{const v=t.resolveTriangleIndex(g);Te(h,v*3,u,d)}:g=>{Te(h,g*3,u,d)};if(r){if(!(t instanceof Co))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const g=(v,m,p,y,x,_,M,E)=>{for(let T=p,A=p+y;T<A;T++){f(T),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let b=v,S=v+m;b<S;b++)if(l(b),o.needsUpdate=!0,r(o,h,b,T,x,_,M,E))return!0}return!1};if(s){const v=s;s=function(m,p,y,x,_,M,E,T){return v(m,p,y,x,_,M,E,T)?!0:g(m,p,y,x,_,M,E,T)}}else s=g}return super.bvhcast(t,e,{intersectsRanges:s})}intersectsBox(t,e){return co.set(t.min,t.max,e),co.needsUpdate=!0,this.shapecast({intersectsBounds:n=>co.intersectsBox(n),intersectsTriangle:n=>co.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},s={},r=0,o=1/0){return(this.indirect?my:ry)(this,t,e,n,s,r,o)}closestPointToPoint(t,e={},n=0,s=1/0){return Hx(this,t,e,n,s)}}const ls={Mesh:he.prototype.raycast,Line:Uo.prototype.raycast,LineSegments:Fu.prototype.raycast,LineLoop:Ou.prototype.raycast,Points:Bu.prototype.raycast,BatchedMesh:kp.prototype.raycast},Be=new he,ho=[];function gy(i,t){if(this.isBatchedMesh)_y.call(this,i,t);else{const{geometry:e}=this;if(e.boundsTree)e.boundsTree.raycastObject3D(this,i,t);else{let n;if(this instanceof he)n=ls.Mesh;else if(this instanceof Fu)n=ls.LineSegments;else if(this instanceof Ou)n=ls.LineLoop;else if(this instanceof Uo)n=ls.Line;else if(this instanceof Bu)n=ls.Points;else throw new Error("BVH: Fallback raycast function not found.");n.call(this,i,t)}}}function _y(i,t){if(this.boundsTrees){const e=this.boundsTrees,n=this._drawInfo||this._instanceInfo,s=this._drawRanges||this._geometryInfo,r=this.matrixWorld;Be.material=this.material,Be.geometry=this.geometry;const o=Be.geometry.boundsTree,a=Be.geometry.drawRange;Be.geometry.boundingSphere===null&&(Be.geometry.boundingSphere=new _n);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;const h=n[c].geometryIndex;if(Be.geometry.boundsTree=e[h],this.getMatrixAt(c,Be.matrixWorld).premultiply(r),!Be.geometry.boundsTree){this.getBoundingBoxAt(h,Be.geometry.boundingBox),this.getBoundingSphereAt(h,Be.geometry.boundingSphere);const u=s[h];Be.geometry.setDrawRange(u.start,u.count)}Be.raycast(i,ho);for(let u=0,d=ho.length;u<d;u++){const f=ho[u];f.object=this,f.batchId=c,t.push(f)}ho.length=0}Be.geometry.boundsTree=o,Be.geometry.drawRange=a,Be.material=null,Be.geometry=null}else ls.BatchedMesh.call(this,i,t)}function id(i,t){for(const n of[...i.children])n instanceof he||id(n,t);const e=new Map;for(const n of i.children){if(!(n instanceof he)||n instanceof Qs||Array.isArray(n.material)||n.userData.eye||t.has(n))continue;const s=`${n.material.id}/${n.castShadow}/${n.receiveShadow}/${n.visible}`;e.has(s)||e.set(s,[]),e.get(s).push(n)}for(const n of e.values()){if(n.length<2)continue;const s=n.map(c=>(c.updateMatrix(),c.geometry.clone().applyMatrix4(c.matrix))),r=Zu(s,!1);if(s.forEach(c=>c.dispose()),!r)continue;const o=n[0],a=new he(r,o.material);a.castShadow=o.castShadow,a.receiveShadow=o.receiveShadow,a.visible=o.visible,a.name="rigid-detail-batch",i.add(a),n.forEach(c=>c.removeFromParent())}}function vy(i){const t=[];return i.traverse(e=>{if(e instanceof he){if(e instanceof Qs){const n=e.userData.occlusionBounds;if(!n)return;const s=new I;e.raycast=(r,o)=>{if(!r.ray.intersectBox(n,s))return;const a=r.ray.origin.distanceTo(s);a>=r.near&&a<=r.far&&o.push({distance:a,point:s.clone(),object:e})}}else e.geometry.attributes.position.count>128&&(e.geometry.boundsTree||(e.geometry.boundsTree=new Co(e.geometry,{targetLeafSize:12})),e.raycast=gy);t.push(e)}}),t}class xy{tier;slow=0;fast=0;warmup=1.5;constructor(t=!1){this.tier=t?1:2}sample(t){if(!Number.isFinite(t)||t<=0)return!1;if(this.warmup>0)return this.warmup-=t,!1;const e=Math.min(t,.5);return this.slow=t>1/35?this.slow+e:Math.max(0,this.slow-e*2),this.fast=t<1/55?this.fast+e:0,this.slow>1.8&&this.tier>0?(this.tier=this.tier-1,this.slow=0,this.fast=0,this.warmup=2,!0):this.fast>18&&this.tier<2?(this.tier=this.tier+1,this.fast=0,this.slow=0,this.warmup=3,!0):!1}pixelRatio(t,e,n){const s=[.65,1,1.25],r=[32e4,85e4,14e5];return Math.min(t,s[this.tier],Math.sqrt(r[this.tier]/Math.max(1,e*n)))}}const sd=96,Ri=i=>i-Math.floor(i),yy=Array.from({length:sd},(i,t)=>({x:-3.42+6.84*Ri(t*.61803398875+.17),phase:Ri(t*.41421356237+.31),speed:.025+.022*Ri(t*.73205080757),width:.012+.008*Ri(t*.271828),length:.027+.028*Ri(t*.141421)}));function My(i,t,e){const n=yy[i],s=t*n.speed+n.phase,r=Math.floor(s),o=Ri(s),a=Ri(i*.754877666+r*.569840291)-.5;e[0]=n.x+a*.1+Math.sin(o*10+i)*.065,e[1]=5.35-Math.pow(o,1.12)*5.22,e[2]=-1.62+Math.sin(o*11+i*2)*.012;const c=Math.min(1,o*30,(1-o)*30);e[3]=n.width*c,e[4]=n.length*c}const ou=[[-2.15,.18,1.85,.35],[2,.18,1.85,-.4],[-2.3,3.64,-.8,.16],[2.3,2.42,.28,-.38]],Po=[[-3.25,3.68,-1.05],[-2.3,3.4,-.8],[-1.25,2.98,-.55],[-.3,2.42,-.3]],Mn=Po[Po.length-1],bi=1.45,au=1.65,rd=[[2.45,2.1,.05],[2.92,2.45,-.18],[3.25,2.85,-.6],[3.16,3.09,-1.35]],Nt=(i=0,t=0,e=0)=>new I(i,t,e),Ei=i=>(i=cr.clamp(i,0,1),i*i*(3-2*i)),Sy=[[[-.6,.15,1.85],[-.8,.15,2],[-.35,.15,1.8],[-.7,.15,1.65]],[[.6,.15,1.85],[.8,.15,2],[.35,.15,1.8],[.7,.15,1.65]],[[-.98,2.95,-.48],[-.78,2.82,-.43],[-.56,2.69,-.36],[-.86,2.87,-.45]],[[3.18,3.21,-1.05],[3.15,3.24,-1.24],[3.18,3.22,-1.14],[3.14,3.25,-1.3]]];class by{constructor(t,e,n,s,r,o,a,c){this.id=t,this.station=e,this.seated=n,this.seatedHead=s,this.arms=r,this.legs=o,this.mug=a;const l=(p,y,x,_)=>{const M=new he(new vs(1,20,14),y);return M.position.copy(x),M.scale.copy(_),M.castShadow=!0,p.add(M),M},h=(p,y,x,_)=>{const M=new he(new xs(new _s(x),12,_,6,!1),y);return M.castShadow=!0,p.add(M),M};this.eyeParts=s.children.filter(p=>p.userData.eye),this.eyeParts.forEach(p=>p.userData.restY=p.scale.y);const u=new Ge({color:"#08130e",roughness:.18}),d=new gs({color:"#f0fff2"});e.add(this.hunter),this.hunter.visible=!1,this.hunter.name="hunting-frog",l(this.hunter,c,Nt(0,.32,.13),Nt(.25,.19,.36)),this.head.position.set(0,.4,-.23),this.hunter.add(this.head),l(this.head,c,Nt(),Nt(.285,.17,.235)),l(this.head,c,Nt(0,-.075,-.17),Nt(.25,.06,.12));for(const p of[-1,1])l(this.head,c,Nt(p*.2,.12,-.04),Nt(.12,.13,.12)),l(this.head,u,Nt(p*.2,.14,-.14),Nt(.068,.074,.035)),l(this.head,d,Nt(p*.2-.02,.16,-.17),Nt(.016,.018,.008)),l(this.head,u,Nt(p*.1,-.03,-.27),Nt(.01,.008,.007));h(this.head,u,[Nt(-.22,-.08,-.22),Nt(0,-.105,-.28),Nt(.22,-.08,-.22)],.006);for(const p of[-1,1])for(const y of[!1,!0]){const x=new Ne;x.position.set(p*.19,.3,y?.34:-.18),this.hunter.add(x),this.limbs.push(x),y&&l(x,c,Nt(p*.08,-.035,.025),Nt(.16,.12,.18)),h(x,c,[Nt(),Nt(p*.16,-.12,y?.14:.04),Nt(p*.15,-.27,y?-.04:-.13)],y?.046:.029);for(let _=0;_<3;_++){const M=p*(.1+_*.05),E=y?-.04:-.13;h(x,c,[Nt(p*.15,-.27,E),Nt(M,-.285,E-.1),Nt(M+p*.015,-.28,E-.15)],.009),l(x,c,Nt(M+p*.015,-.28,E-.15),Nt(.018,.009,.024))}}this.tongue=new he(new No(.013,.018,1,8),new Ge({color:"#dc8e9f",roughness:.6})),e.add(this.tongue),this.tongue.visible=!1,e.updateMatrixWorld(!0);const f=t>=2?new _s((t===2?Po:rd).map(p=>Nt(...p))):null,g=p=>{if(f){let y=1/0,x=Nt(),_=0;for(let M=0;M<=160;M++){const E=M/160,T=f.getPointAt(E),A=(T.x-p.x)**2+(T.z-p.z)**2;A<y&&(y=A,x=T,_=E)}p.y=x.y+(t===2?.32*Math.max(.025,(1-_)**.68):.16)+.02,p.z=x.z}return p};this.path=Sy[t].map(p=>e.worldToLocal(g(Nt(...p)))),this.stops=this.path.map((p,y)=>{const x=y?p.clone().sub(this.path[y-1]):this.path[1].clone().sub(p);x.y=0;const _=p.clone().addScaledVector(x.normalize(),t===3?-.2:-.4);return e.worldToLocal(g(e.localToWorld(_)))});const v=new Ge({color:"#37251a",roughness:.8}),m=new Ge({color:"#ac5034"});for(let p=0;p<4;p++){const y=new Ne;y.name="flightless-fruit-fly",e.add(y),this.flies.push(y),l(y,v,Nt(0,.018,0),Nt(.02,.018,.034)),l(y,m,Nt(0,.02,-.037),Nt(.016,.015,.015));for(const x of[-1,1])for(let _=0;_<3;_++)h(y,v,[Nt(x*.01,.018,(_-1)*.018),Nt(x*.034,.012,(_-1)*.025),Nt(x*.045,0,(_-1)*.027)],.0025)}}id;station;seated;seatedHead;arms;legs;mug;hunter=new Ne;head=new Ne;limbs=[];flies=[];tongue;eaten=new Set;path;stops;lastAction="desk";eyeParts;anchor(){return this.hunter.visible?this.head.getWorldPosition(Nt()):this.seatedHead.getWorldPosition(Nt())}tick(t,e,n,s,r){t!==this.lastAction&&this.eaten.clear();const o=n?e/n:0,a=Ei(o/.13)*(1-Ei((o-.86)/.14));this.seated.visible=!0,this.hunter.visible=!1,this.tongue.visible=!1,this.seated.position.set(0,0,0),this.seated.rotation.set(0,0,0),this.seated.scale.set(1,1+Math.sin(s*1.4+this.id)*.007,1),this.arms.forEach(c=>c.scale.set(1,1,1)),this.seatedHead.rotation.set(0,0,0),this.legs.forEach(c=>c.scale.set(1,1,1)),this.eyeParts.forEach(c=>c.scale.y=c.userData.restY),this.mug.position.set(-.66,.94,-.02),this.mug.rotation.set(0,0,0);for(let c=0;c<this.flies.length;c++){const l=this.flies[c],h=this.path[c];l.visible=r&&!this.eaten.has(c),l.position.copy(h).add(Nt(Math.sin(s*.7+c*2+this.id)*.055,.012,Math.cos(s*.9+c)*.035)),l.rotation.y=Math.sin(s*.4+c)*2,l.rotation.z=Math.sin(s*15+c)*.035}if(t==="sleep")this.seatedHead.rotation.x=.24*a,this.seatedHead.rotation.z=Math.sin(s*.48+this.id)*.045*a,this.eyeParts.forEach(c=>c.scale.y=c.userData.restY*(1-.96*a)),this.arms.forEach((c,l)=>{c.rotation.x=-.25*a,c.rotation.z=(l?1:-1)*.12*a});else if(t==="stretch"){const c=this.id%2?1:-1;this.seated.position.set(c*.5*a,.07*a,.1*a),this.legs.forEach(l=>l.scale.y=1+a*.8),this.seated.rotation.z=Math.sin(s*1.6)*.065*a,this.seatedHead.rotation.x=-.17*a,this.arms.forEach((l,h)=>{l.rotation.z=(h?-1:1)*.6*a,l.rotation.x=1.9*a,l.scale.z=1+.45*a})}else if(t==="coffee"){this.seated.position.set(-.5*a,.07*a,.08*a),this.legs.forEach(h=>h.scale.y=1+a*.8);const c=a*(.9+.1*Math.sin(s*2));this.arms[0].rotation.x=.7*c,this.arms[0].rotation.z=-.16*c;const l=Nt(0,-.057,-.31).applyEuler(this.arms[0].rotation).add(this.arms[0].position).add(this.seated.position);this.mug.position.lerp(l.add(Nt(.025,-.015,-.025)),a),this.mug.rotation.x=-.65*c,this.seatedHead.rotation.x=.05*c}else if(t==="hunt"){const c=Ei(o/.065),l=Ei((o-.95)/.05),h=c*(1-l),u=Nt(this.id===1?-.66:.66,.08,.45);if(this.seated.position.copy(u).multiplyScalar(h),this.seated.scale.y*=1-.52*Ei((o-.025)/.04)*(1-Ei((o-.95)/.04)),this.legs.forEach(d=>d.scale.y=1+h*.65),o>.065&&o<.95){this.seated.visible=!1,this.hunter.visible=!0;let d,f,g,v=!1,m=-1;if(o<.18)d=u,f=this.stops[0],g=(o-.065)/.115;else if(o>.78)d=this.stops[3],f=u,g=(o-.78)/.17;else{const M=(o-.18)/.6*4,E=Math.min(3,Math.floor(M));g=M-E,d=E===0?this.stops[0]:this.stops[E-1],f=this.stops[E],m=E,v=g>.62,g=Math.min(g/.62,1)}g=cr.clamp(g,0,1);let p=this.id<2?.4:.27,y=!1;if(o<.18||o>.78){y=o>.78;const M=y?1-g:g,E=u.clone();E.x=Math.sign(u.x)*1.34,M<.35?(d=u,f=E,g=M/.35,p=.012):(d=E,f=y?this.stops[3]:this.stops[0],g=(M-.35)/.65,p=.7)}const x=Math.sin(g*Math.PI);this.hunter.position.copy(d).lerp(f,Ei(g)),this.hunter.position.y+=x*p;const _=v&&m>=0?this.path[m].clone().sub(f):f.clone().sub(d).multiplyScalar(y?-1:1);if(_.lengthSq()>.001&&(this.hunter.rotation.y=Math.atan2(-_.x,-_.z)),this.hunter.scale.set(1,1-x*.12,1),this.limbs.forEach((M,E)=>M.rotation.x=Math.sin(g*Math.PI*2)*(E%2?.48:-.24)),this.head.rotation.x=v?.12:0,v&&m>=0){const M=(o-.18)/.6*4%1,E=Math.sin(cr.clamp((M-.65)/.2,0,1)*Math.PI);if(M>.82&&(this.eaten.add(m),this.flies[m].visible=!1),E>.03){this.hunter.updateMatrixWorld(!0);const T=this.station.worldToLocal(this.head.localToWorld(Nt(0,-.08,-.29))),A=T.clone().lerp(this.flies[m].position,E),b=A.clone().sub(T);this.tongue.visible=!0,this.tongue.position.copy(T).add(A).multiplyScalar(.5),this.tongue.scale.set(1,b.length(),1),this.tongue.quaternion.setFromUnitVectors(Nt(0,1,0),b.normalize())}}}}this.lastAction=t}}const B=(i=0,t=0,e=0)=>new I(i,t,e);let Di=45;const dt=()=>(Di=Di*1664525+1013904223>>>0,Di/4294967296);function ys(i,t=512){const e=document.createElement("canvas");e.width=e.height=t;const n=e.getContext("2d");i(n,t);const s=new zu(e);return s.colorSpace=nn,s}const cu=()=>ys((i,t)=>{i.fillStyle="#292b24",i.fillRect(0,0,t,t);for(let e=0;e<1400;e++){let n=dt()*t,s=dt()*t;i.strokeStyle=["#101714","#42473a","#575648","#22241f"][e%4],i.lineWidth=.6+dt()*3,i.beginPath(),i.moveTo(n,s),i.bezierCurveTo(n+12,s+20,n-12,s+70,n+5,s+100+dt()*130),i.stroke()}for(let e=0;e<1800;e++)i.fillStyle=`rgba(100,133,47,${dt()*.35})`,i.fillRect(dt()*t,dt()*t,dt()*3,dt()*7)});function Ha(i=!1){return ys((t,e)=>{const n=t.createLinearGradient(0,0,e,0);n.addColorStop(0,i?"#173d27":"#173f20"),n.addColorStop(.5,i?"#46763c":"#6e9c37"),n.addColorStop(1,"#153824"),t.fillStyle=n,t.fillRect(0,0,e,e),t.strokeStyle=i?"#ef599d":"#a1b45e",t.lineWidth=i?12:3,t.beginPath(),t.moveTo(e/2,e),t.lineTo(e/2,0),t.stroke();for(let s=30;s<e;s+=55)for(const r of[-1,1])if(t.lineWidth=i?8:1.5,t.beginPath(),t.moveTo(e/2,s+80),t.quadraticCurveTo(e/2+r*80,s+25,e/2+r*230,s-15),t.stroke(),i){t.lineWidth=3.2;for(let o=1;o<4;o++)t.beginPath(),t.moveTo(e/2+r*o*50,s+60-o*18),t.lineTo(e/2+r*(o*55+40),s+90-o*10),t.stroke()}for(let s=0;s<3e3;s++)t.fillStyle=`rgba(15,35,13,${dt()*.3})`,t.fillRect(dt()*e,dt()*e,1+dt()*3,1+dt()*3)})}function Ey(i){return ys((t,e)=>{if(t.fillStyle=i?"#299de9":"#101713",t.fillRect(0,0,e,e),!i){t.fillStyle="#edcb29";for(let n=0;n<3;n++){t.beginPath();const s=n*180+15;t.moveTo(0,s);for(let r=0;r<=e;r+=8)t.lineTo(r,s+18*Math.sin(r/65+n));for(let r=e;r>=0;r-=8)t.lineTo(r,s+76+24*Math.sin(r/80+n));t.closePath(),t.fill()}}for(let n=0;n<(i?100:38);n++){const s=dt()*e,r=dt()*e;t.fillStyle=i?"#071a2c":"#111d14",t.beginPath(),t.ellipse(s,r,3+dt()*14,3+dt()*12,dt()*3,0,Math.PI*2),t.fill()}for(let n=0;n<8e3;n++)t.fillStyle=`rgba(255,255,255,${dt()*.12})`,t.fillRect(dt()*e,dt()*e,1,1)})}function uo(i=!1){const t=new Se,e=[],n=[],s=[],r=14;for(let o=0;o<=r;o++){const a=o/r,c=Math.pow(Math.sin(a*Math.PI),i?.65:.8)*(i?.32:.23);for(let l=0;l<3;l++){const h=l-1;e.push(h*c,a,Math.sin(a*Math.PI)*.1+Math.abs(h)*.035),n.push(l/2,a)}}for(let o=0;o<r;o++)for(let a=0;a<2;a++){let c=o*3+a;s.push(c,c+3,c+1,c+1,c+3,c+4)}return t.setAttribute("position",new Kt(e,3)),t.setAttribute("uv",new Kt(n,2)),t.setIndex(s),t.computeVertexNormals(),t}class Ty{renderer;scene=new Rp;camera=new sn(39,1,.05,65);controls;root=new Ne;stations=[];frogs=[];hands=[];monitors=[];life=[];heads=[];legs=[];director=new yd;marketClosed=!1;lastStateAt=-1/0;lifeTime=0;wallMoss;mossDetailed=new nr(.035,1);mossSimple=new nr(.035,0);wallDrops;wallSample=new Float32Array(5);followAnchor=null;drops;dripBud;ripples=[];fingers=[];freeCamera=!1;cameraOccluders=[];occlusionTimer=0;clearances=[];dropletTransform=new _e;bubbles=[];selected=null;targetPos=null;targetLook=B(0,2.4,0);raycaster=new mm;pointer=new ot;frame=0;disposed=!1;lastTime=0;animateHands=!0;sound=!1;charts={};info=[];onSelect;host;clock=new pm;materialCache=new Map;sphereGeometry=new vs(1,24,16);boxGeometry=new Cs(1,1,1);budget=new xy((navigator.hardwareConcurrency||8)<=4||matchMedia("(pointer:coarse)").matches||(navigator.deviceMemory||8)<=4);occluders=[];lastVisibilityCamera=B(1/0,1/0,1/0);lastVisibilityTarget=B(1/0,1/0,1/0);lastVisibilityAnchor=B(1/0,1/0,1/0);shadowTime=0;labelTime=0;viewportWidth=1;viewportHeight=1;monitorKeys=[];staticMeshes=new Map;constructor(t,e){this.host=t,this.onSelect=e,this.clearances=ou.map(([r,o,a,c])=>{const l=new Wt().compose(B(r,o,a),new ai().setFromAxisAngle(B(0,1,0),c),B(.73,.73,.73));return new oe(B(-1.02,.74,-1.02),B(1.02,1.85,1.3)).applyMatrix4(l)}),this.renderer=new ex({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(this.budget.pixelRatio(window.devicePixelRatio,t.clientWidth,t.clientHeight)),this.renderer.setClearColor("#101d19"),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0,this.renderer.shadowMap.type=mu,this.renderer.toneMapping=_u,this.renderer.toneMappingExposure=1.5,t.appendChild(this.renderer.domElement),this.camera.position.set(0,4.1,12.6),this.controls=new ix(this.camera,this.renderer.domElement),this.controls.target.set(0,2.5,0),this.controls.enableDamping=!1,this.controls.enablePan=!1,this.controls.minDistance=.8,this.controls.maxDistance=40,this.controls.minPolarAngle=.12,this.controls.maxPolarAngle=Math.PI-.12,this.controls.maxAzimuthAngle=1/0,this.controls.minAzimuthAngle=-1/0,this.controls.enabled=!1,this.scene.fog=new Qc("#10231e",.028),this.scene.add(this.root),this.lighting(),this.enclosure(),this.plants(),this.backWater(),this.mergeStatic(),ou.forEach((r,o)=>this.station(o,r));const n=new Set(this.life.map(r=>r.tongue));this.stations.forEach(r=>id(r,n)),this.occluders=vy(this.root),this.raycaster.firstHitOnly=!0;const s=new Gr({color:"#bfe6e3",roughness:.12,metalness:.12,transparent:!0,opacity:.78,emissive:"#315855",emissiveIntensity:.35});this.drops=new Qs(new vs(.025,12,8),s,4),this.drops.instanceMatrix.setUsage(Cl),this.drops.frustumCulled=!1,this.scene.add(this.drops),this.dripBud=this.ball(this.scene,s,B(...Mn).add(B(0,-.025,0)),B(.022,.035,.022));for(let r=0;r<2;r++){const o=this.mesh(new il(.09,.1,40),new gs({color:"#9bcfc2",transparent:!0,opacity:.35,side:Ae,depthWrite:!1}),this.scene,B(Mn[0],.057+r*.001,Mn[2]));o.rotation.x=-Math.PI/2,o.castShadow=!1,this.ripples.push(o)}this.renderer.domElement.addEventListener("pointerdown",this.click),window.addEventListener("resize",this.resize),new ResizeObserver(this.resize).observe(t),this.resize(),this.tick()}mat(t,e=.8,n=0){const s=`${t}/${e}/${n}`;return this.materialCache.has(s)||this.materialCache.set(s,new Ge({color:t,roughness:e,metalness:n})),this.materialCache.get(s)}mesh(t,e,n=this.root,s=B(),r=B(1,1,1)){const o=new he(t,e);return o.position.copy(s),o.scale.copy(r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}ball(t,e,n,s){return this.mesh(this.sphereGeometry,e,t,n,s)}box(t,e,n,s){return this.mesh(this.boxGeometry,e,t,n,s)}tube(t,e,n,s=this.root,r=40){return this.mesh(new xs(new _s(t),r,e,9,!1),n,s)}addStatic(t,e=!1){if(t.updateMatrixWorld(!0),e&&this.clearances.some(r=>r.intersectsBox(new oe().setFromObject(t)))){t.removeFromParent(),t.geometry.dispose();return}const n=t.geometry.clone().applyMatrix4(t.matrixWorld),s=t.material;this.staticMeshes.has(s)||this.staticMeshes.set(s,[]),this.staticMeshes.get(s).push(n),t.removeFromParent()}taperedBranch(t,e,n){const s=new _s(t),r=64,o=14,a=new xs(s,r,e,o,!1),c=a.attributes.position;for(let l=0;l<=r;l++){const h=l/r,u=s.getPointAt(h),d=Math.max(.025,Math.pow(1-h,.68));for(let f=0;f<=o;f++){const g=l*(o+1)+f,v=B().fromBufferAttribute(c,g).sub(u).multiplyScalar(d).add(u);c.setXYZ(g,v.x,v.y,v.z)}}return a.computeVertexNormals(),this.mesh(a,n)}mergeStatic(){this.staticMeshes.forEach((t,e)=>{const n=Zu(t,!1);if(n){const s=this.mesh(n,e);s.castShadow=!1}t.forEach(s=>s.dispose())}),this.staticMeshes.clear()}lighting(){this.scene.add(new om("#dceee4","#605542",3.2));const t=new dm("#fff2d0",4.5);t.position.set(-2,8,5),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),Object.assign(t.shadow.camera,{left:-5,right:5,top:6,bottom:-4,near:.1,far:22}),t.shadow.bias=-8e-4,t.shadow.normalBias=.035,this.scene.add(t);const e=new cm("#83cda9",28,16,.8,.8,1.4);e.position.set(1,6,-2),e.target.position.set(0,1,1),this.scene.add(e,e.target);const n=new hm("#d6e5cf",12,12,1.3);n.position.set(0,3,6),this.scene.add(n)}enclosure(){const t=this.mat("#141e1c",.35,.65),e=this.mat("#1a2115"),n=cu();n.wrapS=n.wrapT=Ci,n.repeat.set(3,3);const s=new Ge({color:"#455238",map:n,bumpMap:n,bumpScale:.15,roughness:.9});this.box(this.root,e,B(0,-.15,0),B(7.6,.35,4.9)),this.box(this.root,s,B(0,2.8,-2.45),B(7.6,5.8,.25));const r=new Gn(7.6,5.8,70,60),o=r.attributes.position;for(let P=0;P<o.count;P++){const U=o.getX(P),F=o.getY(P);o.setZ(P,.1+.09*Math.sin(U*9+F*8)+.12*Math.sin(U*3-F*4)+dt()*.12)}r.computeVertexNormals();const a=this.mesh(r,s,this.root,B(0,2.8,-2.16));a.receiveShadow=!0;const c=this.mat("#283b1d",.98),l=new Qs(this.mossDetailed,c,2200),h=new _e;for(let P=0;P<2200;P++){const U=(dt()-.5)*7.3,F=dt()*5.5;h.position.set(U,F,-1.94+.07*Math.sin(U*9+F*8)),h.scale.set(1+dt()*2.5,1+dt()*2.5,.1+dt()*.2),h.updateMatrix(),l.setMatrixAt(P,h.matrix)}this.wallMoss=l,l.userData.occlusionBounds=new oe(B(-3.75,0,-2.08),B(3.75,5.6,-1.65)),this.root.add(l);for(const P of[-3.85,3.85])this.box(this.root,t,B(P,2.8,.05),B(.11,5.9,5.1));for(const P of[-.25,5.65])this.box(this.root,t,B(0,P,2.48),B(7.85,.12,.13)),this.box(this.root,t,B(0,P,-2.5),B(7.85,.16,.16));const u=new Gr({color:"#8cbaa9",transparent:!0,opacity:.045,roughness:.1,metalness:0,side:Ae,depthWrite:!1});for(const P of[-3.78,3.78]){const U=this.mesh(new Gn(5,5.7),u,this.root,B(P,2.7,0));U.rotation.y=Math.PI/2,U.castShadow=!1}const d=new Ge({color:"#eafff0",emissive:"#d6ffe0",emissiveIntensity:3});for(let P=0;P<15;P++)this.box(this.root,d,B(-3.4+P*.485,5.5,-.4),B(.16,.035,.13));const f=cu();f.wrapS=f.wrapT=Ci,f.repeat.set(3,2);const g=new Ge({map:f,bumpMap:f,bumpScale:.36,color:"#a6a18a",roughness:.75});this.tube([B(3.1,.08,1.6),B(2.85,1,.9),B(2.45,2.1,.05),B(2.88,3.45,-1.15)],.31,g).name="right-upright",this.tube([B(-2.4,.2,1.7),B(-1.6,.8,1.1),B(0,1.55,.65),B(1.8,2,.25),B(2.45,2.1,.05)],.29,g).name="main-branch",this.tube(rd.map(P=>B(...P)),.16,g).name="right-y-fork",this.taperedBranch(Po.map(P=>B(...P)),.32,g).name="separate-left-branch",this.tube([B(-3,.15,-1),B(-2.5,1.1,-1.5),B(-2,2.2,-1.4),B(-2.7,3.5,-1.4)],.17,g),this.tube([B(-.4,.1,-1),B(-1.1,.65,-.7),B(-.9,1.4,-1)],.13,g);const v=this.mesh(new Ao(.68,48),new Gr({color:"#183b35",roughness:.12,metalness:.5,transparent:!0,opacity:.92}),this.root,B(Mn[0],.05,Mn[2]));v.rotation.x=-Math.PI/2,v.scale.set(1,.65,1);const m=ys((P,U)=>{P.fillStyle="#b1a17c",P.fillRect(0,0,U,U);for(let F=0;F<12e3;F++)P.fillStyle=`rgba(55,30,12,${dt()*.27})`,P.fillRect(dt()*U,dt()*U,1+dt()*6,1+dt()*6);P.strokeStyle="#5f482f",P.lineWidth=4,P.beginPath(),P.moveTo(U/2,0),P.lineTo(U/2,U),P.stroke();for(let F=40;F<U;F+=65)for(const H of[-1,1])P.lineWidth=2,P.beginPath(),P.moveTo(U/2,F),P.lineTo(U/2+H*230,F+110),P.stroke()}),p=ys((P,U)=>{P.fillStyle="#5a4027",P.fillRect(0,0,U,U);for(let F=0;F<260;F++)P.save(),P.translate(dt()*U,dt()*U),P.rotate(dt()*Math.PI*2),P.fillStyle=["#765233","#91663c","#ad8653","#62492d"][F%4],P.beginPath(),P.moveTo(0,-28),P.bezierCurveTo(32,-12,24,17,0,36),P.bezierCurveTo(-22,18,-30,-10,0,-28),P.fill(),P.strokeStyle="#493621",P.lineWidth=1,P.beginPath(),P.moveTo(0,-25),P.lineTo(0,31),P.stroke(),P.restore()});p.wrapS=p.wrapT=Ci,p.repeat.set(3,2);const y=this.mesh(new Gn(7.48,4.78),new Ge({map:p,roughness:.9}),this.root,B(0,.035,0));y.rotation.x=-Math.PI/2;const x=["#8d673c","#967045","#51402c","#ad8350","#6b5538"].map(P=>new Ge({color:P,map:m,roughness:.62,side:Ae}));x.forEach(P=>P.side=Ae);const _=uo();for(let P=0;P<1200;P++){const U=(dt()-.5)*7.35,F=(dt()-.5)*4.65;if(((U-Mn[0])/.67)**2+((F-Mn[2])/.43)**2<1)continue;const H=this.mesh(_,x[P%5],this.root,B(U,.05+dt()*.07,F));H.rotation.set(-Math.PI/2+(dt()-.5)*.25,dt()*.2,dt()*Math.PI*2),H.scale.set(.9+dt()*.85,.4+dt()*.52,1);const Y=new oe().setFromObject(H);H.position.x+=Math.max(0,-3.73-Y.min.x)-Math.max(0,Y.max.x-3.73),H.position.z+=Math.max(0,-2.37-Y.min.z)-Math.max(0,Y.max.z-2.37),this.addStatic(H)}const M=this.mat("#526b2d");for(let P=0;P<130;P++){const U=(dt()-.5)*7,F=(dt()-.5)*4.5,H=this.mesh(new nr(.06+dt()*.09,0),M,this.root,B(U,.05,F),B(1,.4+dt(),1));this.addStatic(H)}const E=Di,T=ys((P,U)=>{P.fillStyle="#193724",P.fillRect(0,0,U,U);for(let F=0;F<15e3;F++)P.fillStyle=["#25482b","#3f6033","#52733d","#1b3524","#6c8245"][F%5],P.beginPath(),P.ellipse(dt()*U,dt()*U,1+dt()*5,1+dt()*3,dt()*Math.PI,0,Math.PI*2),P.fill()});T.wrapS=T.wrapT=Ci,T.repeat.set(2,2);const A=new Ge({map:T,color:"#71835c",roughness:.97,side:Ae}),b=new Ge({map:Ha(),color:"#587545",roughness:.82,side:Ae}),S=this.mat("#405a30"),C=uo(!0);for(const P of[-1,1]){const U=this.mesh(new Gn(4.78,5.55),A,this.root,B(P*3.73,2.78,-.02));U.rotation.y=P*Math.PI/2,U.castShadow=!1;for(let F=0;F<9;F++){const H=-2.12+F*.53,Y=Array.from({length:19},(X,it)=>B(P*(3.66+.025*Math.sin(it+F)),.08+it*.29,H+Math.sin(it*.6+F)*.09));this.addStatic(this.tube(Y,.009,S,this.root,24),!0);for(let X=1;X<Y.length;X++)for(const it of[-1,1]){const ct=.2+dt()*.13,gt=this.mesh(C,b,this.root,Y[X],B(ct,ct,ct));gt.rotation.set(it*.65,P*Math.PI/2,it*.2),this.addStatic(gt,!0)}}}Di=E;const D=this.mat("#617259",.25,.5);this.box(this.root,D,B(0,-.34,2.49),B(7.7,.025,.02))}backWater(){const t=new Ge({color:"#bbd6cb",roughness:.1,metalness:.3,transparent:!0,opacity:.64,depthWrite:!1});this.wallDrops=new Qs(new vs(1,8,6),t,sd),this.wallDrops.instanceMatrix.setUsage(Cl),this.wallDrops.frustumCulled=!1,this.wallDrops.userData.occlusionBounds=new oe(B(-3.6,.05,-1.66),B(3.6,5.4,-1.58)),this.root.add(this.wallDrops)}plants(){const t=uo(),e=new Ge({map:Ha(),roughness:.57,side:Ae,color:"#b1c789"}),n=new Ge({map:Ha(!0),roughness:.65,side:Ae}),s=this.mat("#678e3d"),r=(d,f,g,v=e,m=1)=>{const p=this.mesh(t,v,this.root,d,B(f*m,f,f));p.rotation.copy(g),this.addStatic(p,!0)},o=(d,f,g,v)=>{for(let m=0;m<7;m++){const p=m/7*Math.PI*2,y=v*(.65+dt()*.35),x=[];for(let _=0;_<=15;_++){const M=_/15;x.push(B(d+Math.cos(p)*M*M*v*.65,f+Math.sin(M*1.8)*y,g+Math.sin(p)*M*M*v*.65))}this.addStatic(this.tube(x,.011,s,this.root,20),!0);for(let _=2;_<15;_++){const M=_/15,E=x[_];for(const T of[-1,1]){const A=Math.sin(M*Math.PI)*v*.21;r(E,A,new Fe(.2,p+Math.PI/2,T*(.8+M*.3)),e,.63)}}}};o(3.05,2.05,-2,2.65),o(-3.35,.25,-1.7,2.2),o(-3,2.1,-2,1.8),o(3.35,.2,-.8,1.8),o(3.2,3.4,-2,1.7),o(-3.4,1.2,-1.8,1.8),o(2.9,.2,1.6,1.1);for(const[d,f,g,v]of[[-2.4,2.55,-1.9,1.45],[.9,2.8,-2.1,1.2],[-2.8,.2,.4,1.3]])for(let m=0;m<12;m++){const p=m/12*Math.PI*2;r(B(d,f,g),v*(.65+dt()*.35),new Fe(Math.sin(p)*.7,p,Math.cos(p)*.65),e,.65)}const a=uo(!0),c=(d,f,g)=>{const v=this.mesh(a,n,this.root,d,B(f,f,f));v.rotation.copy(g),this.addStatic(v,!0)};for(let d=0;d<17;d++){const f=d*2.399,g=.18+dt()*.45,v=B(-2.85,.06,.4),m=B(-2.85+Math.cos(f)*g,.82+dt()*.57,.4+Math.sin(f)*g*.7),p=new _s([v,v.clone().lerp(m,.5).add(B(0,.12,0)),m]);this.addStatic(this.mesh(new xs(p,12,.012,5,!1),s),!0);for(let y=1;y<=3;y++)for(const x of[-1,1]){const _=p.getPoint(y/3);c(_,.33+dt()*.19,new Fe(.1+Math.cos(f)*.18,Math.sin(f)*.48,x*(.8+dt()*.45)))}}for(let d=0;d<3;d++){const f=Array.from({length:12},(g,v)=>B(3.37+Math.sin(v*.9+d)*.12,.08+v*.28,.62+d*.12));this.addStatic(this.tube(f,.014,s,this.root,35),!0);for(let g=1;g<f.length;g++)for(const v of[-1,1])c(f[g],.37+dt()*.17,new Fe(.12,v*.18,v*(.85+Math.sin(g)*.2)))}for(let d=0;d<7;d++){const f=B(-2.7+dt()*1.4,.1,1+dt()*.45);for(const g of[-1,1])c(f,.32+dt()*.12,new Fe(.4,g*.3,g*.9))}for(let d=0;d<20;d++){const f=.3+d*.22,g=-3.3+Math.sin(d)*.25;r(B(g,f,.4+Math.cos(d)*.6),.55+dt()*.35,new Fe(.2,.4,Math.sin(d)*.6),e,1.6)}const l=Di,h=(d,f,g,v,m)=>{for(let p=0;p<5;p++){const y=(p-2)/2,x=v*(1-Math.abs(y)*.22),_=Array.from({length:17},(M,E)=>{const T=E/16;return B(d+y*m*Math.pow(T,1.45),f+x*Math.sin(T*1.52),g+.32*T*T+Math.abs(y)*.08)});this.addStatic(this.tube(_,.012,s,this.root,24),!0);for(let M=2;M<16;M++){const E=M/16,T=(.13+.31*Math.sin(E*Math.PI))*(v/2.2);for(const A of[-1,1])r(_[M].clone().add(B(0,0,.025)),T,new Fe(.12+y*.05,y*.14,A*(.96+E*.34)-y*.18),e,.72)}r(_[15],.23,new Fe(.16,0,-y*.45),e,.65)}};h(-3.02,.18,-1.78,2.55,.48),h(-3.04,1.8,-1.76,2.52,.43),h(-3.12,3.42,-1.55,1.72,.36),h(3.02,.2,-1.8,2.65,.46),h(2.95,1.96,-1.8,2.8,.52),h(3.08,3.42,-1.55,1.85,.36);const u=this.mat("#567833",.62);for(let d=0;d<23;d++){const f=d*2.399,g=1.15+dt()*1.55,v=.3+dt()*.85,m=[],p=[],y=20;for(let _=0;_<=y;_++){const M=_/y,E=.038*Math.sin(Math.PI*M)**.45,T=-1.95+Math.cos(f)*v*M*M,A=.1+g*Math.sin(M*1.75),b=-1.55+Math.sin(f)*v*M*M;for(const S of[-1,1])m.push(T+S*E,A,b+S*E*.3);if(_<y){const S=_*2;p.push(S,S+2,S+1,S+1,S+2,S+3)}}const x=new Se;x.setAttribute("position",new Kt(m,3)),x.setIndex(p),x.computeVertexNormals(),u.side=Ae,this.addStatic(this.mesh(x,u),!0)}Di=l}station(t,e){const n=new Ne;n.position.set(e[0],e[1],e[2]),n.rotation.y=e[3],n.scale.setScalar(.73),n.userData.agent=t,this.scene.add(n),this.stations.push(n);const s=this.mat("#6c4d2e",.56),r=this.mat("#b0925b"),o=this.mat("#253734",.33,.7),a=this.mat("#131d21",.5),c=this.mat("#31433b",.85);if(t>=2){const m=new Ne;m.name="branch-platform",n.add(m);for(let p=0;p<6;p++)this.box(m,s,B(0,-.06,-.76+p*.3),B(1.91,.12,.285));for(const p of[-.57,.57])this.box(m,o,B(p,-.14,-.01),B(.065,.065,1.84))}this.box(n,s,B(0,.82,-.37),B(1.65,.1,.85)),this.box(n,r,B(0,.85,.07),B(1.65,.045,.025));for(const m of[-.67,.67])for(const p of[-.65,-.07])this.box(n,o,B(m,.4,p),B(.045,.8,.045));this.box(n,a,B(0,.89,-.07),B(.57,.035,.2));for(let m=0;m<4;m++)for(let p=0;p<11;p++)this.box(n,this.mat("#85998e"),B(-.25+p*.048,.913,-.14+m*.043),B(.031,.008,.024));this.ball(n,a,B(.42,.91,-.06),B(.06,.025,.09));for(let m=0;m<2;m++){const p=m===0?-.4:.43;this.box(n,o,B(p,.94,-.59),B(.25,.035,.18)),this.box(n,o,B(p,1.1,-.7),B(.035,.3,.035));const y=new Ne;y.name="desk-monitor",y.position.set(p,1.33,-.63),y.rotation.y=m===0?.14:-.14,n.add(y),this.box(y,a,B(),B(.78,.49,.055));const x=document.createElement("canvas");x.width=640,x.height=384;const _=new zu(x);_.colorSpace=nn;const M=this.mesh(new Gn(.73,.44),new gs({map:_}),y,B(0,0,.031));M.castShadow=!1,this.monitors.push({canvas:x,texture:_,agent:t,profit:m===1})}this.box(n,c,B(0,.52,.43),B(.58,.075,.53));const l=this.box(n,c,B(0,.84,.72),B(.48,.53,.035));l.rotation.x=-.12,this.tube([B(-.34,.57,.25),B(-.37,.8,.35),B(-.37,.8,.65)],.028,o,n),this.tube([B(.34,.57,.25),B(.37,.8,.35),B(.37,.8,.65)],.028,o,n),this.tube([B(0,.12,.43),B(0,.49,.43)],.045,o,n,3);for(let m=0;m<5;m++){const p=m*2*Math.PI/5,y=Math.cos(p)*.4,x=.43+Math.sin(p)*.4;this.tube([B(0,.15,.43),B(y,.08,x)],.025,o,n,3),this.ball(n,a,B(y,.045,x),B(.055,.045,.055))}this.frog(n,t);const h=this.mat(t%2?"#82baca":"#c8b55b"),u=new Ne;u.position.set(-.66,.94,-.02),n.add(u),this.mesh(new No(.065,.055,.12,18),h,u);const d=this.mesh(new sl(.04,.012,8,16),h,u,B(-.07,.01,0));d.rotation.y=Math.PI/2;const f=this.mesh(new Ao(.054,18),this.mat("#3b2415",.3),u,B(0,.061,0));f.rotation.x=-Math.PI/2;const g=this.frogs[t].children[0].material;this.life.push(new by(t,n,this.frogs[t],this.heads[t],this.hands.slice(t*2,t*2+2),this.legs.slice(t*2,t*2+2),u,g));const v=document.createElement("button");v.className=`frog-label frog-${t}`,v.setAttribute("aria-label",`Visit ${["Mac","Cobalt","Cheese","Bluey"][t]}'s desk`),v.innerHTML=`<span class="label-dot ${t%2?"blue":"yellow"}"></span><span>${["Mac","Cobalt","Cheese","Bluey"][t]}</span><strong>—</strong><small class="frog-mood"></small>`,v.onclick=()=>this.select(t),this.host.append(v),this.bubbles.push(v)}frog(t,e){const n=e%2===1,s=new Gr({map:Ey(n),roughness:.38,clearcoat:.65,clearcoatRoughness:.27,color:n?"#9ecdf8":"#fff4b0"}),r=this.mat(n?"#6996a1":"#827b3d",.55),o=this.mat("#030c0a",.09),a=this.mat(n?"#4986b1":"#b9a22c",.3),c=new Ne;t.add(c),this.frogs.push(c),this.ball(c,s,B(0,.83,.37),B(.215,.33,.185)),this.ball(c,r,B(0,.86,.205),B(.165,.26,.055)),this.ball(c,s,B(0,1.14,.22),B(.295,.19,.235)),this.ball(c,s,B(0,1.07,.015),B(.25,.085,.14));for(const u of[-.225,.225])this.ball(c,s,B(u,1.285,.145),B(.132,.14,.13)),this.ball(c,a,B(u,1.29,.044),B(.095,.09,.065)).userData.eye=!0,this.ball(c,o,B(u,1.293,.005),B(.069,.072,.031)).userData.eye=!0,this.ball(c,new gs({color:"#f6fff3"}),B(u-.022,1.32,-.019),B(.018,.019,.008)).userData.eye=!0,this.ball(c,o,B(u*.45,1.11,-.12),B(.011,.008,.007));this.tube([B(-.25,1.04,-.045),B(0,1.013,-.12),B(.25,1.04,-.045)],.007,this.mat("#1f3426"),c,20);const l=c.children.slice(2),h=new Ne;h.position.set(0,1.14,.22),c.add(h),l.forEach(u=>h.attach(u)),this.heads.push(h);for(const u of[-1,1]){const d=c.children.length;this.ball(c,s,B(u*.215,.65,.3),B(.15,.15,.18)),this.tube([B(u*.32,.62,.22),B(u*.36,.37,.2),B(u*.29,.29,-.01)],.055,s,c,15);for(let p=0;p<3;p++){const y=u*(.22+p*.08);this.tube([B(u*.29,.29,-.01),B(y,.25,-.17),B(y+u*.03,.26,-.24)],.017,s,c,8),this.ball(c,s,B(y+u*.03,.26,-.24),B(.025,.012,.034))}const f=c.children.slice(d),g=new Ne;g.position.set(u*.215,.65,.3),c.add(g),f.forEach(p=>g.attach(p)),this.legs.push(g);const v=new Ne;v.position.set(u*.21,1,.27),c.add(v),this.hands.push(v);const m=p=>p.clone().sub(v.position);this.tube([B(u*.21,1,.27),B(u*.34,.86,.12),B(u*.21,.943,-.04)].map(m),.034,s,v,20),this.ball(v,s,m(B(u*.21,.943,-.04)),B(.065,.025,.047));for(let p=0;p<4;p++){const y=u*(.145+p*.038),x=new Ne;x.position.copy(m(B(y,.94,-.062))),v.add(x),this.tube([B(),B(u*.006,-.007,-.035),B(u*.012,-.009,-.085)],.008,s,x,7),this.ball(x,s,B(u*.012,-.009,-.085),B(.012,.007,.017)),this.fingers.push({joint:x,agent:e,hand:u,index:p})}}}drawMonitors(){for(const[t,e]of this.monitors.entries()){const n=this.info[e.agent],s=n?.positions[0]?.symbol||"SPY",r=this.charts[s]||[],o=JSON.stringify([n?.name,n?.daily_pnl,n?.active,s,r.length,r.at(-1)]);if(this.monitorKeys[t]===o)continue;this.monitorKeys[t]=o;const a=e.canvas.getContext("2d"),c=this.info[e.agent];if(a.fillStyle="#0b1a20",a.fillRect(0,0,640,384),a.fillStyle="#8da69c",a.font="20px monospace",a.fillText("TERRARIUM  /  PAPER",25,35),a.fillStyle="#25403d",a.fillRect(25,52,590,1),e.profit)a.fillStyle="#c0cfc6",a.font="22px sans-serif",a.fillText("SESSION P&L",30,105),a.fillStyle="#a8db9c",a.font="bold 66px sans-serif",a.fillText(c?.daily_pnl==null?"—":`${c.daily_pnl<0?"−":"+"}$${Math.abs(c.daily_pnl).toFixed(2)}`,30,185),a.fillStyle="#66857d",a.font="19px monospace",a.fillText(c?.active?"ORDER IN PROGRESS":"WAITING FOR SIGNAL",30,244),a.fillText(c?.name.toUpperCase()||"PAPER AGENT",30,330);else{const l=c?.positions[0]?.symbol||"SPY",h=this.charts[l]||[];a.fillStyle="#dee7dc",a.font="bold 28px sans-serif",a.fillText(l+" / DAILY",25,95),a.fillStyle="#6e9182",a.font="17px monospace",a.fillText(h.length?"HISTORICAL CLOSE · "+h[h.length-1].date:"AWAITING VERIFIED PRICE HISTORY",25,123);for(let u=0;u<4;u++)a.fillStyle="#1a3033",a.fillRect(25,160+u*45,590,1);if(h.length){const u=h.slice(-35),d=Math.min(...u.map(v=>v.low)),f=Math.max(...u.map(v=>v.high)),g=v=>320-(v-d)/Math.max(f-d,.01)*155;u.forEach((v,m)=>{a.fillStyle=v.close>=v.open?"#91c69b":"#d3a282",a.fillRect(30+m*16,g(v.high),1,g(v.low)-g(v.high)),a.fillRect(26+m*16,Math.min(g(v.open),g(v.close)),9,Math.max(2,Math.abs(g(v.open)-g(v.close))))})}else a.fillStyle="#456359",a.font="20px sans-serif",a.fillText("Research first. Then let it grow.",95,238)}e.texture.needsUpdate=!0}}setCharts(t){JSON.stringify(this.charts)!==JSON.stringify(t)&&(this.monitorKeys=[]),this.charts=t,this.drawMonitors()}update(t,e=!1){this.info=t,this.marketClosed=e,this.lastStateAt=performance.now(),this.drawMonitors(),t.forEach((n,s)=>{const r=this.bubbles[s];r.querySelector("strong").textContent=n.daily_pnl==null?"—":`${n.daily_pnl<0?"−":"+"}$${Math.abs(n.daily_pnl).toFixed(0)}`,r.classList.toggle("trading",n.active)})}restoreOccluders(){this.cameraOccluders.forEach(t=>t.visible=!0),this.cameraOccluders=[]}select(t){this.selected=t,this.lastVisibilityCamera.set(1/0,1/0,1/0),this.followAnchor=null,this.freeCamera=!1,this.restoreOccluders(),this.controls.enabled=!1,this.controls.enablePan=!1,this.controls.minDistance=.8,this.controls.maxDistance=40,this.host.dataset.cameraMode=t===null?"overview":"desk",this.bubbles.forEach(e=>{e.style.opacity=t===null?"1":"0",e.style.pointerEvents=t===null?"auto":"none"}),this.onSelect(t),t===null?(this.targetPos=this.overviewPosition(),this.targetLook=B(0,2.5,0)):this.deskView()}deskView(){if(this.selected===null)return;this.freeCamera=!1,this.controls.enabled=!1,this.restoreOccluders();const t=this.stations[this.selected];t.updateMatrixWorld(!0),this.targetPos=t.localToWorld(B(.95,2.32,1.92)),this.targetLook=t.localToWorld(B(0,1.12,-.28)),this.host.dataset.cameraMode="desk"}setFreeCamera(t){if(this.selected!==null){if(!t){this.deskView();return}this.freeCamera=!0,this.targetPos=null,this.controls.target.copy(this.life[this.selected].anchor()),this.followAnchor=this.life[this.selected].anchor(),this.controls.minAzimuthAngle=-1/0,this.controls.maxAzimuthAngle=1/0,this.controls.minPolarAngle=.12,this.controls.maxPolarAngle=Math.PI-.12,this.controls.minDistance=.45,this.controls.maxDistance=4,this.controls.enablePan=!0,this.controls.panSpeed=.55,this.controls.rotateSpeed=.65,this.controls.enabled=!0,this.controls.update(),this.host.dataset.cameraMode="free"}}clearCameraSightline(){if(this.restoreOccluders(),this.selected===null)return;const t=this.stations[this.selected],e=this.life[this.selected],n=e.hunter.visible?e.hunter:e.seated,s=e.hunter.visible?[B(0,.3,.12),B(-.32,.16,.35),B(.32,.16,.35),B(-.3,.05,-.25),B(.3,.05,-.25)]:[B(0,.83,.37),B(-.24,.65,.3),B(.24,.65,.3)],r=[t.worldToLocal(e.anchor()),...s.map(o=>t.worldToLocal(n.localToWorld(o))),B(-.4,1.33,-.6),B(.43,1.33,-.6)];for(const o of r){const a=t.localToWorld(o),c=a.clone().sub(this.camera.position),l=c.length();this.raycaster.set(this.camera.position,c.normalize()),this.raycaster.far=Math.max(0,l-.08);for(const h of this.raycaster.intersectObjects(this.occluders.filter(u=>u.visible),!1))h.object.visible&&(h.object.visible=!1,this.cameraOccluders.push(h.object))}if(this.freeCamera){const o=t.children.filter(l=>l.name==="desk-monitor"),a=this.life[this.selected],c=a.hunter.visible?a.head:a.seatedHead;for(const l of[B(0,0,-.2),B(-.225,.15,-.2),B(.225,.15,-.2),B(0,-.1,-.26),B(-.25,-.05,-.2),B(.25,-.05,-.2)]){const h=c.localToWorld(l),u=h.clone().sub(this.camera.position);this.raycaster.set(this.camera.position,u.clone().normalize()),this.raycaster.far=u.length()-.02;for(const d of o)d.visible&&this.raycaster.intersectObject(d,!0).length&&(d.visible=!1,this.cameraOccluders.push(d))}}this.raycaster.far=1/0,this.lastVisibilityCamera.copy(this.camera.position),this.lastVisibilityTarget.copy(this.controls.target),this.lastVisibilityAnchor.copy(this.life[this.selected].anchor())}click=t=>{if(this.selected!==null)return;const e=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-e.left)/e.width*2-1,-(t.clientY-e.top)/e.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.stations,!0);if(n.length){let s=n[0].object;for(;s&&s.userData.agent===void 0;)s=s.parent;s&&this.select(s.userData.agent)}};overviewPosition(){const t=Math.max(12.6,4.35/(Math.tan(cr.degToRad(this.camera.fov/2))*this.camera.aspect));return B(0,2.5+t*.127,t)}applyRenderBudget(){this.host.dataset.renderTier=String(this.budget.tier);const t=this.budget.tier===0?this.mossSimple:this.mossDetailed;this.wallMoss.geometry!==t&&(this.wallMoss.geometry=t);const e=this.budget.pixelRatio(window.devicePixelRatio,this.viewportWidth,this.viewportHeight);Math.abs(this.renderer.getPixelRatio()-e)>.02&&this.renderer.setPixelRatio(e);const n=this.budget.tier>0;if(this.renderer.shadowMap.enabled!==n){this.renderer.shadowMap.enabled=n,this.renderer.shadowMap.needsUpdate=!0;const s=new Set;this.scene.traverse(r=>{if(r instanceof he)for(const o of Array.isArray(r.material)?r.material:[r.material])s.add(o)}),s.forEach(r=>r.needsUpdate=!0)}}resize=()=>{const t=this.host.clientWidth,e=this.host.clientHeight;if(!t||!e)return;const n=t!==this.viewportWidth||e!==this.viewportHeight;this.viewportWidth=t,this.viewportHeight=e,this.applyRenderBudget(),n&&(this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.selected===null&&(this.camera.position.copy(this.overviewPosition()),this.controls.target.set(0,2.5,0),this.targetPos=null),this.renderer.setSize(t,e))};tick=()=>{if(this.disposed)return;if(this.frame=requestAnimationFrame(this.tick),document.hidden||!this.host.offsetParent){this.clock.getDelta();return}const t=this.clock.getDelta(),e=this.clock.elapsedTime;this.budget.sample(t)&&this.applyRenderBudget(),this.targetPos&&(this.camera.position.lerp(this.targetPos,1-Math.exp(-t*3)),this.controls.target.lerp(this.targetLook,1-Math.exp(-t*3)),this.camera.position.distanceTo(this.targetPos)<.006&&this.controls.target.distanceTo(this.targetLook)<.006&&(this.camera.position.copy(this.targetPos),this.controls.target.copy(this.targetLook),this.targetPos=null)),this.controls.update(),this.lifeTime+=Math.min(t,.25);const n=this.marketClosed&&performance.now()-this.lastStateAt<2e4,s=this.director.step(t,n,this.info.map(a=>a.active));if(this.frogs.forEach((a,c)=>{a.scale.y=1+Math.sin(e*1.4+c)*.007;const l=this.info[c]?.active,h=l?9:4.2,u=l?.036:.02;for(let d=0;d<2;d++){const f=this.hands[c*2+d],g=e*h+c*1.7+d*Math.PI;f.position.y=1+(s[c].action==="desk"?Math.max(0,Math.sin(g))*u:0),f.rotation.set(Math.sin(g)*.022,0,0)}}),this.fingers.forEach(({joint:a,agent:c,hand:l,index:h})=>{const u=this.info[c]?.active?15:6;a.rotation.x=s[c].action==="desk"?-Math.max(0,Math.sin(e*u+c*1.3+l*1.1+h*.85))*.19:0}),this.life.forEach((a,c)=>{const l=s[c];a.tick(l.action,l.elapsed,l.duration,this.lifeTime,n&&this.info[c]?.active===!1);const h=this.bubbles[c],u=h.querySelector(".frog-mood"),d=l.action==="desk"?"":vd[l.action];u.textContent!==d&&(u.textContent=d),h.dataset.activity=l.action}),this.selected!==null){const a=this.life[this.selected],c=a.anchor();if(this.freeCamera&&this.followAnchor){const l=c.clone().sub(this.followAnchor);this.camera.position.add(l),this.controls.target.add(l),this.followAnchor.copy(c)}else s[this.selected].action==="hunt"?(this.targetLook.copy(c),this.targetPos=c.clone().add(B(.75,.95,1.65).applyQuaternion(this.stations[this.selected].quaternion))):a.lastAction==="desk"&&this.host.dataset.followingHunt==="true"&&this.deskView();this.host.dataset.followingHunt=String(s[this.selected].action==="hunt")}for(let a=0;a<this.wallDrops.count;a++)My(a,e,this.wallSample),this.dropletTransform.position.set(this.wallSample[0],this.wallSample[1],this.wallSample[2]),this.dropletTransform.scale.set(this.wallSample[3],this.wallSample[4],this.wallSample[3]*.7),this.dropletTransform.updateMatrix(),this.wallDrops.setMatrixAt(a,this.dropletTransform.matrix);this.wallDrops.instanceMatrix.needsUpdate=!0;const r=Math.sqrt(2*(Mn[1]-.06)/au);for(let a=0;a<this.drops.count;a++){const c=(e+a*bi)%(this.drops.count*bi),l=c<r;this.dropletTransform.position.set(Mn[0],Mn[1]-.5*au*c*c,Mn[2]),this.dropletTransform.scale.set(l?.75:0,l?1.15+c*.22:0,l?.75:0),this.dropletTransform.updateMatrix(),this.drops.setMatrixAt(a,this.dropletTransform.matrix)}this.drops.instanceMatrix.needsUpdate=!0;const o=e%bi/bi;this.dripBud.scale.set(.012+o*.011,.016+o*.024,.012+o*.011),this.ripples.forEach((a,c)=>{const h=((e-r+bi*10)%bi/bi+c*.25)%1;a.scale.setScalar(.4+h*4.8),a.material.opacity=(1-h)*.28}),this.selected!==null&&e-this.occlusionTimer>.1&&(this.camera.position.distanceToSquared(this.lastVisibilityCamera)>2e-4||this.controls.target.distanceToSquared(this.lastVisibilityTarget)>2e-4||this.life[this.selected].anchor().distanceToSquared(this.lastVisibilityAnchor)>2e-4)&&(this.clearCameraSightline(),this.occlusionTimer=e),this.selected===null&&e-this.labelTime>1/30&&(this.labelTime=e,this.bubbles.forEach((a,c)=>{const l=this.life[c].anchor().add(B(0,.48,0));l.project(this.camera),a.style.transform=`translate(-50%,-50%) translate(${(l.x*.5+.5)*this.viewportWidth}px,${(-l.y*.5+.5)*this.viewportHeight}px)`})),this.renderer.shadowMap.enabled&&e-this.shadowTime>1/12&&(this.renderer.shadowMap.needsUpdate=!0,this.shadowTime=e),this.renderer.render(this.scene,this.camera)}}let Ft=null,hr=null,Gc="habitat",En,Va=!1,lu=!1;const Is=()=>{document.querySelectorAll("svg[data-lucide]").forEach(i=>i.removeAttribute("data-lucide")),Qd({icons:{Leaf:zd,ArrowUpRight:Cd,ArrowRight:Rd,Play:Gd,Pause:Vd,Settings2:qd,ChevronRight:Dd,Maximize2:kd,Sprout:$d,FlaskConical:Od,LayoutDashboard:Bd,ChartNoAxesCombined:Pd,X:Jd,Volume2:Kd,VolumeX:Zd,ArrowLeft:Ad,Download:Nd,CircleHelp:Ld,RefreshCw:Wd,Check:Id,Clock3:Ud,ShieldCheck:Yd,ExternalLink:Fd,ScanEye:Xd,Menu:Hd,Sun:jd}})},Tt=i=>document.querySelector(i),ge=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Io=(i,t=!1)=>i==null?"—":`${t&&i>=0?"+":""}${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(i)}`,fo=i=>`${(i*100).toFixed(2)}%`,hu=(i=!1)=>`<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="skin${i?"b":"y"}"><stop stop-color="${i?"#65c6ef":"#f4d766"}"/><stop offset="1" stop-color="${i?"#227ac1":"#b0a037"}"/></radialGradient></defs><ellipse cx="32" cy="41" rx="25" ry="16" fill="url(#skin${i?"b":"y"})"/><circle cx="18" cy="26" r="12" fill="${i?"#368cbd":"#c3ad38"}"/><circle cx="46" cy="26" r="12" fill="${i?"#368cbd":"#c3ad38"}"/><circle cx="18" cy="25" r="7" fill="#102b27"/><circle cx="46" cy="25" r="7" fill="#102b27"/><circle cx="16" cy="23" r="2" fill="#fff"/><circle cx="44" cy="23" r="2" fill="#fff"/><path d="M21 43q11 8 22 0" fill="none" stroke="#213d30" stroke-width="2"/>${i?'<circle cx="15" cy="40" r="3" fill="#183a4d"/><circle cx="47" cy="42" r="4" fill="#183a4d"/><circle cx="34" cy="34" r="3" fill="#183a4d"/>':'<path d="M26 30l5 9 5-9M10 37l5 12M52 36l-4 14" stroke="#273629" stroke-width="5" fill="none"/>'}</svg>`;Tt("#app").innerHTML=`
<aside class="sidebar">
 <a class="brand" href="#" aria-label="Terrarium home"><img src="/favicon.svg" alt=""/><span>terrarium<span class="brand-dot">.</span></span></a>
 <div class="workspace"><div class="workspace-icon"><i data-lucide="sprout"></i></div><div><strong>Your little ecosystem</strong><small>Personal workspace</small></div><span class="kbd">⌘ K</span></div>
 <div class="nav-caption">WORKSPACE</div>
 <nav><button class="nav-item active" data-view="habitat"><i data-lucide="layout-dashboard"></i> The habitat <span class="nav-count">4</span></button><button class="nav-item" data-view="research"><i data-lucide="flask-conical"></i> Strategy lab <span class="tiny-dot"></span></button><button class="nav-item" data-view="activity"><i data-lucide="chart-no-axes-combined"></i> Trading journal</button></nav>
 <div class="sidebar-rule"></div><div class="nav-caption team-caption">YOUR RESIDENTS <span>04</span></div><div id="resident-list"></div>
 <div class="field-note"><div class="field-note-icon"><i data-lucide="leaf"></i></div><p>A little patience.<br>A lot of possibility.</p><span>Built to grow, one day at a time.</span><div class="note-vine">⌁</div></div>
 <div class="sidebar-bottom"><button id="settings-nav"><i data-lucide="settings-2"></i> Connection & settings</button><div class="user"><div class="avatar">H</div><div><strong>Hueyn's terrarium</strong><small>Paper trading workspace</small></div><span class="online-dot"></span></div></div>
</aside>
<div class="main-shell"><header class="topbar"><div class="breadcrumb"><span>Workspace</span><i data-lucide="chevron-right"></i><strong id="breadcrumb-current">The habitat</strong></div><div class="topbar-right"><span class="paper-tag"><i data-lucide="shield-check"></i> PAPER ENVIRONMENT</span><button class="icon-button" id="help" aria-label="About this workspace"><i data-lucide="circle-help"></i></button><div class="avatar small">H</div></div></header>
<main>
 <section class="page-heading"><div><div class="eyebrow"><span class="little-sun">✳</span> A SMALL WORLD. A LONG VIEW.</div><h1 id="page-title">Welcome to the habitat<span>.</span></h1><p id="page-description">Four curious minds. One thriving ecosystem. Let’s see what grows.</p></div><div class="heading-actions"><div class="market-state"><span class="status-dot"></span><span id="market-status">Not connected</span><small id="market-clock">US EQUITIES · NEW YORK</small></div><button class="primary-button" id="trade-button"><i data-lucide="play"></i><span>Start paper trading</span></button></div></section>
 <div id="connection-banner" class="notice"><i data-lucide="sprout"></i><span><strong>Make yourself at home.</strong> Connect your paper account and run the strategy tournament to wake up your residents.</span><button id="setup-open">Set up workspace <i data-lucide="arrow-right"></i></button></div>
 <section class="stats"><article><div class="stat-title">Today's ecosystem P&L <i data-lucide="arrow-up-right"></i></div><div class="stat-value" id="daily-pnl">—<span>USD</span></div><div class="stat-foot"><span class="pill muted" id="pnl-context">Awaiting first session</span><span>across all residents</span></div></article><article><div class="stat-title">Paper portfolio <i data-lucide="chart-no-axes-combined"></i></div><div class="stat-value" id="portfolio">—<span>USD</span></div><div class="stat-foot"><span class="mini-dot"></span><span id="portfolio-note">Your connected allocation</span></div></article><article><div class="stat-title">Residents at work <i data-lucide="sprout"></i></div><div class="stat-value" id="active-count">0<span>/ 4</span></div><div class="stat-foot"><div class="four-dots"><b></b><b></b><b></b><b></b></div><span id="resident-context">Enjoying a quiet moment</span></div></article><article><div class="stat-title">Research candidates <i data-lucide="flask-conical"></i></div><div class="stat-value">1,200<span>CONFIGS</span></div><div class="stat-foot"><span class="pill">20 families</span><span id="research-context">120 batches of 10</span></div></article></section>
 <section id="habitat-view"><div class="habitat-card"><div class="habitat-toolbar"><div><span class="online-dot"></span><strong>The living room</strong><span class="toolbar-sub">A window into your ecosystem</span></div><div class="habitat-tools"><span class="scene-tag">INTERACTIVE 3D</span><button class="music-settings" id="music-settings" aria-expanded="false" aria-controls="music-panel">Music</button><button class="icon-button" id="sound" aria-label="Play music" aria-pressed="false"><i data-lucide="volume-x"></i></button><div id="music-panel" class="music-panel" role="region" aria-label="Terrarium music" hidden><div class="music-heading"><strong>A softer soundtrack</strong><span>Take a little breather.</span></div><label for="music-track">Soundtrack</label><select id="music-track"><option value="jazz">Soft jazz</option><option value="piano">Quiet piano</option></select><div class="music-volume-label"><label for="music-volume">Volume</label><output id="music-volume-value" for="music-volume">30%</output></div><input id="music-volume" aria-label="Music volume" type="range" min="0" max="100" step="1" value="30"><button id="music-play" class="primary-button" type="button">Play music</button><p id="music-status" role="status">Paused</p></div><button class="icon-button" id="fullscreen" aria-label="Expand terrarium"><i data-lucide="maximize-2"></i></button></div></div>
 <div id="habitat"><div class="habitat-vignette"></div><div class="scene-heading"><span class="scene-eyebrow">TERRARIUM NO. 001</span><h2>A place to grow.</h2><p>Small residents. Thoughtful decisions.</p></div><div class="scene-weather"><i data-lucide="sun"></i><span>24°<small>HABITAT AMBIENCE · ILLUSTRATIVE</small></span></div><div class="scene-bottom"><span><i data-lucide="scan-eye"></i> Click a resident to visit their desk</span><span class="scene-mode"><b></b> <span id="scene-mode-text">Habitat preview · no trading activity</span></span></div><button id="back-habitat" class="back-button hidden"><i data-lucide="arrow-left"></i> Back to the habitat</button><div id="desk-camera-controls" class="desk-camera-controls hidden"><button id="free-camera" aria-pressed="false"><i data-lucide="scan-eye"></i><span>Free camera</span></button><p id="camera-hint">Explore your resident’s desk from every angle.</p></div><div id="selected-card" class="selected-card hidden"></div><div class="loading-scene"><span class="loading-leaf">✳</span> Growing your habitat…</div></div>
 <div class="habitat-footer"><div><span class="small-leaf">❧</span> A little nature. A little nurture. A smarter way to watch your strategies.</div><span>DAILY SIGNALS <b>·</b> LONG ONLY <b>·</b> PAPER TRADING</span></div></div>
 <div class="section-heading"><div><h2>Meet your residents <span>04</span></h2><p>Different personalities. A shared sense of purpose.</p></div><button class="text-button" id="view-strategies">Explore the strategy lab <i data-lucide="arrow-up-right"></i></button></div><div class="agent-cards" id="agent-cards"></div>
 <div class="bottom-row"><div class="journal-preview"><div class="section-heading compact"><h2>Around the habitat</h2><span class="subtle">RECENT ACTIVITY</span></div><div id="activity-preview"><div class="empty-activity"><span>☷</span><div><strong>It’s peaceful in here.</strong><p>Your residents’ confirmed trades will appear here.</p></div><span class="soft-label">All settled</span></div></div></div><div class="daily-routine"><div class="routine-icon"><i data-lucide="clock-3"></i></div><div><h3>A fresh start, every morning.</h3><p>Enable the daily schedule to let your residents wake up when the market opens.</p><button id="schedule-open" class="text-button">Set your morning routine <i data-lucide="arrow-right"></i></button></div></div></div>
 </section>
 <section id="research-view" class="hidden content-panel"></section><section id="activity-view" class="hidden content-panel"></section>
 <footer class="page-footer"><span>Made for the long view. <span class="footer-leaf">❧</span></span><span>Paper trading only. Historical performance does not predict future returns.</span></footer>
</main></div><div id="toast" role="status" class="toast hidden"></div><dialog id="settings-dialog"><form id="connect-form"><button type="button" class="dialog-close icon-button" aria-label="Close settings"><i data-lucide="x"></i></button><div class="dialog-icon"><i data-lucide="sprout"></i></div><div class="eyebrow">YOUR WORKSPACE</div><h2>Bring your habitat to life.</h2><p>Connect a dedicated Alpaca <strong>paper</strong> account. Keys are used by the local server and held in memory for this session.</p><label>Paper API key<input name="key" type="password" autocomplete="off" placeholder="Alpaca paper API key" required minlength="8"/></label><label>Paper secret key<input name="secret" type="password" autocomplete="off" placeholder="Alpaca paper secret key" required minlength="8"/></label><button type="submit" class="primary-button"><i data-lucide="shield-check"></i> Connect paper account</button><div class="dialog-divider"></div><label class="switch-row"><div><strong>A fresh start, every morning</strong><span>Start on market open while this server is running.</span></div><input id="schedule-toggle" type="checkbox" role="switch"/></label><p class="small-note">The first connection needs an empty paper account. Each resident receives 20% of available paper cash, up to $10,000. The rest stays in reserve. For persistent keys, use environment settings.</p><div id="connect-status" role="status"></div></form></dialog><dialog id="help-dialog"><button class="dialog-close icon-button" aria-label="Close help"><i data-lucide="x"></i></button><div class="eyebrow">FIELD NOTES</div><h2>A thoughtfully tested ecosystem.</h2><p>Terrarium tests 1,200 configurations across 20 strategy families in 120 batches. Each trade is simulated at the next open with 10 basis points of costs per side.</p><p>The winner is selected using a validation year. Four finalists are frozen before the final holdout year is examined. No historical winner is available until real, complete market data has passed validation.</p><p>The habitat is a modeled interpretation of your photo. Select a resident and choose Free camera to orbit, zoom, and pan. Typing and off-duty routines are decorative. When the market is closed, resting residents independently nap, stretch, drink coffee, or hunt tiny crawling fruit flies. They return to work when the market opens or an order becomes active; trading status always reflects actual orders. Monitor charts display the verified daily history of the resident’s first held ETF; empty monitors show no invented prices. Profit figures come only from the paper ledger. Daily P&L starts from the first recorded valuation of that session; displayed values carry the last quote timestamp.</p><p>Pausing cancels pending managed orders and leaves existing positions open. Your computer or cloud service must remain running for the morning schedule.</p></dialog>`;function pr(){return["Mac","Cobalt","Cheese","Bluey"].map((i,t)=>({id:t,name:i,species:t%2?"Blue poison dart":"Yellow-banded",strategy:null,cash:null,equity:null,daily_pnl:null,total_pnl:null,positions:[],active:!1}))}let uu="",du="";function fl(){const i=Ft?.agents||pr(),t=JSON.stringify([i,hr,Ft?.armed,Ft?.market_open,Ft?.tournament?.finalists]);t!==uu&&(uu=t,Tt("#resident-list").innerHTML=i.map(e=>`<button class="resident-nav ${hr===e.id?"selected":""}" data-agent="${e.id}"><span class="frog-avatar ${e.id%2?"blue":"yellow"}">${hu(!!(e.id%2))}</span><span><strong>${e.name}</strong><small>${e.active?"At the desk":"Taking it slow"}</small></span><span class="resident-dot ${e.active?"active":""}"></span></button>`).join(""),Tt("#agent-cards").innerHTML=i.map(e=>`<button class="agent-card ${e.id%2?"blue":"yellow"}" data-agent="${e.id}"><div class="agent-top"><span class="frog-portrait">${hu(!!(e.id%2))}</span><span class="agent-status"><b></b>${e.active?"Trading":Ft?.armed&&Ft?.market_open?"Watching":"Resting"}</span></div><div class="agent-name"><h3>${e.name}</h3><i data-lucide="arrow-up-right"></i></div><span class="species">${e.species} dart frog</span><div class="strategy-label">${ge(e.strategy?.name||(Ft?.tournament?.finalists[[0,1,0,2][e.id]]?.name?"Proposed: "+Ft.tournament.finalists[[0,1,0,2][e.id]].name:"Strategy awaiting research"))}</div><div class="agent-bottom"><span>Today's P&L</span><strong>${Io(e.daily_pnl,!0)}</strong></div></button>`).join(""),document.querySelectorAll("[data-agent]").forEach(e=>e.addEventListener("click",()=>{ko("habitat"),En.select(Number(e.dataset.agent))})),Is())}function ko(i){Gc=i,document.querySelectorAll("[data-view]").forEach(t=>t.classList.toggle("active",t.dataset.view===i));for(const t of["habitat","research","activity"])Tt(`#${t}-view`).classList.toggle("hidden",t!==i);Tt("#breadcrumb-current").textContent=i==="habitat"?"The habitat":i==="research"?"Strategy lab":"Trading journal",Tt("#page-title").innerHTML=i==="habitat"?"Welcome to the habitat<span>.</span>":i==="research"?"Good ideas need good evidence<span>.</span>":"Every little move, recorded<span>.</span>",Tt("#page-description").textContent=i==="habitat"?"Four curious minds. One thriving ecosystem. Let’s see what grows.":i==="research"?"A reproducible tournament. A separate evaluation period. Room for healthy skepticism.":"Confirmed orders, fills, and the daily rhythm of your ecosystem.",i==="research"&&od(),i==="activity"&&ad(),i==="habitat"&&En?.resize()}function wy(i){const t=i.equity_curves,e=t.flatMap(l=>l.points.map(h=>h[1])),n=Math.min(...e)*.96,s=Math.max(...e)*1.04,r=["#a1a795","#507e57","#b6a05e","#6b9ca6","#b58f7d"],o=l=>225-(l-n)/(s-n)*190,a=[0,.25,.5,.75,1].map(l=>{const h=n+(s-n)*l;return`<line x1="60" y1="${o(h)}" x2="880" y2="${o(h)}" stroke="#e5ebdd"/><text x="6" y="${o(h)+3}" fill="#97a48a" font-size="10">$${(h/1e3).toFixed(0)}k</text>`}).join(""),c=t.map((l,h)=>`<path d="${l.points.map((u,d)=>`${d?"L":"M"}${(60+d/(l.points.length-1)*820).toFixed(2)},${o(u[1]).toFixed(2)}`).join(" ")}" fill="none" stroke="${r[h]}" stroke-width="${h===1?2.5:1.5}" opacity="${h===1?1:.7}"><title>${ge(l.name)}</title></path>`).join("");return`<div class="equity-panel"><h3>Growth of $100,000 <span>HISTORICAL SIMULATION</span></h3><svg viewBox="0 0 900 255" role="img" aria-label="Five-year simulated equity curves for four validation finalists and SPY">${a}${c}<text x="60" y="250" font-size="10" fill="#97a48a">${ge(i.periods.start)}</text><text x="800" y="250" font-size="10" fill="#97a48a">${ge(i.periods.end)}</text></svg><div class="chart-legend">${t.map((l,h)=>`<span><b style="background:${r[h]}"></b>${ge(l.name)}</span>`).join("")}</div></div>`}function od(){const i=Ft?.tournament,t=Ft?.research;Tt("#research-view").innerHTML=`<div class="panel-heading"><div><span class="eyebrow">RESEARCH WORKBENCH</span><h2>${i?"The tournament results":"Let the evidence grow."}</h2><p>10 liquid ETFs · daily signals · 5 years · next-open execution · 10 bps per side</p></div><button class="primary-button" id="run-research" ${t?.running?"disabled":""}><i data-lucide="${t?.running?"refresh-cw":"play"}"></i>${t?.running?`Testing ${t.completed} / ${t.total}`:"Run historical tournament"}</button></div>${t?.error?`<div class="error-box">${ge(t.error)}</div>`:""}<div class="research-steps"><div><b>01</b><strong>Training</strong><span>First 3 years. Diagnostics and warm-up.</span></div><div><b>02</b><strong>Tournament</strong><span>Year 4. Rank all configurations by net returns.</span></div><div><b>03</b><strong>Holdout</strong><span>Year 5. Evaluate the four frozen finalists.</span></div></div>${i?`<div class="result-heading"><span class="pill">HISTORICAL DATA</span><p>${ge(i.periods.start)} → ${ge(i.periods.end)} · ${i.unique_signal_paths} distinct signal paths</p></div><h3>Validation champion: ${ge(i.champion)}</h3><div class="table-wrap"><table><thead><tr><th>Frozen finalist</th><th>Validation return</th><th>Holdout return</th><th>Holdout drawdown</th><th>Holdout Sharpe</th></tr></thead><tbody>${i.finalists.map(e=>`<tr><td><strong>${ge(e.name)}</strong><small>${ge(e.id)}</small></td><td>${fo(e.validation.net_return)}</td><td>${fo(e.holdout.net_return)}</td><td>${fo(e.holdout.max_drawdown)}</td><td>${e.holdout.sharpe.toFixed(2)}</td></tr>`).join("")}</tbody></table></div>${wy(i)}<p>SPY holdout return: <strong>${fo(i.benchmark.holdout.net_return)}</strong>. Finalists are not re-ranked using the holdout.</p><p class="retrospective-note">Full-window hindsight leader: <strong>${ge(i.retrospective_champion)}</strong>. This uses all five years and is not the deployment selection.</p><a class="text-button" href="/api/report" download><i data-lucide="download"></i> Download full reproducibility report</a><div class="limitations">${i.limitations.map(e=>`<p>${ge(e)}</p>`).join("")}</div>`:`<div class="research-empty"><div class="research-orbit"><i data-lucide="flask-conical"></i><span>1,200</span></div><h3>No historical winner has been selected.</h3><p>Run the tournament to download complete, adjusted history and compare all 120 batches. If your environment blocks the data provider, enable the required network access first.</p><span class="soft-label">20 strategy families · 1,200 parameter configurations</span></div><div class="family-tags">${["Trend following","Absolute momentum","Relative momentum","Dual momentum","Channel breakout","Mean reversion","Risk parity","Low volatility","Drawdown recovery","Trend quality"].map(e=>`<span>${e}</span>`).join("")}</div>`}`,Tt("#run-research")?.addEventListener("click",async()=>{await Ho("/api/research",{}),await Ds()}),Is()}function ad(){const i=Ft?.events||[],t=Ft?.orders||[];Tt("#activity-view").innerHTML=`<div class="panel-heading"><div><span class="eyebrow">THE TRADING JOURNAL</span><h2>Every action has a record.</h2><p>Order intents are saved before submission. Only confirmed fills change resident balances.</p></div><span class="pill">${t.length} recent orders</span></div>${t.length?`<div class="table-wrap"><table><thead><tr><th>Resident</th><th>Symbol</th><th>Side</th><th>Quantity</th><th>Filled</th><th>Status</th></tr></thead><tbody>${t.map(e=>`<tr><td>${ge(pr()[e.agent].name)}</td><td>${ge(e.symbol)}</td><td>${ge(e.side)}</td><td>${e.qty}</td><td>${e.filled}</td><td>${ge(e.status)}</td></tr>`).join("")}</tbody></table></div>`:'<div class="research-empty"><i data-lucide="leaf"></i><h3>A clean page. A fresh start.</h3><p>Your paper orders will appear here once the residents begin trading.</p></div>'}<h3>Activity log</h3><div class="event-list">${i.length?i.map(e=>`<div><span>${ge(new Date(e.time).toLocaleString())}</span><p>${ge(e.message)}</p></div>`).join(""):'<p class="subtle">No activity yet.</p>'}</div>`,Is()}function Ay(){if(!Ft)return;const i=Ft.agents.map(n=>n.daily_pnl).filter(n=>n!==null),t=Ft.agents.map(n=>n.equity).filter(n=>n!==null);Tt("#daily-pnl").innerHTML=`${Io(i.length?i.reduce((n,s)=>n+s,0):null)}<span>USD</span>`,Tt("#portfolio").innerHTML=`${Io(t.length?t.reduce((n,s)=>n+s,0):null)}<span>USD</span>`,Tt("#market-status").textContent=Ft.credentials_present?Ft.market_clock_fresh?Ft.market_open?"Market open":"Market closed":"Checking market clock":"Not connected",Tt(".market-state").classList.toggle("open",Ft.market_clock_fresh&&Ft.market_open),Tt("#active-count").innerHTML=`${Ft.agents.filter(n=>n.active).length}<span>/ 4</span>`,Tt("#trade-button").innerHTML=`<i data-lucide="${Ft.armed?"pause":"play"}"></i><span>${Ft.armed?"Pause residents":"Start paper trading"}</span>`,Tt("#scene-mode-text").textContent=Ft.armed?"Paper agents watching the market":"Habitat preview · no trading activity",Tt("#pnl-context").textContent=i.length?"Since session baseline":"Awaiting first session",Tt("#portfolio-note").textContent=Ft.last_quote?`Valued ${new Date(Ft.last_quote).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:"Your connected allocation",Tt("#connection-banner").classList.toggle("hidden",Ft.credentials_present&&!!Ft.tournament&&!Ft.error),Tt("#connection-banner span").textContent=Ft.error||(Ft.tournament?"The tournament is complete. Connect your Alpaca paper account to deploy your residents.":"Make yourself at home. Connect your paper account and run the strategy tournament to wake up your residents."),Tt("#schedule-toggle").checked=Ft.schedule,fl();const e=Md(Ft);En?.update(Ft.agents,e.allowed),Tt("#resident-context").textContent=e.allowed&&Ft.agents.every(n=>n.active)?"Active orders · at the desks":e.label,Gc==="research"&&od(),Gc==="activity"&&ad(),Ft.events.length&&(Tt("#activity-preview").innerHTML=Ft.events.slice(0,3).map(n=>`<div class="recent-event"><span class="mini-dot"></span><p>${ge(n.message)}</p><small>${ge(new Date(n.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}</small></div>`).join("")),hr!==null&&cd(hr),Is()}function cd(i){const t=(Ft?.agents||pr())[i],e=JSON.stringify(t);e!==du&&(du=e,Tt("#selected-card").innerHTML=`<span class="eyebrow">AT ${t.name.toUpperCase()}'S DESK</span><h3>${t.name}<span class="pill">${t.active?"Trading":"Resting"}</span></h3><p>${ge(t.strategy?.name||"Waiting for the research tournament")}</p><div class="selected-profit"><span>Session P&L</span><strong>${Io(t.daily_pnl,!0)}</strong></div><small>${t.positions.length?t.positions.map(n=>`${ge(n.symbol)} · ${n.qty.toFixed(4)} shares`).join(" / "):"No positions yet. A little room to grow."}</small>`)}function Ry(i){hr=i,Tt("#back-habitat").classList.toggle("hidden",i===null),Tt("#selected-card").classList.toggle("hidden",i===null),Tt("#desk-camera-controls").classList.toggle("hidden",i===null),ld(!1),Tt(".scene-heading").classList.toggle("hidden",i!==null),Tt(".scene-weather").classList.toggle("hidden",i!==null),Tt(".scene-bottom").classList.toggle("hidden",i!==null),i!==null&&cd(i),fl()}function pl(i){Tt("#toast").textContent=i,Tt("#toast").classList.remove("hidden"),window.setTimeout(()=>Tt("#toast").classList.add("hidden"),6e3)}async function Ds(){try{const i=await fetch("/api/state");if(!i.ok)throw new Error("Backend unavailable");Ft=await i.json(),lu=!0,Ay()}catch{lu=!1,En?.update(Ft?.agents||pr(),!1),Tt("#market-status").textContent="Server offline",Tt("#resident-context").textContent="Waiting for the local server"}}async function Ho(i,t){if(!Va){Va=!0;try{if(!Ft)throw new Error("The local trading server is not connected. Start it before using this control.");const e=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","X-Terrarium-Token":Ft.csrf},body:JSON.stringify(t)}),n=await e.json();if(!e.ok)throw new Error(typeof n.detail=="string"?n.detail:"Request failed");return n}catch(e){return pl(e.message),null}finally{Va=!1}}}function Vo(){Tt("#settings-dialog").showModal()}document.querySelectorAll("[data-view]").forEach(i=>i.addEventListener("click",()=>ko(i.dataset.view)));Tt("#settings-nav").onclick=Vo;Tt("#setup-open").onclick=Vo;Tt("#schedule-open").onclick=Vo;Tt("#view-strategies").onclick=()=>ko("research");Tt("#help").onclick=()=>Tt("#help-dialog").showModal();document.querySelectorAll(".dialog-close").forEach(i=>i.addEventListener("click",()=>i.closest("dialog").close()));Tt("#connect-form").addEventListener("submit",async i=>{i.preventDefault();const t=i.target,e=new FormData(t);await Ho("/api/connect",{key:e.get("key"),secret:e.get("secret")})&&(t.reset(),Tt("#connect-status").textContent="Connected to Alpaca paper trading. Your keys are held for this server session.",await Ds())});Tt("#schedule-toggle").onchange=async i=>{const t=i.target.checked;await Ho(t?"/api/start":"/api/stop",t?{schedule:!0}:{})||(i.target.checked=!t),await Ds()};Tt("#trade-button").onclick=async()=>{if(!Ft?.credentials_present){Vo();return}if(!Ft.tournament){ko("research"),pl("Complete the historical tournament before starting your residents.");return}await Ho(Ft.armed?"/api/stop":"/api/start",{schedule:!1}),await Ds()};function ld(i){Tt("#free-camera").setAttribute("aria-pressed",String(i)),Tt("#free-camera span").textContent=i?"Return to desk view":"Free camera",Tt("#camera-hint").textContent=i?"Drag to orbit 360° · scroll or pinch to zoom · right-drag to pan":"Explore your resident’s desk from every angle."}Tt("#free-camera").onclick=()=>{En.setFreeCamera(!En.freeCamera),ld(En.freeCamera)};Tt("#back-habitat").onclick=()=>En.select(null);Tt("#fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await Tt(".habitat-card").requestFullscreen()}catch{pl("Your browser could not expand the habitat.")}};_d(Is);fl();Is();requestAnimationFrame(()=>{try{En=new Ty(Tt("#habitat"),Ry),En.update(pr()),Tt(".loading-scene").remove()}catch(i){Tt(".loading-scene").innerHTML="<span>3D rendering is unavailable. Enable WebGL or hardware acceleration.<br>You can still use the strategy lab and trading controls.</span>",console.error(i)}Ds()});setInterval(Ds,5e3);async function hd(){try{const i=await fetch("/api/charts");if(i.ok){const t=await i.json();En?.setCharts(t.series||{})}}catch{}}setTimeout(hd,1500);setInterval(hd,6e4);
