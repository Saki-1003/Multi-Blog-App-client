"use client";

import { useEffect, useState } from "react";
import { generatePalette, getTextColor } from "@/utils/themeColor";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import FavoriteButton from "@/components/FavoriteButton";

export default function BlogSitePage({ params }) {
  const { slug } = params;
  const [blogSite, setBlogSite] = useState(null);
  console.log("blogSite:", blogSite);

  useEffect(() => {
    apiClient
      .get(`/blogSites/${slug}`)
      .then((res) => setBlogSite(res.data.blogSite))
      .catch((err) => console.log(err));
  }, [slug]);

  if (!blogSite) return null;
  const { title, description, about, heroImg, aboutImg, posts, themeColor } =
    blogSite;

  // カラーパレット生成
  const palette = generatePalette(themeColor);
  const mainColor = palette[0]; // themeColor
  const accentColor = palette[1]; // 色相 +15°
  const subColor = palette[2]; // 色相 -15°
  const textColor = getTextColor(mainColor); // 背景に応じて白/黒

  return (
    <>
      <div className="flex">
        <div className="w-full">
          <Header
            themeColor={themeColor}
            textColor={textColor}
            accentColor={accentColor}
          />

          {/* Heroタイトル*/}
          <div
            className="absolute w-4/6 top-1/4 md:top-1/3 left-2/4 -translate-x-1/2 z-10 text-3xl md:text-5xl font-semibold font-mono text-white"
            // style={{ color: textColor }}
          >
            <ScrollReveal move="top" delay="500" duration="2000">
              <h2>{title}</h2>
            </ScrollReveal>
          </div>

          {/* Heroイメージ */}
          <div
            className="w-full h-[30rem] bg-center bg-cover"
            style={{ backgroundImage: `url(${heroImg})` }}
          />

          {/* Description */}
          <p
            className="bg-slate-200 w-full md:text-center text-xl p-6 md:px-40 md:py-14 text-gray-700"
            // style={{
            //   backgroundColor: subColor,
            //   color: getTextColor(subColor),
            // }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Aboutセクション */}
      {about && (
        <section
          className="bg-cover bg-center bg-fixed pt-10 pb-20 relative"
          style={{ backgroundImage: `url(${aboutImg})` }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

          <div
            className="relative z-10 text-white text-center px-10 md:px-40"
            // style={{ color: textColor }}
          >
            <h3 className="text-3xl font-semibold mb-6">About</h3>
            <p className="text-lg leading-relaxed">{about}</p>
          </div>
        </section>
      )}

      {/* Posts */}
      <section
        className="py-20 bg-white"
        style={{ backgroundColor: mainColor }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.images[0]})` }}
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline"
                  style={{ color: accentColor }}
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-10">
          <FavoriteButton type="site" targetId={blogSite.id} />
        </div>
      </section>

      <Footer />
    </>
  );
}
