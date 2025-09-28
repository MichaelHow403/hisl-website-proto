// lib/postIdempotent.ts
export async function postIdempotent(url: string, body: any){
  const key = crypto.randomUUID();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`POST failed ${res.status}`);
  return res.json();
}

