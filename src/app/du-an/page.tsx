import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";
import { getProjects, getCategoryNames } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Dự án | ànART®",
  description:
    "Mỗi dự án tại ànART là một hành trình sáng tạo, chuyển hóa từ nghệ thuật thành trải nghiệm.",
};

export default async function ProjectsPage() {
  const [projects, categoryNames] = await Promise.all([getProjects(), getCategoryNames()]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        <ProjectsExplorer projects={projects} categoryNames={categoryNames} />
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
