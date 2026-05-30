const STORAGE_PREFIX = "__secure__:";

type SecurePayload = {
  iv: string;
  value: string;
  v: 1;
};

function encode(str: string) {
  return new TextEncoder().encode(str);
}

function decode(buffer: ArrayBuffer) {
  return new TextDecoder().decode(buffer);
}

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}


function getTemporarySecret() {
  if (typeof window === "undefined") return "ssr-fallback-key";

  const p1 = "mk";
  const p2 = "task";
  const p3 = window.location.hostname || "localhost";
  const p4 = "shield";
  const p5 = "v1";

  return `${p1}-${p3}-${p2}-${p4}-${p5}`;
}

async function deriveKey(secret: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encode("mojtaba-local-storage-salt"),
      iterations: 120000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function secureSerialize<T>(data: T): Promise<string> {
  const key = await deriveKey(getTemporarySecret());
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encode(JSON.stringify(data)),
  );

  const payload: SecurePayload = {
    iv: toBase64(iv.buffer),
    value: toBase64(encrypted),
    v: 1,
  };

  return `${STORAGE_PREFIX}${JSON.stringify(payload)}`;
}

export async function secureDeserialize<T>(raw: string): Promise<T> {
  if (!raw.startsWith(STORAGE_PREFIX)) {
    return JSON.parse(raw) as T;
  }

  const payload = JSON.parse(raw.slice(STORAGE_PREFIX.length)) as SecurePayload;

  const key = await deriveKey(getTemporarySecret());

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(fromBase64(payload.iv)),
    },
    key,
    fromBase64(payload.value),
  );

  return JSON.parse(decode(decrypted)) as T;
}

export async function secureSetItem<T>(key: string, value: T) {
  const serialized = await secureSerialize(value);
  localStorage.setItem(key, serialized);
}

export async function secureGetItem<T>(key: string): Promise<T | null> {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;

  try {
    return await secureDeserialize<T>(raw);
  } catch (error) {
    console.error(`Failed to read secure localStorage key "${key}"`, error);
    return null;
  }
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
