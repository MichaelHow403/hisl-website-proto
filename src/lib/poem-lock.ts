// Canonical, verbatim poem — DO NOT EDIT without updating sha256.
// If this ever changes, CI will fail (see test below).
export const POEM_LOCK = {
  id: "craftsman-poem-v1",
  title: "The Craftsman's Creed", // UI label
  text: "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
  // SHA-256 of the exact text (UTF-8, no trailing newline)
  sha256_hex: "e06c6a8b4483c12a16da1fe0630551e186859373ba95d5b62194e16898a0a6ea",
  sha256_b64: "4Gxqi0SDwSoW2h/gYwVR4YaFk3O6ldW2IZThaJigpuo="
} as const;

// Node runtime only (SSR/build); keep crypto out of Edge/runtime-critical paths.
export function getLockedPoemText(): string {
  // Defer hashing to build/SSR to avoid bundling crypto in clients.
  // In production builds we trust the test; at runtime we just return.
  return POEM_LOCK.text;
}

export function getLockedPoemTitle(): string {
  return POEM_LOCK.title;
}

// Optional SSR check (development safety net)
export async function assertPoemLockDev() {
  if (process.env.NODE_ENV === "development") {
    const { createHash } = await import("crypto");
    const hex = createHash("sha256").update(POEM_LOCK.text, "utf8").digest("hex");
    if (hex !== POEM_LOCK.sha256_hex) {
      throw new Error("POEM_LOCK sha256 mismatch — do not edit the poem text.");
    }
  }
}
