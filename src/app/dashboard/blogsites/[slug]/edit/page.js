"use client";

import { useState, useContext } from "react";
import { BlogSiteContext } from "@/context/blogSiteContext";
import apiClient from "@/lib/apiClient";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generatePalette, getTextColor } from "@/utils/themeColor";

export default function EditBlogSitePage() {
  const { sites, loading } = useContext(BlogSiteContext);
  const { slug } = useParams();
  const router = useRouter();

  const site = sites.find((s) => s.slug === slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg bg-white/80 px-6 py-4 rounded shadow">
          読み込み中です…
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg bg-white/80 px-6 py-4 rounded shadow">
          サイトが見つかりません。
        </div>
      </div>
    );
  }
  const [title, setTitle] = useState(site.title);
  const [description, setDescription] = useState(site.description);
  const [about, setAbout] = useState(site.about);
  const [themeColor, setThemeColor] = useState(site.themeColor);

  const [heroImgFile, setHeroImgFile] = useState(null);
  const [aboutImgFile, setAboutImgFile] = useState(null);

  const [editing, setEditing] = useState(false);

  // カラーパレット生成
  const palette = generatePalette(themeColor);
  const mainColor = palette[0];
  const accentColor = palette[1];
  const subColor = palette[2];
  const textColor = getTextColor(mainColor);

  async function handleSave() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("about", about);
    formData.append("themeColor", themeColor);

    if (heroImgFile) formData.append("heroImg", heroImgFile);
    if (aboutImgFile) formData.append("aboutImg", aboutImgFile);

    await apiClient.put(`/blogsites/update_blogsite/${slug}`, formData);

    router.push("/dashboard");
  }

  return (
    <>
      {/* 編集モード切り替えボタン */}
      <button
        onClick={() => setEditing(!editing)}
        className="fixed top-8 right-4 px-4 py-2 bg-indigo-600 text-white rounded shadow z-50"
      >
        {editing ? "編集キャンセル" : "編集する"}
      </button>

      {/* 保存ボタン */}
      {editing && (
        <button
          onClick={handleSave}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-600 text-white rounded shadow z-50"
        >
          保存する
        </button>
      )}

      <div className="flex">
        <NavBar />
        <div className="w-full">
          <Header
            themeColor={themeColor}
            textColor={textColor}
            accentColor={accentColor}
          />

          {/* Heroタイトル */}
          <div className="absolute w-4/6 top-1/4 md:top-1/3 left-2/4 -translate-x-1/2 z-10">
            {editing ? (
              <input
                className="text-3xl md:text-5xl font-semibold bg-white/70 p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h2 className="text-3xl md:text-5xl font-semibold font-mono text-white">
                {title}
              </h2>
            )}
          </div>

          {/* Hero画像 */}
          <div
            className="relative w-full h-[30rem] bg-center bg-cover"
            style={{
              backgroundImage: `url(${heroImgFile ? URL.createObjectURL(heroImgFile) : site.heroImg})`,
            }}
          >
            {editing && (
              <label className="absolute top-4 right-4 bg-white px-3 py-2 rounded shadow cursor-pointer">
                画像を変更
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setHeroImgFile(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {/* Description */}
          <div className="bg-slate-200 w-full md:text-center text-xl p-6 md:px-40 md:py-14 text-gray-700">
            {editing ? (
              <textarea
                className="w-full bg-white p-4 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              description
            )}
          </div>
        </div>
      </div>

      {/* Aboutセクション */}
      {about && (
        <section
          className="bg-cover bg-center bg-fixed pt-10 pb-20 relative"
          style={{
            backgroundImage: `url(${aboutImgFile ? URL.createObjectURL(aboutImgFile) : site.aboutImg})`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

          {/* About画像変更 */}
          {editing && (
            <label className="absolute top-4 right-4 bg-white px-3 py-2 rounded shadow cursor-pointer z-20">
              画像を変更
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAboutImgFile(e.target.files[0])}
              />
            </label>
          )}

          <div className="relative z-10 text-white text-center px-10 md:px-40">
            <h3 className="text-3xl font-semibold mb-6">About</h3>

            {editing ? (
              <textarea
                className="w-full bg-white/80 text-black p-4 rounded"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            ) : (
              <p className="text-lg leading-relaxed">{about}</p>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
