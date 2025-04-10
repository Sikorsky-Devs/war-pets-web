import {
  DollarSign,
  Heart,
  Home,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";

const featuresData = [
  {
    icon: Search,
    title: "Зручний пошук",
    description:
      "Фільтруйте оголошення за видом тварини, віком, станом здоров'я та місцем розташування",
  },
  {
    icon: Home,
    title: "Кабінет притулку",
    description:
      "Управління оголошеннями, прийом тварин від волонтерів, статистика",
  },
  {
    icon: Users,
    title: "Акаунт волонтера",
    description: "Можливість допомагати притулкам, передавати знайдених тварин",
  },
  {
    icon: Heart,
    title: "Улюблені оголошення",
    description:
      "Зберігайте оголошення, які вас зацікавили, щоб повернутися до них пізніше",
  },
  {
    icon: DollarSign,
    title: "Донати",
    description:
      "Можливість підтримати притулок або конкретну тварину фінансово",
  },
  {
    icon: MessageSquare,
    title: "Pet Stories",
    description:
      "Розділ, де користувачі діляться історіями про своїх вихованців після притулку",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Можливості
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Все, що потрібно для допомоги тваринам
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Наша платформа об&#39;єднує всіх, хто хоче допомогти безпритульним
              тваринам
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-5"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
