import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { ChevronLeftIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { type Post } from "@/types/post";
import { getUserName } from "@/utils/user-utils";

const PostDetail = ({ post, onBack }: { post: Post, onBack: () => void }) => {
  const userName = getUserName(post.user.name, post.user.firstName, post.user.lastName)

  return (
    <div>
      <Button
        icon={<ChevronLeftIcon />}
        variant="ghost" className="mb-4"
        onClick={onBack}
      >
        Повернутися
      </Button>

      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center">
          <UserAvatar className="size-12 mr-4" image={post.user.avatarLink} />
          <div>
            <p className="text-md text-gray-500">
              {userName}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(post.createdAt), "dd MMMM yyyy 'г.'", { locale: uk })}
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="my-3" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-3" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-3" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
            code: ({ node, ...props }) => <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />,
            pre: ({ node, ...props }) => <pre className="bg-gray-100 p-4 rounded-md overflow-auto my-4" {...props} />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostDetail;