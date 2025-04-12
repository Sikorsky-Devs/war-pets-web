import { useParams } from "next/navigation";

import CommentForm from "@/features/shelter/components/comment-form";
import CommentsList from "@/features/shelter/components/comments-list";
import useCommentsQuery from "@/features/shelter/hooks/use-comments-query";
import { hasPermission } from "@/permissions";

const CommentsSection = () => {
  const { id } = useParams();

  const { canLeftComment } = useCommentsQuery(id as string);

  const permission = hasPermission("comments", "create");

  return (
    <div className="space-y-4">
      {canLeftComment && permission && <CommentForm />}
      <CommentsList />
    </div>
  );
};

export default CommentsSection;
