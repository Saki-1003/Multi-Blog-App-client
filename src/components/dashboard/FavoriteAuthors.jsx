"use client";

export default function FavoriteAuthors({ favoriteAuthors }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-4">お気に入りの著者</h2>

      {favoriteAuthors.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-lg">
          <p className="text-sm">まだお気に入りの著者はいません。</p>
          <p className="text-xs mt-2">
            著者をお気に入りに追加すると、ここに表示されます。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteAuthors.map((favorite) => (
            <div
              key={favorite.id}
              className="w-fit mx-auto border border-gray-200 rounded-lg shadow p-4 bg-white text-center"
            >
              {/* アバター */}
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <img
                  src={favorite.author.avatar}
                  alt={favorite.author.username}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 名前 */}
              <h3 className="text-gray-700 text-sm font-semibold">
                {favorite.author.username}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
