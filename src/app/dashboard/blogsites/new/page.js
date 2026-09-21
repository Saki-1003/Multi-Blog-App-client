"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { validateSlug } from "@/utils/regex";

export default function CreateBlogSite() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [themeColor, setThemeColor] = useState("#333333");
  const [heroImgFile, setHeroImgFile] = useState(null);
  const [aboutImgFile, setAboutImgFile] = useState(null);

  const [slugError, setSlugError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateSlug(slug)) {
      setSlugError("3〜50文字の英小文字・数字・ハイフンのみ使用できます。");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("about", about);
      formData.append("themeColor", themeColor);

      if (heroImgFile) {
        formData.append("heroImg", heroImgFile);
      }
      if (aboutImgFile) {
        formData.append("aboutImg", aboutImgFile);
      }

      await apiClient.post("/blogsites/create_blogsite", formData);

      router.push("/dashboard");
    } catch (error) {
      const backendMessage =
        error.response?.data?.error || "ブログサイト作成に失敗しました。";

      setSlugError(backendMessage);
    }
  }

  function handleSlugChange(e) {
    const value = e.target.value.toLowerCase();
    const isValid = validateSlug(value);

    // 文字種チェック
    if (!isValid) {
      setSlugError("3〜50文字の英小文字・数字・ハイフンのみ使用できます。");
    } else {
      setSlugError("");
    }

    setSlug(value);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-8">ブログサイトを作成する</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-lg font-medium">サイト名</label>
          <input
            className="mt-1 w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-lg font-medium">
            URL
            <span className="text-sm text-gray-700 block">
              (このサイトのURLに使用されます。例えば、URLに「recipe」と指定した場合、このサイトのアドレスはhttps://yourblog.com/recipeになります)
            </span>
          </label>
          <input
            className={`mt-1 w-full border rounded p-2 ${
              slugError ? "border-red-500" : ""
            }`}
            value={slug}
            onChange={handleSlugChange}
            required
          />
          {slugError && (
            <p className="text-red-600 text-sm mt-1">{slugError}</p>
          )}
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
          <input
            type="file"
            onChange={(e) => setHeroImgFile(e.target.files[0])}
          />
        </div>

        {/* About Image */}
        <div>
          <label className="block text-sm font-medium">作成者画像</label>
          <input
            type="file"
            onChange={(e) => setAboutImgFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded"
        >
          サイト作成
        </button>
      </form>
    </div>
  );
}
