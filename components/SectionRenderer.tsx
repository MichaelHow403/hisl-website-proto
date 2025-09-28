// /components/SectionRenderer.tsx (override poem from API with lock)
import PoemPanel from "./PoemPanel";
import { getLockedPoemText } from "../lib/poem-lock";

interface Section {
  sectionId: string;
  component: string;
  props: any;
}

interface SectionRendererProps {
  sections: Section[];
}

export function SectionRenderer({ sections }: SectionRendererProps){
  return (<>
    {sections.map((s,i)=>{
      if (s.component === "PoemPanel" || s.sectionId.includes("poem")) {
        return <PoemPanel key={i} {...s.props} text={getLockedPoemText()} />;
      }
      // ...map other components
      return null;
    })}
  </>);
}
