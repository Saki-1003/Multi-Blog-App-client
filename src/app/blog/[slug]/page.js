"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlideshow from "@/components/ImageSlideshow";
import Timeline from "@/components/Timeline";
import FavoriteButton from "@/components/FavoriteButton";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  console.log("article:", article);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await apiClient.get(`/posts/${slug}`);
        setArticle(res.data);
      } catch (error) {
        console.log("Article fetch error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // 最近見た記事を保存する
  useEffect(() => {
    if (!user) return;
    const postRecentReads = async () => {
      try {
        const res = await apiClient.post("/recent-read/save", {
          postId: article.id,
        });
      } catch (error) {
        console.log("Recent Reads save error:", error);
      }
    };
    postRecentReads();
  }, [user, article]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading article...
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Article not found.
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-white">
        <Link
          href={`/blogsite/${article.blogSite.slug}`}
          className="inline-block mt-8 ml-8 text-blue-600 hover:text-blue-800"
        >
          ← {article.blogSite.title} に戻る
        </Link>
        {/* 記事ヘッダー */}
        <section className="container mx-auto py-16 mt-8">
          <h1 className="text-4xl mb-5 text-center font-bold text-gray-800">
            {article.title}
          </h1>

          <p className="text-center text-gray-500 mb-4">
            カテゴリ: {article.category || ""}
          </p>

          <div className="flex flex-col justify-center gap-4 mb-10">
            <p className="text-center text-gray-700">
              著者: {article.blogSite.owner.username || "Anonymous"}
            </p>
            <FavoriteButton
              type="author"
              targetId={article.blogSite.owner.id}
            />
          </div>

          {/* 画像スライドショー */}
          <ImageSlideshow images={article.images} />

          {/* 記事本文 */}
          <div className="w-4/5 mx-auto mt-10">
            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {article.content}
            </p>
          </div>

          {/* タグ */}
          {article.tags?.length > 0 && (
            <div className="w-4/5 mx-auto mt-8">
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* コメント欄 */}
        <section className="w-4/6 mx-auto py-12 my-20">
          <h2 className="w-full bg-gray-100 mx-auto text-center text-3xl py-8 font-semibold">
            Comments
          </h2>

          {/* postId を渡す */}
          <Timeline postId={article.id} />
        </section>
      </main>

      <Footer />
    </>
  );
}
