import Image from "next/image";

import { Button } from "@/components/ui/button";
import IMAGES from "@/constants/images";

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
              <Button size="lg">Знайти тварину</Button>
              <Button variant="outline" size="lg">
                Я знайшов тварину
              </Button>
            </div>
          </div>
          <div className="relative order-1 order-first h-[300px] overflow-hidden rounded-xl sm:h-[400px] lg:order-last lg:h-[500px]">
            <Image
              src={IMAGES.PET_HERO}
              alt="Щасливі врятовані тварини"
              fill
              className="object-cover md:object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
