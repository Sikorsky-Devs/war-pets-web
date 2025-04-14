import { useParams } from "next/navigation";

import CommentForm from "@/features/shelter/components/comment-form";
import CommentsList from "@/features/shelter/components/comments-list";
import useCommentsQuery from "@/features/shelter/hooks/use-comments-query";
import { hasPermission } from "@/permissions";
import useAuthStore from "@/store/use-auth-store";

const CommentsSection = () => {
  const { user } = useAuthStore();
  const { id } = useParams();

  const { canLeftComment } = useCommentsQuery(id as string);

  const permission = hasPermission(user, "comments", "create");

  return (
    <div className="space-y-4">
      {canLeftComment && permission && <CommentForm />}
      <CommentsList />
    </div>
  );
};

export default CommentsSection;
