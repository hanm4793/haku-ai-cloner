import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Differentiator } from "@/components/Differentiator";
import { Scale } from "@/components/Scale";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Clients />
        <Differentiator />
        <Scale />
        <Services />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
