import "md-editor-rt/lib/style.css";

import { PlusIcon } from "lucide-react";
import { MdEditor } from "md-editor-rt";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreatePostMutation from "@/features/posts/hooks/mutations/use-create-post.mutation";
import { toast } from "@/lib/toast";

const CreatePostModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { createPost, isPending } = useCreatePostMutation();

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        setError("Заповніть всі поля");
        return;
      }

      await createPost({
        title,
        content,
      });
      setTitle("");
      setContent("");
      setError("");
      setOpen(false);
    } catch {
      toast.error("Помилка при створенні поста");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Створити</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Поділитись історією</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Input
            label="Заголовок"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
            placeholder="Введіть заголовок"
          />

          <div className="col-span-3 overflow-hidden rounded-md border">
            <MdEditor
              language="en-US"
              modelValue={content}
              onChange={setContent}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Скасувати</Button>
          </DialogClose>
          <Button isLoading={isPending} type="submit" onClick={handleSubmit}>
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
