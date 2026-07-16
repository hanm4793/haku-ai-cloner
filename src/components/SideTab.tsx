/** Fixed blue tab on the right viewport edge — "( Creative Hub x Experiences ) àA." */
export function SideTab() {
  return (
    <div className="fixed right-0 top-[345px] z-30 hidden lg:block" aria-hidden>
      <div className="flex flex-col items-center gap-4 bg-aa-blue px-2.5 py-5">
        <span
          className="text-lg font-medium leading-none text-white"
          style={{ writingMode: "sideways-lr" }}
        >
          )
        </span>
        <span
          className="text-[0.7rem] font-medium tracking-wide text-white lg:text-[0.79rem]"
          style={{ writingMode: "sideways-lr" }}
        >
          Creative Hub
          <br />✕ Experiences
        </span>
        <span
          className="text-lg font-medium leading-none text-white"
          style={{ writingMode: "sideways-lr" }}
        >
          (
        </span>
        <span
          className="text-sm font-black text-white"
          style={{ writingMode: "sideways-lr" }}
        >
          àA.
        </span>
      </div>
    </div>
  );
}
