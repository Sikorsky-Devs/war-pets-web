"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import useSheltersQuery from "@/features/shelters/hooks/use-shelters-query";

const sheltersCount = 8;

const Shelters = () => {
  const { shelters } = useSheltersQuery(sheltersCount);

  return (
    <section id="shelters" className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Притулки-партнери
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Ми співпрацюємо з найкращими притулками по всій Україні
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {shelters.map((shelter, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <UserAvatar
                className="size-24"
                size={24}
                image={shelter.avatarLink}
                isShelter
              />
              <h3 className="text-md w-2/3 text-center font-medium">
                {shelter.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={Routes.Shelters}
            className={buttonVariants({ variant: "outline" })}
          >
            Переглянути всі притулки
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shelters;
