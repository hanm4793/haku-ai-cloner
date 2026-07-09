import { CLIENT_LINES } from "@/lib/data";

/** Centered client roster — "Vietnam Airlines | VietcomBank | ..." */
export function Clients() {
  return (
    <section className="aa-container pb-32 pt-8">
      <div className="aa-reveal mx-auto max-w-4xl text-center">
        <span className="mx-auto block h-px w-8 bg-white/60" />
        <div className="mt-10 space-y-2">
          {CLIENT_LINES.map((line, i) => (
            <p
              key={i}
              className="text-[clamp(1.35rem,2.5vw,2.375rem)] font-extrabold leading-snug text-white"
            >
              {line.map((client, j) => (
                <span key={client}>
                  {j > 0 && <span className="mx-3 font-light text-white/70">|</span>}
                  {client}
                </span>
              ))}
            </p>
          ))}
          <p className="pt-1 text-[clamp(1.2rem,2vw,1.9rem)] font-light text-white/90">
            and MORE...
          </p>
        </div>
        <span className="mx-auto mt-10 block h-px w-8 bg-white/60" />
      </div>
    </section>
  );
}
