"use client";
import React from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { useContext } from "react";
import { BlogSiteContext } from "@/context/blogSiteContext";
import Footer from "@/components/Footer";

const BlogPage = () => {
  const { blogData } = useContext(BlogSiteContext);

  return (
    <>
      <Header />
      <section className="w-full min-h-screen pb-28">
        <div className="w-5/6 pt-14 mx-auto flex justify-center gap-4 xs:flex-wrap">
          {blogData &&
            blogData.map((article) => (
              <BlogCard key={article.title} article={article} />
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogPage;
