import { Send, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useAddCommentMutation from "@/features/shelter/hooks/mutations/use-add-command.mutation";

const CommentForm = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const { addComment, isAddingComment } = useAddCommentMutation(
    id as string,
    rating,
    newComment,
  );

  const handleCommentSubmit = () => {
    addComment();
    setNewComment("");
    setRating(0);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1">
            <span className="text-sm font-medium">Оцінка:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-5 w-5 ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="Ваш коментар"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleCommentSubmit}
          isLoading={isAddingComment}
          disabled={!newComment.trim() || rating === 0}
          className="w-full sm:w-auto"
          icon={<Send />}
        >
          Залишити коментар
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
