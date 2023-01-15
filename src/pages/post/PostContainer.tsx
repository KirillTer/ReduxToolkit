import React, { useEffect, useState } from "react";
import { postAPI } from "../../services/PostService";
import PostItem from "./PostItem";
import PostFilter from "./PostFilter";
import PostModal from "./PostModal";
import { IPost } from "../../models/IPost";
import { Button } from 'antd';

const PostContainer = () => {
  const [limit, setLimit] = useState(10);
  
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);

  const [createPost] = postAPI.useCreatePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  const [selectedSortedPosts, setSelectedSortedPosts] = useState([]);

  useEffect(() => {
    // setTimeout(() => { setLimit(3) }, 2000)
  }, []);

  const handleCreate = async (newPost: IPost) => {
    await createPost({ title: newPost.title, body: newPost.body } as IPost);  
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <PostFilter posts={posts as []} handleFilter={setSelectedSortedPosts}/>
      <div className="post__list">
        <Button type="primary" onClick={() => refetch()}>Refetch</Button>
        <PostModal createNewPost={handleCreate}/>
        <h1 >Posts list</h1>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {selectedSortedPosts?.length ?
          selectedSortedPosts.map((post: IPost) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          )) : <div>No available posts</div> }
      </div>
    </div>
  );
};

export default PostContainer;
