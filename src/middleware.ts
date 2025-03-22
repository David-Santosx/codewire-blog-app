import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicApiRoute = createRouteMatcher(["/api/news(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicApiRoute(req)) {
    return NextResponse.next();
  }
  
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    if ((await auth()).userId) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    } else {
      const url = new URL("/auth/sign-in", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
