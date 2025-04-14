import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import IMAGES from "@/constants/images";
import { Routes } from "@/constants/navigation";

const Hero = () => {
  return (
    <section className="w-full bg-muted/50 py-4 md:py-12 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Допоможіть тваринам знайти новий дім
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Універсальна платформа, де кожен може зробити свій внесок у
              порятунок безпритульних тварин — передати знайдену тварину до
              притулку або взяти звідти нового улюбленця.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={Routes.Adverts}
                className={buttonVariants({ size: "lg" })}
              >
                Знайти тварину
              </Link>
              <Link
                href={Routes.Shelters}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Я знайшов тварину
              </Link>
            </div>
          </div>
          <div className="relative order-1 order-first h-[300px] overflow-hidden rounded-xl sm:h-[400px] lg:order-last lg:h-[500px]">
            <Image
              src={IMAGES.PET_HERO}
              alt="Щасливі врятовані тварини"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
