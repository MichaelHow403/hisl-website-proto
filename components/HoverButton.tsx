// components/HoverButton.tsx
"use client";
import { motion, HTMLMotionProps } from "framer-motion";
type Props = Omit<HTMLMotionProps<"button">, "children"> & { variant?: "gold"|"ghost"; children: React.ReactNode };
export default function HoverButton({ variant="gold", children, ...rest }: Props){
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`btn ${variant==="gold" ? "btn-gold" : "btn-ghost"}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
