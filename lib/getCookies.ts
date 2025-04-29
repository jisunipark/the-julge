export default function getCookies() {
  if (typeof window === "undefined") {
    return {};
  }
  const cookies = Object.fromEntries(
    document.cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
  return cookies;
}

export function getReqCookies(reqCookies: string) {
  if (!reqCookies) return {};
  const cookies = Object.fromEntries(
    reqCookies.split(";").map((cookie) => cookie.trim().split("="))
  );
  return cookies;
}

export function setCookie(name: string, value: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=${value}`;
  }
}

export function deleteCookie(name: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
