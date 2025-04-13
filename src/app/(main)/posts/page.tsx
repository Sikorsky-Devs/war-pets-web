import {type Metadata} from "next";

import PostsPage from "@/features/posts/posts.page";

export const metadata: Metadata = {
  title: "Pet stories",
}

const Posts = () => {
  return <PostsPage />
}

export default Posts;