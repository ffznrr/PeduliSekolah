import React from "react";

const PostDetail = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div>Post {params.id}</div>
    </>
  );
};

export default PostDetail;
