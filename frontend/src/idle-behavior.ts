/** Decorative behavior only: no orders, account state, or profit changes. */
export type IdleAction = 'desk' | 'sleep' | 'stretch' | 'coffee' | 'hunt';
export type ResidentActivity = {action:IdleAction; elapsed:number; duration:number; wait:number; bag:IdleAction[]};
export const ACTIVITY_LABELS:Record<IdleAction,string> = {desk:'At the keyboard',sleep:'Napping',stretch:'Stretching',coffee:'Coffee break',hunt:'Hunting fruit flies'};
const durations:Record<IdleAction,[number,number]> = {desk:[12,25],sleep:[24,38],stretch:[9,12],coffee:[12,16],hunt:[18,24]};

// A disconnected preview only relaxes outside the regular weekday session. Holidays
// and early closes require the broker clock; we never assume those from a date alone.
export function outsideRegularSession(now:Date):boolean {
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
 const value=(type:string)=>parts.find(part=>part.type===type)!.value;
 const minute=Number(value('hour'))*60+Number(value('minute'));
 return ['Sat','Sun'].includes(value('weekday'))||minute<570||minute>=960;
}

export class IdleDirector {
 residents:ResidentActivity[];
 private cooldown=0;
 constructor(private random:()=>number=Math.random){
  this.residents=Array.from({length:4},(_,id)=>({action:'desk',elapsed:0,duration:0,wait:3+id*3+random()*3,bag:[]}));
 }
 private between(range:[number,number]){return range[0]+this.random()*(range[1]-range[0]);}
 reset(id:number){const resident=this.residents[id];resident.action='desk';resident.elapsed=0;resident.wait=4+id*3+this.random()*8;}
 step(seconds:number,closed:boolean,active:boolean[]){
  // Capping catch-up prevents an invisible tab from skipping entire routines.
  const dt=Math.max(0,Math.min(seconds,.25));this.cooldown=Math.max(0,this.cooldown-dt);
  this.residents.forEach((resident,id)=>{
   if(!closed||active[id]!==false){if(resident.action!=='desk')this.reset(id);return;}
   if(resident.action!=='desk'){
    resident.elapsed+=dt;
    if(resident.elapsed>=resident.duration){this.reset(id);resident.wait=this.between(durations.desk);}
    return;
   }
   resident.wait-=dt;
   // Stagger departures and always leave at least one resident at a desk.
   if(resident.wait>0||this.cooldown>0||this.residents.filter(r=>r.action!=='desk').length>=3)return;
   if(!resident.bag.length){
    resident.bag=['sleep','stretch','coffee','hunt'];
    for(let i=resident.bag.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[resident.bag[i],resident.bag[j]]=[resident.bag[j],resident.bag[i]];}
   }
   // Ground hunters share the central leaf patch; take turns there while branch hunts can overlap.
   if(id<2&&resident.bag.at(-1)==='hunt'&&this.residents.slice(0,2).some((other,index)=>index!==id&&other.action==='hunt'))return;
   resident.action=resident.bag.pop()!;resident.elapsed=0;resident.duration=this.between(durations[resident.action]);this.cooldown=2+this.random()*2;
  });
  return this.residents;
 }
}
