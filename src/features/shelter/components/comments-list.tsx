import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import useCommentsQuery from "@/features/shelter/hooks/use-comments-query";
import { getUserName } from "@/utils/user-utils";

const CommentsList = () => {
  const { id } = useParams();

  const { comments } = useCommentsQuery(id as string);

  if (comments.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          <p className="text-lg font-medium">Відгуків поки що немає</p>
          <p className="text-sm text-muted-foreground">
            Будьте першим, хто залишить відгук
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        const volunteer = comment.volunteer;
        return (
          <Card key={comment.content}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserAvatar image={volunteer.avatarLink} />
                  <span className="font-medium">
                    {getUserName(
                      volunteer.name,
                      volunteer.firstName,
                      volunteer.lastName,
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < comment.stars
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardDescription>
                {format(comment.createdAt, "dd MMMM yyyy", { locale: uk })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{comment.content}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommentsList;
