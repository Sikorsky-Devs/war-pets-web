const statsData = [
  { value: "5,000+", label: "Врятованих тварин" },
  { value: "200+", label: "Притулків" },
  { value: "1,500+", label: "Волонтерів" },
  { value: "10,000+", label: "Користувачів" },
];

const Stats = () => {
  return (
    <section className="w-full border-b border-t py-12 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
