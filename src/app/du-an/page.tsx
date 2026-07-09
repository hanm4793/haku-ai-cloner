import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dự án | ànART®",
  description:
    "Mỗi dự án tại ànART là một hành trình sáng tạo, chuyển hóa từ nghệ thuật thành trải nghiệm.",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        {/* Hero */}
        <section className="aa-container pt-36 md:pt-44">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="aa-reveal">
              <h1 className="text-[clamp(3.5rem,7vw,7.75rem)] font-medium uppercase leading-[0.95] tracking-tight text-white">
                Dự án
              </h1>
            </div>
            <div className="aa-reveal flex flex-col gap-8" style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className="text-[clamp(1.1rem,1.55vw,1.5rem)] font-medium uppercase leading-[1.4] text-white">
                Mỗi dự án tại ànART là một hành trình sáng tạo, chuyển hóa từ
                nghệ thuật thành trải nghiệm.
              </p>
              <p className="text-[clamp(1.1rem,1.55vw,1.5rem)] font-medium uppercase leading-[1.4] text-white">
                Chúng tôi luôn theo đuổi những giá trị có khả năng chạm đến cảm
                xúc tạo nên các trải nghiệm độc đáo — nơi hình ảnh, không gian,
                câu chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
              </p>
              <p className="text-base font-bold text-white">
                — ànART <sup className="text-[0.6em]">®</sup>
              </p>
            </div>
          </div>
        </section>

        {/* Filter + grid */}
        <section className="aa-container pt-14">
          <ProjectsExplorer />
        </section>
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
