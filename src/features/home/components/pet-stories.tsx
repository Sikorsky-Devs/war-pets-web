"use client";

import Image from "next/image";
import Link from "next/link";

import {buttonVariants} from "@/components/ui/button";
import {Routes} from "@/constants/navigation";
import usePostsQuery from "@/features/posts/hooks/use-posts-query";

const PetStories = () => {
  const { posts } = usePostsQuery();

  return (
    <section
      id="stories"
      className="w-full bg-muted/50 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Pet Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Історії успіху
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Історії тварин, які знайшли новий дім завдяки нашій платформі
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 rounded-xl border bg-background p-6"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=Історія ${index + 1}`}
                  alt={`Історія ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                &#34;{post.content}&#34;
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href={Routes.Posts} className={buttonVariants({ variant: "outline" })}>Більше історій</Link>
        </div>
      </div>
    </section>
  );
};

export default PetStories;
