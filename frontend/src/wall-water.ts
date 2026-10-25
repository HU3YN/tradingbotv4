/** Independent surface droplets; no stream meshes or shared visible paths. */
export const WALL_DROP_COUNT=96;
const fract=(value:number)=>value-Math.floor(value);
const seeds=Array.from({length:WALL_DROP_COUNT},(_,i)=>({
 x:-3.42+6.84*fract(i*.61803398875+.17),phase:fract(i*.41421356237+.31),
 speed:.025+.022*fract(i*.73205080757),width:.012+.008*fract(i*.271828),
 length:.027+.028*fract(i*.141421),
}));
/** Write x, y, z, radius, length into reused storage without per-frame allocations. */
export function writeWallDrop(index:number,time:number,out:Float32Array){
 const seed=seeds[index],age=time*seed.speed+seed.phase,cycle=Math.floor(age),progress=fract(age);
 const turn=fract(index*.754877666+cycle*.569840291)-.5;
 out[0]=seed.x+turn*.10+Math.sin(progress*10+index)*.065;
 out[1]=5.35-Math.pow(progress,1.12)*5.22;
 out[2]=-1.62+Math.sin(progress*11+index*2)*.012;
 const fade=Math.min(1,progress*30,(1-progress)*30);
 out[3]=seed.width*fade;out[4]=seed.length*fade;
}
