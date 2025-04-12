"use client";

import { Star } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const sheltersCount = 8;

const Shelters = () => {
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
          {Array.from({ length: sheltersCount }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=Притулок ${i + 1}`}
                  alt={`Притулок ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">Притулок {i + 1}</h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 3 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline">Переглянути всі притулки</Button>
        </div>
      </div>
    </section>
  );
};

export default Shelters;
