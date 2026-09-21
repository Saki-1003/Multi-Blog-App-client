"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function EditBlogSite({ siteId }) {
  const router = useRouter();

  const [site, setSite] = useState(null);

  // 初期データ取得
  useEffect(() => {
    const fetchSite = async () => {
      const res = await apiClient.get(`/blogsites/${siteId}`);
      setSite(res.data);
    };
    fetchSite();
  }, [siteId]);

  // ロード中
  if (!site) return <p>Loading...</p>;

  // 編集用 state
  const [title, setTitle] = useState(site.title);
  const [description, setDescription] = useState(site.description);
  const [about, setAbout] = useState(site.about);
  const [themeColor, setThemeColor] = useState(site.themeColor);

  const [heroImgFile, setHeroImgFile] = useState(null);
  const [aboutImgFile, setAboutImgFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("about", about);
    formData.append("themeColor", themeColor);

    if (heroImgFile) formData.append("heroImg", heroImgFile);
    if (aboutImgFile) formData.append("aboutImg", aboutImgFile);

    await apiClient.put(`/blogsites/${siteId}`, formData);

    router.push("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-8">サイト設定</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-lg font-medium">サイト名</label>
          <input
            className="mt-1 w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Slug（編集不可） */}
        <div>
          <label className="block text-lg font-medium">URL（変更不可）</label>
          <p className="text-gray-600 mt-1">https://yourblog.com/{site.slug}</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium">
            ブログサイトの説明
          </label>
          <textarea
            className="mt-1 w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-lg font-medium">
            サイトや作成者について
          </label>
          <textarea
            className="mt-1 w-full border rounded p-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Theme Color */}
        <div>
          <label className="block text-lg font-medium">テーマカラー</label>
          <input
            type="color"
            className="mt-1 w-16 h-10 p-1 border rounded"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-medium">メイン画像</label>
          <img src={site.heroImg} className="w-full rounded mb-2" />
          <input
            type="file"
            onChange={(e) => setHeroImgFile(e.target.files[0])}
          />
        </div>

        {/* About Image */}
        <div>
          <label className="block text-sm font-medium">作成者画像</label>
          <img src={site.aboutImg} className="w-32 rounded mb-2" />
          <input
            type="file"
            onChange={(e) => setAboutImgFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded"
        >
          変更を保存
        </button>
      </form>
    </div>
  );
}
