/** Fixed blue tab on the right viewport edge — "( Creative Hub x Experiences ) àA." */
export function SideTab() {
  return (
    <div className="fixed right-0 top-[190px] z-30 hidden lg:block" aria-hidden>
      <div className="flex flex-col items-center gap-3 bg-aa-blue px-1.5 py-4">
        <span
          className="text-[0.625rem] font-medium tracking-wide text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          ( Creative Hub ✕ Experiences )
        </span>
        <span
          className="text-[0.7rem] font-black text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          àA.
        </span>
      </div>
    </div>
  );
}
