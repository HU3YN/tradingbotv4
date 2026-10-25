/** Local, streamed music: no synthesis or work in the habitat's animation loop. */
export function setupMusic(refreshIcons:()=>void){
 const tracks={jazz:{file:'soft-jazz.mp3',label:'Soft jazz'},piano:{file:'quiet-piano.mp3',label:'Quiet piano'}};
 type Track=keyof typeof tracks;
 const storageKey='terrarium-music-v1';
 let track:Track='jazz',volume=.3;
 try{
  const saved=JSON.parse(localStorage.getItem(storageKey)||'null');
  if(saved?.track==='jazz'||saved?.track==='piano')track=saved.track;
  if(typeof saved?.volume==='number'&&Number.isFinite(saved.volume))volume=Math.max(0,Math.min(1,saved.volume));
 }catch{/* Music still works when browser storage is unavailable. */}
 const sound=document.querySelector<HTMLButtonElement>('#sound')!;
 const settings=document.querySelector<HTMLButtonElement>('#music-settings')!;
 const panel=document.querySelector<HTMLElement>('#music-panel')!;
 const select=document.querySelector<HTMLSelectElement>('#music-track')!;
 const slider=document.querySelector<HTMLInputElement>('#music-volume')!;
 const output=document.querySelector<HTMLOutputElement>('#music-volume-value')!;
 const play=document.querySelector<HTMLButtonElement>('#music-play')!;
 const status=document.querySelector<HTMLElement>('#music-status')!;
 const audio=document.createElement('audio');audio.id='habitat-music';audio.loop=true;audio.preload='none';audio.hidden=true;
 audio.src=`/assets/music/${tracks[track].file}`;panel.append(audio);
 let context:AudioContext|null=null,gain:GainNode|null=null,wanted=false,pending=false,revision=0;
 const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify({track,volume}));}catch{/* optional preference */}};
 const applyVolume=()=>{
  // Media-element volume is ignored by some mobile browsers; Web Audio gain works there.
  if(context&&gain){gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(volume,context.currentTime,.04);}
  else audio.volume=volume;
  slider.value=String(Math.round(volume*100));output.value=`${Math.round(volume*100)}%`;
 };
 const paint=()=>{
  sound.innerHTML=`<i data-lucide="${wanted?'volume-2':'volume-x'}"></i>`;
  sound.setAttribute('aria-label',wanted?'Pause music':'Play music');sound.title=wanted?'Pause music':'Play music';
  sound.setAttribute('aria-pressed',String(wanted));play.textContent=wanted?'Pause music':'Play music';
  refreshIcons();
 };
 const stop=()=>{revision++;wanted=false;pending=false;audio.pause();status.textContent='Paused';paint();};
 const failed=()=>{stop();status.textContent='Music could not play. Press Play to try again.';};
 const start=async()=>{
  const request=++revision;wanted=true;pending=true;status.textContent='Loading music…';paint();
  try{
   if(!context){
    const AudioEngine=window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;
    if(AudioEngine){
     context=new AudioEngine();gain=context.createGain();gain.gain.value=0;
     context.createMediaElementSource(audio).connect(gain).connect(context.destination);
     audio.volume=1;
    }
   }
   applyVolume();
   // Both calls occur directly inside the user gesture, including on iPhone/iPad.
   const resumed=context?.resume();const playback=audio.play();
   await Promise.all([resumed,playback]);
   if(request!==revision)return;
   pending=false;status.textContent=`Playing · ${tracks[track].label}`;
  }catch{if(request===revision)failed();}
 };
 audio.addEventListener('error',()=>{if(wanted&&audio.error)failed();});
 audio.addEventListener('pause',()=>{if(wanted&&!pending&&audio.paused)stop();});
 const toggle=()=>{if(wanted)stop();else void start();};
 sound.onclick=toggle;play.onclick=toggle;
 select.value=track;
 select.onchange=()=>{
  const next=select.value;
  if(next!=='jazz'&&next!=='piano')return;
  const resume=wanted;revision++;pending=resume;audio.pause();track=next;
  audio.src=`/assets/music/${tracks[track].file}`;save();
  if(resume)void start();else status.textContent='Paused';
 };
 slider.oninput=()=>{volume=Number(slider.value)/100;applyVolume();save();};
 const close=()=>{panel.hidden=true;settings.setAttribute('aria-expanded','false');};
 settings.onclick=()=>{panel.hidden=!panel.hidden;settings.setAttribute('aria-expanded',String(!panel.hidden));};
 document.addEventListener('click',event=>{if(!panel.hidden&&!panel.contains(event.target as Node)&&!settings.contains(event.target as Node)&&!sound.contains(event.target as Node))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){close();settings.focus();}});
 window.addEventListener('pagehide',()=>{stop();void context?.suspend();});
 applyVolume();paint();
}
