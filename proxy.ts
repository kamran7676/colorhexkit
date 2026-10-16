import { NextResponse, type NextRequest } from "next/server";

// /color/FF0000 and /color/f00 permanently redirect to the canonical /color/ff0000.
export function proxy(request: NextRequest) {
  const hex = request.nextUrl.pathname.split("/")[2] ?? "";
  const canonical = /^[0-9a-fA-F]{3}$/.test(hex) ? hex.replace(/./g, (c) => c + c).toLowerCase() : hex.toLowerCase();
  if (/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(hex) && canonical !== hex) {
    const url = request.nextUrl.clone();
    url.pathname = `/color/${canonical}`;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/color/:hex" };
