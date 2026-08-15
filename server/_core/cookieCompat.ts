import * as cookieModule from "cookie";

type CookieParser = (header: string) => Record<string, string>;

const runtimeCookie = cookieModule as unknown as { parseCookie?: CookieParser; parse?: CookieParser };
export const parseCookieHeader: CookieParser = runtimeCookie.parseCookie ?? runtimeCookie.parse ?? (() => ({}));
