"use client";
import { useState, useContext } from "react";
import { useParams } from "next/navigation";
import { BlogSiteContext } from "@/context/blogSiteContext";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function NavBar() {
  const { slug } = useParams();
  const { sites } = useContext(BlogSiteContext);
  const { logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  // ログインユーザーがオーナーの場合のみNavBarを表示する
  const currentSite =
    sites && sites.length > 0 ? sites.find((site) => site.slug === slug) : null;

  const isOwner = currentSite && user && currentSite.ownerId === user.id;

  if (!isOwner) return null;

  return (
    <nav className="hidden md:block bg-gray-700 h-full w-16 py-20 pt-32 fixed z-20">
      {/* 新規ブログ投稿 */}
      <div className="group relative">
        <Link href={`/dashboard/blogsites/${slug}/posts/new`}>
          <CreateOutlinedIcon
            sx={{
              width: "100%",
              fontSize: "3rem",
              color: "#e6e6e6",
            }}
            className="hover:text-teal-500"
          />
        </Link>
        {/* Tooltip */}
        <span
          className="
            absolute left-20 top-1/2 -translate-y-1/2 
            bg-gray-800 text-white text-sm px-3 py-1 rounded 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200
            whitespace-nowrap
          "
        >
          新規ブログ投稿
        </span>
      </div>

      {/* ダッシュボード */}
      <div className="group relative">
        <Link href="/dashboard">
          <ArticleOutlinedIcon
            sx={{
              width: "100%",
              fontSize: "3rem",
              marginTop: "6rem",
              color: "#e6e6e6",
            }}
            className="hover:text-teal-500"
          />
        </Link>
        {/* Tooltip */}
        <span
          className="
            absolute left-20 top-32 -translate-y-1/2 
            bg-gray-800 text-white text-sm px-3 py-1 rounded 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200
            whitespace-nowrap
          "
        >
          ダッシュボード
        </span>
      </div>

      {/* ログアウト */}
      <div className="group relative">
        <LogoutOutlinedIcon
          onClick={logout}
          sx={{
            width: "100%",
            fontSize: "3rem",
            marginTop: "6rem",
            color: "#e6e6e6",
          }}
          className="hover:text-teal-500 cursor-pointer"
        />
        {/* Tooltip */}
        <span
          className="
            absolute left-20 top-36 -translate-y-1/2 
            bg-gray-800 text-white text-sm px-3 py-1 rounded 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200
            whitespace-nowrap
          "
        >
          ログアウト
        </span>
      </div>
    </nav>
  );
}
