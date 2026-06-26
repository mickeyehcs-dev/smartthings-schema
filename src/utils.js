export function json(data, status = 200) {
  return new Response(
    JSON.stringify(data, null, 2),
    {
      status,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

export async function body(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function uuid() {
  return crypto.randomUUID();
}
