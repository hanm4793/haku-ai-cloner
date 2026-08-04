import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { GalleryMarquee } from "@/components/GalleryMarquee";
import { ServicesHome } from "@/components/ServicesHome";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Clients } from "@/components/Clients";
import { Define } from "@/components/Define";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";
import { getFeaturedProjects, getServices, getHomePage } from "@/lib/cms";

export default async function Home() {
  const [projects, services, homePage] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getHomePage(),
  ]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <GalleryMarquee />
        <ServicesHome services={services} />
        <section className="aa-container pb-12 pt-0 md:pb-28 lg:pt-4">
          <div className="grid lg:grid-cols-12 lg:gap-5">
            <p className="aa-reveal aa-eyebrow mb-6 text-[1.125rem] font-medium uppercase leading-[1.35] lg:col-start-3 lg:col-span-4 lg:mb-8 lg:text-base lg:normal-case">
              Dự án / khách hàng nổi bật
            </p>
          </div>
          <ProjectsGrid projects={projects} />
        </section>
        <Clients clientLines={homePage.clientLines} />
        <Define />
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
