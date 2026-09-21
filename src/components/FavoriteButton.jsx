"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function FavoriteButton({
  type, // "site" or "author"
  targetId, // siteId or authorId
}) {
  const { user } = useContext(AuthContext);
  const [favorited, setFavorited] = useState({
    id: null,
    is_favorite: false,
  });
  const [loading, setLoading] = useState(true);
  console.log("favorited:", favorited);

  useEffect(() => {
    if (!user) return;

    const fetchInitialState = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/favorite/${type}s?targetId=${targetId}`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        console.log("data:", data);
        setFavorited(data);
      } catch (error) {
        console.error(error, "初期データの読み込みに失敗しました");
      }
      setLoading(false);
    };
    fetchInitialState();
  }, [user, type, targetId]);

  const toggleFavorite = async () => {
    if (loading || !user) return;
    setLoading(true);

    try {
      if (!user) return;

      if (favorited.id) {
        // DELETE
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/favorite/delete-favorite-${type}/${favorited.id}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );
        setFavorited({
          id: null,
          is_favorite: false,
        });
      } else {
        // POST(CREATE)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/favorite/save/${type}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetId }),
            credentials: "include",
          },
        );
        const newFav = await response.json();
        setFavorited({
          id: newFav.id,
          is_favorite: true,
        });
      }
    } catch (err) {
      console.error("お気に入り操作に失敗しました", err);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition mx-auto"
    >
      {favorited.is_favorite ? (
        <span className="text-yellow-500 text-2xl">★</span>
      ) : (
        <span className="text-gray-400 text-2xl">☆</span>
      )}

      <span className="text-sm">
        {favorited.is_favorite
          ? "お気に入り済み"
          : `${type === "site" ? "このブログサイトを" : type === "author" ? "この作者を" : ""}お気に入りに追加`}
      </span>
    </button>
  );
}
