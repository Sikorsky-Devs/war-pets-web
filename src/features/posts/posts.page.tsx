"use client";
import { useState } from "react";

import { PaginationControls } from "@/components/pagination/pagination-controls";
import CreatePostModal from "@/features/posts/components/create-post-modal";
import PostCard from "@/features/posts/components/post-card";
import PostCardSkeleton from "@/features/posts/components/post-card-skeleton";
import PostDetail from "@/features/posts/components/post-detail";
import { usePagination } from "@/hooks/use-pagination";
import { hasPermission } from "@/permissions";
import { type Post } from "@/types/post";

import usePostsQuery from "./hooks/use-posts-query";

const PostsPage = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const itemsPerPage = 6;

  const { posts, isLoading } = usePostsQuery();

  const { currentPage, totalPages, handlePageChange, currentItems } =
    usePagination({
      totalItems: posts.length,
      itemsPerPage,
    });

  const canCreatePost = hasPermission("posts", "create");

  const currentPosts = currentItems(posts);

  const handlePageChangeWithScroll = async (pageNumber: number) => {
    await handlePageChange(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadMore = (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      {selectedPost ? (
        <PostDetail post={selectedPost} onBack={handleBackToList} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="mb-6 text-3xl font-bold">Pet Stories</h1>

            {canCreatePost && <CreatePostModal />}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border border-gray-200 p-8 text-center">
              No posts available at this time.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>

              <div className="mt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChangeWithScroll}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostsPage;
