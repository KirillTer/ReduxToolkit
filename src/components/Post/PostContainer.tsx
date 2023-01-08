import React, { useEffect, useState } from "react";
import { postAPI } from "../../services/PostService";
import PostItem from "./PostItem";
import PostSelect from "./PostSelect";
import PostForm from "./PostForm";
import { IPost } from "../../models/IPost";
import { Button, Input } from 'antd';

const PostContainer = () => {
  const [limit, setLimit] = useState(10);
  
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);

  // eslint-disable-next-line no-empty-pattern
  const [createPost, {}] = postAPI.useCreatePostMutation();
  // eslint-disable-next-line no-empty-pattern
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  // eslint-disable-next-line no-empty-pattern
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortedPosts, setSelectedSortedPosts] = useState([]);

  useEffect(() => {
    setSortedPosts(posts as []);
    // setTimeout(() => {
    //     setLimit(3)
    // }, 2000)
  }, [posts]);

  useEffect(() => {
    setSelectedSortedPosts(sortedPosts ? sortedPosts.filter(post => (post['body'] as string).toLowerCase().includes(searchQuery)) : posts as []);
  }, [sortedPosts, searchQuery, posts]);

  const handleCreate = async (newPost: IPost) => {
    await createPost({ title: newPost.title, body: newPost.body } as IPost);  
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handleSelect = (val: any) => {
    setSortedPosts([...posts as []].sort((a: any, b: any) => a[val].localeCompare(b[val])));
  }

  return (
    <div>
      <PostForm createNewPost={handleCreate} />
      <PostSelect selectPosts={handleSelect}/>
      <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search'/>
      <div className="post__list">
        <Button type="primary" onClick={() => refetch()}>Refetch</Button>
        <h1>Posts list</h1>
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
