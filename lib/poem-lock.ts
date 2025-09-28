// /lib/poem-lock.ts
import { POEM_LOCK } from "../content/canon/poem.lock";

export function getLockedPoemText(): string {
  return POEM_LOCK.text;
}
