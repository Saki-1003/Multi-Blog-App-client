import React from "react";

const CommentPost = ({ comment }) => {
  return (
    <div className="bg-white w-11/12 mx-auto shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={comment?.user?.avatar}
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-md">{comment?.user?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentPost;
