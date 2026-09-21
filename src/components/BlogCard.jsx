import React from "react";
import Link from "next/link";

const BlogCard = ({ article }) => {
  return (
    <div className="bg-stone-100 border border-gray-200 pt-4 rounded-lg shadow-md sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:scale-[103%]">
      <Link href={`/blog/${article.title.replaceAll(" ", "_")}`}>
        <figure className="text-center mx-4">
          <img
            className="text-center w-full h-52 rounded-lg object-cover hover:scale-[103%]"
            src={article.file}
            alt={`image of ${article.title}`}
          />
        </figure>
        <div className="text-right my-1 mr-3">
          <p className="bg-amber-300 border-2 text-center font-semibold text-sm py-0.5 px-3 inline-block rounded-md">
            {article.category}
          </p>
        </div>
        <h3 className="font-bold text-lg text-center my-2 md:mx-4">
          {article.title}
        </h3>
        <h4 className="text-sm text-center md:mx-4 mb-4">{article.summary}</h4>
      </Link>
    </div>
  );
};
export default BlogCard;
