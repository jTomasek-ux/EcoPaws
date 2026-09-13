const SESSION_COOKIE = "ecopaws_session";

type SessionManager = {
  getSessionOrigin(): string | Promise<string>;
  getSessionItem(key: string): unknown | Promise<unknown>;
  setSessionItem(key: string, value: unknown): void | Promise<void>;
  removeSessionItem(key: string): void | Promise<void>;
  commit?(): HeadersInit | void | Promise<HeadersInit | void>;
};

function getSecret() {
  return process.env.CUSTOMER_ACCOUNT_SESSION_SECRET ?? "local-dev-only";
}

function bytesToBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(payload: string) {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(getSecret()),
    new TextEncoder().encode(payload),
  );
  return bytesToBase64Url(signature);
}

function readCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));

  return match?.slice(SESSION_COOKIE.length + 1);
}

async function readSession(request: Request): Promise<Record<string, unknown>> {
  const raw = readCookie(request);
  if (!raw) return {};

  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return {};

  const expected = await sign(payload);
  const left = base64UrlToBytes(signature);
  const right = base64UrlToBytes(expected);
  if (left.length !== right.length) return {};

  let same = 0;
  for (let i = 0; i < left.length; i += 1) {
    same |= left[i] ^ right[i];
  }
  if (same !== 0) return {};

  try {
    return JSON.parse(atob(payload.replaceAll("-", "+").replaceAll("_", "/"))) as Record<
      string,
      unknown
    >;
  } catch {
    return {};
  }
}

export async function createSessionManager(
  request: Request,
): Promise<SessionManager> {
  const store = await readSession(request);
  let dirty = false;

  return {
    getSessionOrigin() {
      return new URL(request.url).origin;
    },
    getSessionItem(key) {
      return store[key];
    },
    async setSessionItem(key, value) {
      store[key] = value;
      dirty = true;
    },
    async removeSessionItem(key) {
      delete store[key];
      dirty = true;
    },
    async commit() {
      if (!dirty) return;

      const payload = btoa(JSON.stringify(store)).replaceAll("+", "-").replaceAll("/", "_");
      const signature = await sign(payload);
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `${SESSION_COOKIE}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
      );
      return headers;
    },
  };
}
