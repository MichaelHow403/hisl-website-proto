// components/HeroParallax.tsx
"use client";
import { useEffect, useRef } from "react";
type Props={ baseId:string; overlayId?:string };
export default function HeroParallax({ baseId, overlayId }:Props){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const onMove=(e:PointerEvent)=>{
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left)/r.width - .5;
      const cy = (e.clientY - r.top)/r.height - .5;
      el.style.setProperty("--dx", `${cx*6}px`);
      el.style.setProperty("--dy", `${cy*6}px`);
    };
    el.addEventListener("pointermove", onMove);
    return ()=> el.removeEventListener("pointermove", onMove);
  },[]);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{"--dx":"0px","--dy":"0px"} as any}>
      <img src={`/imagery/${baseId}`} alt="" className="w-full h-auto block" />
      {overlayId && (
        <img src={`/imagery/${overlayId}`} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover" style={{ transform: "translate(var(--dx), var(--dy))", opacity:.35 }} />
      )}
    </div>
  );
}

