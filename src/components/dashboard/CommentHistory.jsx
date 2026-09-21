"use client";

import Link from "next/link";

export default function CommentHistory({ comments }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition-shadow h-[40vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">あなたのコメント履歴</h2>

      {comments.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-lg">
          <p className="text-sm">まだコメントはありません。</p>
          <p className="text-xs mt-2">
            記事にコメントすると、ここに表示されます。
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id}>
              {/* 吹き出し本体 */}
              <div className="relative border border-blue-200 rounded-lg p-3 bg-blue-50">
                {/* 吹き出しのしっぽ（ブルー系） */}
                <div
                  className="absolute -left-2 top-3 w-0 h-0 
                                border-t-8 border-b-8 border-r-8 border-transparent 
                                border-r-blue-200"
                ></div>

                <p className="text-gray-700 text-sm line-clamp-2">
                  {comment.comment}
                </p>
              </div>

              {/* 記事タイトル & 日時（横並び） */}
              <div className="flex flex-row justify-between text-xs text-gray-500 mt-1 px-1">
                <span className="truncate max-w-[60%]">
                  コメントしたブログ記事:
                  <Link
                    href={`/blog/${comment.post.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    {comment.post.title}
                  </Link>
                </span>

                <span className="text-gray-400">
                  投稿日時：
                  {new Date(comment.updatedAt).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
