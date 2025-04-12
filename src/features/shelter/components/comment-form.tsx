import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { addComment } from "@/api/comments/comments.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CommentForm = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      addComment({ stars: rating, content: newComment }, id as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setNewComment("");
      setRating(0);
      toast.success("Коментар успішно додано");
    },
    onError: () => {
      toast.error("Не вдалося залишити коментар");
    },
  });

  const handleCommentSubmit = async () => {
    await mutateAsync();
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
          isLoading={isPending}
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
