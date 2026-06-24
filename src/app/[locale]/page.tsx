import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutCTA from "@/components/AboutCTA";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <AboutCTA />
    </main>
  );
}
