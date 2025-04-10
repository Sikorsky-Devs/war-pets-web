import Image from "next/image";

import { Button } from "@/components/ui/button";

const storiesData = [
  {
    title: "Історія Барсика",
    description:
      "Барсик був знайдений на вулиці після обстрілів. Завдяки платформі, він знайшов нову родину, яка його дуже любить. Тепер він щасливий і здоровий!",
    author: "Олена К.",
    location: "Київ",
  },
  {
    title: "Історія Мурки",
    description:
      "Мурка була знайдена у підвалі зруйнованого будинку. Зараз вона живе у новій родині і має багато іграшок та смаколиків.",
    author: "Сергій П.",
    location: "Львів",
  },
  {
    title: "Історія Рекса",
    description:
      "Рекс був покинутий господарями під час евакуації. Завдяки нашій платформі, його знайшли волонтери і передали до нової родини.",
    author: "Марія Т.",
    location: "Одеса",
  },
];

const PetStories = () => {
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
          {storiesData.map((story, index) => (
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
              <h3 className="text-xl font-bold">{story.title}</h3>
              <p className="text-sm text-muted-foreground">
                &#34;{story.description}&#34;
              </p>
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Аватар користувача"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{story.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {story.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline">Більше історій</Button>
        </div>
      </div>
    </section>
  );
};

export default PetStories;
