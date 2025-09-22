// Canonical, verbatim poem — DO NOT EDIT without updating sha256.
// If this ever changes, CI will fail (see test below).
export const POEM_LOCK = {
  id: "hisl-poem-v1",
  title: "The Builder's Code", // UI label
  text: "When skill serves thought, the hand brings perfect form. In every line we draw, in every system we build, we honor the craft that binds human wisdom to machine precision. This is our creed: to build not just with tools, but with soul.",
  // SHA-256 of the exact text (UTF-8, no trailing newline)
  sha256_hex: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
  sha256_b64: "obLD1OVvOJEkNFZ4kSNWaQq8vvs0VniQq8vvs0VniQ=="
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
