/** Hysteresis avoids quality changes during a single slow frame or a camera click. */
export type RenderTier = 0 | 1 | 2;
export class RenderBudget {
 tier:RenderTier; private slow=0;private fast=0;private warmup=1.5;
 constructor(constrained=false){this.tier=constrained?1:2;}
 sample(seconds:number):boolean{
  if(!Number.isFinite(seconds)||seconds<=0)return false;
  if(this.warmup>0){this.warmup-=seconds;return false;}
  const dt=Math.min(seconds,.5);
  this.slow=seconds>1/35?this.slow+dt:Math.max(0,this.slow-dt*2);
  this.fast=seconds<1/55?this.fast+dt:0;
  if(this.slow>1.8&&this.tier>0){this.tier=(this.tier-1) as RenderTier;this.slow=0;this.fast=0;this.warmup=2;return true;}
  if(this.fast>18&&this.tier<2){this.tier=(this.tier+1) as RenderTier;this.fast=0;this.slow=0;this.warmup=3;return true;}
  return false;
 }
 pixelRatio(deviceRatio:number,width:number,height:number){
  const caps=[.65,1,1.25],pixels=[320000,850000,1400000];
  return Math.min(deviceRatio,caps[this.tier],Math.sqrt(pixels[this.tier]/Math.max(1,width*height)));
 }
}
