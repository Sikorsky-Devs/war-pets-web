import { ChevronRight } from "lucide-react";

const stepsData = [
  {
    number: 1,
    title: "Реєстрація",
    description:
      "Створіть акаунт як волонтер, притулок або звичайний користувач",
    showArrow: true,
  },
  {
    number: 2,
    title: "Створення оголошення",
    description:
      "Додайте фото, опис тварини, вік, стан здоров'я та інші характеристики",
    showArrow: true,
  },
  {
    number: 3,
    title: "Знайдіть новий дім",
    description:
      "Зв'яжіться з притулком або потенційним власником і допоможіть тварині знайти новий дім",
    showArrow: false,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="w-full bg-muted/50 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Як це працює
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Простий процес, який допомагає тваринам знайти новий дім
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.number}
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {step.showArrow && (
                <div className="absolute right-0 top-6 hidden md:block">
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
