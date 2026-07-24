/** Fixed blue tab on the right viewport edge — "( Creative Hub x Experiences ) àA." */
export function SideTab() {
  return (
    <div className="fixed right-0 top-[345px] z-30 hidden lg:block" aria-hidden>
      {/* Bar width tracks the site's horizontal gutter exactly (max 46px),
          so it sits flush in the same margin strip as the page content. */}
      <div
        className="flex flex-col items-center gap-4 bg-aa-blue py-5"
        style={{ width: "clamp(1.25rem, 2.4vw, 2.875rem)" }}
      >
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
        {/* Logo stays upright (normal reading direction), centered in the bar */}
        <span className="text-sm font-black leading-none text-white">àA.</span>
      </div>
    </div>
  );
}
