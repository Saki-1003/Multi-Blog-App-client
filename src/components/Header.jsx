"use client";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { BlogSiteContext } from "@/context/blogSiteContext";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

export default function Header({
  themeColor = "#047481",
  textColor = "#ffffff",
  accentColor = "#facc15",
}) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, logout } = useContext(AuthContext);
  const { blogData, setBlogData } = useContext(BlogSiteContext);
  const path = usePathname();
  const router = useRouter();

  function toggleDrawer() {
    setOpen(!open);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const filteredByKeyword =
        blogData &&
        blogData.filter(
          (article) =>
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.category.toLowerCase().includes(keyword.toLowerCase()) ||
            article.summary.toLowerCase().includes(keyword.toLowerCase()),
        );
      setBlogData(filteredByKeyword);
    }
  }

  function handleOnChange(e) {
    e.preventDefault();
    setKeyword(e.target.value);
  }

  return (
    <header
      className="px-10 py-3 md:px-28 text-white flex justify-between items-center w-full border-b-black"
      style={{
        backgroundColor: themeColor,
        color: textColor,
      }}
    >
      <h1 className="font-semibold text-xl tracking-wide hover:text-gray-300 ">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="#fff" strokeWidth={1.5}>
              <circle cx={12} cy={13} r={3}></circle>
              <path
                strokeLinecap="round"
                d="M2 13.364c0-3.065 0-4.597.749-5.697a4.4 4.4 0 0 1 1.226-1.204c.72-.473 1.622-.642 3.003-.702c.659 0 1.226-.49 1.355-1.125A2.064 2.064 0 0 1 10.366 3h3.268c.988 0 1.839.685 2.033 1.636c.129.635.696 1.125 1.355 1.125c1.38.06 2.282.23 3.003.702c.485.318.902.727 1.226 1.204c.749 1.1.749 2.632.749 5.697s0 4.596-.749 5.697a4.4 4.4 0 0 1-1.226 1.204C18.904 21 17.343 21 14.222 21H9.778c-3.121 0-4.682 0-5.803-.735A4.4 4.4 0 0 1 2.75 19.06A3.4 3.4 0 0 1 2.277 18M19 10h-1"
              ></path>
            </g>
          </svg>
          Folio
        </Link>
      </h1>
      <ul className="flex space-x-4">
        {path === "/blog" && (
          <div className="hidden lg:block">
            <input
              placeholder="Search Blog"
              className="text-gray-900 rounded-full px-5 py-2"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              value={keyword}
            />
          </div>
        )}
        {user ? (
          path.includes("/edit") ? (
            ""
          ) : (
            <>
              <span className="text-md mr-6 pt-3">
                こんにちは、{user.username}さん
              </span>
              <button
                onClick={logout}
                className="hidden md:block bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                // style={{
                //   backgroundColor: textColor,
                //   color: themeColor,
                //   borderColor: accentColor,
                // }}
              >
                ログアウト
              </button>
            </>
          )
        ) : (
          <Link
            href="/login"
            className="hidden md:block bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            style={{
              backgroundColor: textColor,
              color: themeColor,
              borderColor: accentColor,
            }}
          >
            ログイン
          </Link>
        )}
        {user ? (
          path !== "/dashboard" ? (
            path.includes("/edit") ? (
              ""
            ) : (
              <Link
                href="/dashboard"
                className="hidden md:block bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
              >
                ダッシュボード
              </Link>
            )
          ) : (
            ""
          )
        ) : (
          <Link
            href="/signup"
            className="hidden md:block bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
          >
            アカウント作成
          </Link>
        )}
      </ul>
      <div className="md:hidden">
        <MenuIcon sx={{ fontSize: "2.5rem" }} onClick={toggleDrawer} />
        <Drawer
          anchor={"left"}
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { backgroundColor: "black" },
          }}
        >
          <li className="list-none pl-10 pr-20 mt-16 py-4 text-lg font-semibold text-white border-b border-gray-50 active:text-blue-700">
            <CreateOutlinedIcon
              sx={{
                fontSize: "1.8rem",
                paddingRight: "0.5rem",
              }}
              className="hover:text-teal-500"
            />
            <Link href="/blog">Blog</Link>
          </li>
          <li className="list-none pl-10 pr-20 py-4 text-lg font-semibold text-white border-b border-gray-50 active:text-blue-700">
            <ArticleOutlinedIcon
              sx={{
                fontSize: "1.8rem",
                paddingRight: "0.5rem",
              }}
            />
            <Link href="/post">Post</Link>
          </li>
          <li className="list-none pl-10 pr-20 py-4 text-lg font-semibold text-white border-b border-gray-50 active:text-blue-700">
            <LoginOutlinedIcon
              sx={{
                fontSize: "1.8rem",
                paddingRight: "0.5rem",
              }}
            />
            <Link href="/login">Login</Link>
          </li>
        </Drawer>
      </div>
    </header>
  );
}
