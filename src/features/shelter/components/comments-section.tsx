import { useParams } from "next/navigation";

import CommentForm from "@/features/shelter/components/comment-form";
import CommentsList from "@/features/shelter/components/comments-list";
import useCommentsQuery from "@/features/shelter/hooks/use-comments-query";

const CommentsSection = () => {
  const { id } = useParams();

  const { canLeftComment } = useCommentsQuery(id as string);

  return (
    <div className="space-y-4">
      {canLeftComment && <CommentForm />}
      <CommentsList />
    </div>
  );
};

export default CommentsSection;
