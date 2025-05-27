import { format } from "date-fns/format";
import { uk } from "date-fns/locale/uk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { type Post } from "@/types/models/post";
import { getUserName } from "@/utils/user-utils";

interface PostCardProps {
  post: Post;
  onReadMore: (id: string) => void;
}

const PostCard = ({ post, onReadMore }: PostCardProps) => {
  const userName = getUserName(
    post.user.name,
    post.user.firstName,
    post.user.lastName,
  );
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-col gap-4 pb-2">
        <div className="flex items-center">
          <UserAvatar className="mr-2 size-10" image={post.user.avatarLink} />
          <div>
            <p className="text-semibold text-sm text-gray-500">{userName}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(post.createdAt), "dd MMMM yyyy 'г.'", {
                locale: uk,
              })}
            </p>
          </div>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="relative max-h-52 overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-16 w-full bg-gradient-to-t from-white to-transparent" />

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="mb-4 mt-6 text-2xl font-bold" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="mb-3 mt-5 text-xl font-bold" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mb-2 mt-4 text-lg font-bold" {...props} />
            ),
            p: ({ node, ...props }) => <p className="my-3" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="my-3 list-disc pl-6" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-3 list-decimal pl-6" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:underline" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-4 border-l-4 border-gray-300 pl-4 italic"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code className="rounded bg-gray-100 px-1 py-0.5" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="my-4 overflow-auto rounded-md bg-gray-100 p-4"
                {...props}
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </CardContent>
      <CardFooter className="absolute bottom-0 z-40 flex w-full justify-between gap-3 self-end bg-gray-50 pt-5">
        <Button onClick={() => onReadMore(post.id)}>Детальніше</Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
