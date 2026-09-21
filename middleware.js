import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 1. /dashboard 以下はログイン必須
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 2. /dashboard/blogsites/[slug] のときだけオーナー判定
  if (pathname.startsWith("/dashboard/blogsites/")) {
    const slug = pathname.split("/").pop();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogsites/${slug}/owner`,
      {
        credentials: "include",
      },
    );

    const data = await res.json();

    // オーナーじゃない場合は /dashboard に戻す
    if (!data.isOwner) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
