"use client";
import apiClient from "@/lib/apiClient";
import { useState, useEffect, createContext } from "react";

export const BlogSiteContext = createContext({});

export function BlogSiteProvider({ children }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSites() {
      try {
        const res = await apiClient.get("/blogsites/my_blogsites");
        setSites(res.data);
      } catch (error) {
        console.log("Failed to fetch blogsites:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSites();
  }, []);

  return (
    <BlogSiteContext.Provider value={{ sites, setSites, loading }}>
      {children}
    </BlogSiteContext.Provider>
  );
}
