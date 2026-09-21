"use client";

import { useContext, useEffect, useState } from "react";
import { BlogSiteContext } from "@/context/blogSiteContext";
import { AuthContext } from "@/context/authContext";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecentReads from "@/components/dashboard/RecentReads";
import FavoriteSites from "@/components/dashboard/FavoriteSites";
import FavoriteAuthors from "@/components/dashboard/FavoriteAuthors";
import CommentHistory from "@/components/dashboard/CommentHistory";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { sites, setSites, loading } = useContext(BlogSiteContext);
  const [recentReads, setRecentReads] = useState([]);
  const [favoriteAuthors, setFavoriteAuthors] = useState([]);
  const [favoriteSites, setFavoriteSites] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchBlogData() {
      try {
        const response = await apiClient.get("/blogsites/my_blogsites");
        setSites(response.data);
      } catch (error) {
        console.error("Failed to fetch blogsites:", error);
      }
    }

    fetchBlogData();
  }, [user]);

  // 最近読んだ記事を取得
  useEffect(() => {
    if (!user) return;
    const fetchRecentReads = async () => {
      try {
        const response = await apiClient.get("/recent-read/get-recent-reads");
        setRecentReads(response.data);
      } catch (error) {
        console.error("Failed to fetch recent reads:", error);
      }
    };
    fetchRecentReads();
  }, [user]);

  // お気に入りの著者を取得
  useEffect(() => {
    if (!user) return;
    const fetchFavoriteAuthors = async () => {
      try {
        const response = await apiClient.get("/favorite/authors");
        setFavoriteAuthors(response.data);
      } catch (error) {
        console.error("Failed to fetch favorite authors:", error);
      }
    };
    fetchFavoriteAuthors();
  }, [user]);

  // お気に入りのブログサイトを取得
  useEffect(() => {
    if (!user) return;
    const fetchFavoriteSites = async () => {
      try {
        const response = await apiClient.get("/favorite/sites");
        setFavoriteSites(response.data);
      } catch (error) {
        console.error("Failed to fetch favorite blog sites:", error);
      }
    };
    fetchFavoriteSites();
  }, [user]);

  // コメント履歴を取得
  useEffect(() => {
    if (!user) return;
    const fetchUserComments = async () => {
      try {
        const response = await apiClient.get(
          "/comments/get-all-comments-by-user",
        );
        setUserComments(response.data);
      } catch (error) {
        console.error("Failed to fetch user's comments:", error);
      }
    };
    fetchUserComments();
  }, [user]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-8 space-y-12">
        {/* あなたのホーム（背景グレーでレイヤー化） */}
        <section className="bg-gradient-to-br from-[#f7fff9] to-[#e9fdf4] border border-gray-200 rounded-xl p-10 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">あなたのホーム</h1>
          <div className="h-1 w-14 bg-indigo-500 rounded mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 最近読んだブログ */}
            <RecentReads recentReads={recentReads} />

            {/* お気に入りのブログサイト */}
            <FavoriteSites favoriteSites={favoriteSites} />

            {/* お気に入りの作者 */}
            <FavoriteAuthors favoriteAuthors={favoriteAuthors} />

            {/* コメント履歴 */}
            <CommentHistory comments={userComments} />
          </div>
        </section>

        {/* ブログ作成セクション（白背景で強調） */}
        <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">ブログを作成する</h2>
          <p className="text-gray-600 mb-6">
            自分のブログサイトを開設して記事を書いて公開できます。
          </p>

          <Link
            href="/dashboard/blogsites/new"
            className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md shadow hover:bg-indigo-700"
          >
            新しいブログサイトを作成する
          </Link>
        </section>

        {/* あなたのブログサイト（クリエイター領域） */}
        {sites && sites.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">あなたのブログサイト</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  {/* サイトの heroImg */}
                  {site.heroImg ? (
                    <img
                      src={site.heroImg}
                      alt={`${site.title} hero image`}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  {/* 本文 */}
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <h3 className="text-lg font-semibold">{site.title}</h3>
                      <Link href={`/dashboard/blogsites/${site.slug}/edit`}>
                        <ModeEditIcon
                          sx={{
                            fontSize: "1.6rem",
                            marginLeft: "0.5rem",
                            color: "#7fb3ff",
                            verticalAlign: "middle",
                          }}
                          className="hover:text-teal-500 cursor-pointer"
                        />
                      </Link>
                    </div>
                    <p className="text-gray-600 mb-4">{site.description}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link
                        href={`/dashboard/blogsites/${site.slug}/posts/new`}
                        className="
                          px-4 py-2 
                          rounded-md 
                          bg-teal-50 
                          text-teal-700 
                          text-sm 
                          font-medium
                          hover:bg-teal-100 
                          transition-colors
                        "
                      >
                        新規ブログ記事を投稿する
                      </Link>
                      <Link
                        href={`/blogsite/${site.slug}`}
                        className="
                          px-4 py-2 
                          rounded-md 
                          bg-red-50 
                          text-red-400
                          text-sm 
                          font-medium
                          hover:bg-gray-100 
                          transition-colors
                        "
                      >
                        公開ページを見る
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
