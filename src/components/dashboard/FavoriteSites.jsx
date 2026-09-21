"use client";

import Link from "next/link";

export default function FavoriteSites({ favoriteSites }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-2">お気に入りのブログサイト</h2>

      {favoriteSites.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-lg">
          <p className="text-sm">まだお気に入りのサイトはありません。</p>
          <p className="text-xs mt-2">
            サイトをお気に入りに追加すると、ここに表示されます。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteSites.map((favorite) => (
            <Link
              key={favorite.id}
              href={`/blogsite/${favorite.site.slug}`}
              className="border border-gray-200 rounded-lg shadow p-4 bg-white
                         transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg block"
            >
              {" "}
              <div className="mb-3 aspect-[16/9] overflow-hidden rounded-md">
                <img
                  src={favorite.site.heroImg}
                  alt={favorite.site.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-gray-700 text-md font-semibold">
                {favorite.site.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                作者名: {favorite.site.owner.username}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
