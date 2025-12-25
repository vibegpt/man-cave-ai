import Link from "next/link";

export default function Home() {
  const pages = [
    { slug: "basement-man-cave-ideas", title: "Basement Man Cave Ideas" },
    { slug: "garage-man-cave", title: "Garage Man Cave" },
    { slug: "golf-simulator-man-cave", title: "Golf Simulator Man Cave" },
    { slug: "man-cave-bar", title: "Man Cave Bar" },
    { slug: "man-cave-decor", title: "Man Cave Decor" },
    { slug: "man-cave-furniture", title: "Man Cave Furniture" },
    { slug: "man-cave-gifts", title: "Man Cave Gifts" },
    { slug: "man-cave-ideas", title: "Man Cave Ideas" },
    { slug: "man-cave-lighting", title: "Man Cave Lighting" },
    { slug: "man-cave-office", title: "Man Cave Office" },
    { slug: "man-cave-shed", title: "Man Cave Shed" },
    { slug: "man-cave-signs", title: "Man Cave Signs" },
    { slug: "man-cave-storage", title: "Man Cave Storage" },
    { slug: "man-cave-wall-decor", title: "Man Cave Wall Decor" },
    { slug: "outdoor-man-cave", title: "Outdoor Man Cave" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ManCaveAI
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">
              Your Ultimate Guide to Creating the Perfect Man Cave
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              AI-Powered Man Cave Ideas, Tips & Inspiration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-zinc-200 dark:border-zinc-700"
              >
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {page.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Explore ideas and tips →
                </p>
              </Link>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Ready to Build Your Dream Man Cave?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Browse our comprehensive guides covering everything from basement conversions to outdoor retreats.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/man-cave-ideas"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Start Exploring
              </Link>
              <Link
                href="/man-cave-decor"
                className="px-6 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                View Decor Ideas
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
            <p>Powered by AI • Fresh Content • Expert Tips</p>
          </div>
        </div>
      </main>
    </div>
  );
}
