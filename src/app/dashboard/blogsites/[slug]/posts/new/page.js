"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { validateSlug } from "@/utils/regex";
import apiClient from "@/lib/apiClient";
import Header from "@/components/Header";

const BlogPost = () => {
  const params = useParams();
  const blogsiteSlug = params.slug;

  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogPostSlug, setBlogPostSlug] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [images, setImages] = useState([]);
  const [ogImage, setOgImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [isDraft, setIsDraft] = useState(false);
  const [slugError, setSlugError] = useState("");

  console.log("tags:", tags);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("slug", blogPostSlug);
      formData.append("category", blogCategory);
      formData.append("summary", blogSummary);
      formData.append("content", blogContent);
      formData.append("tags", JSON.stringify(tags));
      formData.append("published", !isDraft);
      formData.append("blogsiteSlug", blogsiteSlug);

      if (ogImage) formData.append("ogImage", ogImage);
      images.forEach((image) => formData.append("images", image));

      await apiClient.post("/posts/post_blog_article", formData);

      setBlogTitle("");
      setBlogPostSlug("");
      setBlogCategory("");
      setBlogSummary("");
      setBlogContent("");
      setImages([]);
      setOgImage(null);
      setTags([]);
    } catch (error) {
      alert("記事を投稿するにはログインしてください");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim();

      if (!value) return;

      // 日本語 + 英数字 + ハイフンのみ許可
      if (
        !/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-zA-Z0-9-]+$/u.test(
          value,
        )
      ) {
        return;
      }

      if (!tags.includes(value)) {
        setTags([...tags, value]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // URLの文字列チェック
  const handleSlugChange = (e) => {
    const value = e.target.value.toLowerCase();
    const isValid = validateSlug(value);

    setSlugError(
      isValid ? "" : "3〜50文字の英小文字・数字・ハイフンのみ使用できます。",
    );

    setBlogPostSlug(value);
  };

  //　画像選択
  const handleImagesChange = (e) => {
    const selected = Array.from(e.target.files);
    const merged = [...images, ...selected];

    // 合計3枚まで
    if (merged.length > 3) {
      alert("選択できる写真は最大3枚までです。");
    }

    setImages(merged.slice(0, 3));

    // input の値をリセット
    e.target.value = "";
  };

  // 画像削除
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto py-6">
        <Link
          href={`/dashboard/blogsites/${blogsiteSlug}/edit`}
          className="text-blue-600 block mb-4 hover:underline"
        >
          ← 戻る
        </Link>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-3xl font-bold text-lime-600 mb-10">
            ブログ記事を投稿する
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タイトル */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                タイトル
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                URL
                <span className="text-sm text-gray-600 block">
                  （例：recipe → https://yourblog.com/recipe）
                </span>
              </label>
              <input
                value={blogPostSlug}
                onChange={handleSlugChange}
                required
                className={`mt-1 w-full border rounded p-2 ${
                  slugError ? "border-red-500" : ""
                }`}
              />
              {slugError && (
                <p className="text-red-600 text-sm mt-1">{slugError}</p>
              )}
            </div>

            {/* カテゴリ */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                カテゴリ
              </label>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option hidden>--Please select a category--</option>
                <option>Hiking/Tramping</option>
                <option>Beaches</option>
                <option>Animals</option>
                <option>Landscape</option>
              </select>
            </div>

            {/* 要約 */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                要約
              </label>
              <textarea
                value={blogSummary}
                onChange={(e) => setBlogSummary(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2 h-24"
              />
            </div>

            {/* 本文 */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                投稿記事
              </label>
              <textarea
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2 h-32"
              />
            </div>

            {/* メイン画像 */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                ブログ投稿画像（3枚まで）
              </label>
              <input type="file" multiple onChange={handleImagesChange} />

              {/* 選択されたファイル名一覧 */}
              {images.length > 0 && (
                <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                  {images.map((file, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-sm text-gray-800 bg-gray-200 px-3 py-1 rounded-lg mb-2 w-fit"
                    >
                      <span>
                        {idx + 1}枚目：{file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="ml-2 text-red-600 hover:text-red-800 text-md font-boldpy-1 px-2 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.5em"
                          viewBox="0 0 40 40"
                        >
                          <path
                            fill="#f00d0d"
                            d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.06 1.06 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* SNSサムネ */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                SNSシェア用サムネイル画像
              </label>
              <input
                type="file"
                onChange={(e) => setOgImage(e.target.files[0])}
              />

              {ogImage && (
                <p className="mt-2 text-sm text-gray-700">{ogImage.name}</p>
              )}
            </div>

            {/* タグ */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Tags
              </label>

              {/* 入力欄 */}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="タグを入力して Enter"
                className="mt-1 w-full border border-gray-300 rounded p-2"
              />

              {/* タグ一覧 */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      bg-indigo-50 
                      text-indigo-700 
                      px-3 py-1 
                      rounded-md 
                      text-sm 
                      flex items-center gap-2
                    "
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-indigo-400 hover:text-indigo-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-4">
              <button
                type="submit"
                onClick={() => setIsDraft(true)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                下書き保存
              </button>

              <button
                type="submit"
                onClick={() => setIsDraft(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                公開する
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
