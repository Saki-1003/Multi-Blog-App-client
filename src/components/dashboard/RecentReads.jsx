"use client";

import Link from "next/link";

export default function RecentReads({ recentReads }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-2">最近読んだブログ記事</h2>

      {recentReads.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-lg">
          <p className="text-sm">まだ最近読んだ記事はありません。</p>
          <p className="text-xs mt-2">
            ブログを読んでみると、ここに履歴が表示されます。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReads.map((read) => (
            <Link
              key={read.id}
              href={`/blog/${read.post.slug}`}
              className="border border-gray-200 rounded-lg shadow p-4 bg-white
                         transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg block"
            >
              {/* 画像の比率を統一 */}
              <div className="mb-3 aspect-[16/9] overflow-hidden rounded-md">
                <img
                  src={read.post.ogImage}
                  alt={read.post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-gray-700 text-md font-semibold">
                {read.post.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                作者名: {read.post.blogSite.owner.username}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                閲覧日時:{" "}
                {new Date(read.createdAt).toLocaleString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
