interface InlineNoteProps {
  text: string;
  icon?: string;
}

export default function InlineNote({ text, icon = "ℹ️" }: InlineNoteProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-panel/40 border border-edge/50 p-4">
      <span className="text-aiGreen text-xl" aria-hidden="true">
        {icon}
      </span>
      <p className="font-inter text-[15px] leading-relaxed text-muted">
        {text}
      </p>
    </div>
  );
}
