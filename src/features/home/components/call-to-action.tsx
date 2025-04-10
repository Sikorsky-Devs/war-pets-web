import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Готові допомогти?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Приєднуйтесь до нашої спільноти та допоможіть тваринам знайти
              новий дім
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg">Зареєструватися</Button>
            <Button variant="outline" size="lg">
              Дізнатися більше
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
