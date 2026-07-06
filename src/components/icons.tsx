import type { SVGProps } from "react";

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Zeit wordmark — geometric sans logotype rendered as SVG text. */
export function ZeitLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" {...props}>
      <text
        x="0"
        y="31"
        fontFamily="var(--font-inter-display), Arial, sans-serif"
        fontSize="38"
        fontWeight="600"
        letterSpacing="-1.5"
      >
        zeit
      </text>
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.55-.14-2.85-.14C11.94 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 2c.3 2.2 1.6 3.7 3.7 3.9v2.5c-1.2.1-2.5-.3-3.7-1v6.7c0 3.6-2.6 6-5.9 6-2.9 0-5.3-2-5.3-5 0-3.1 2.6-5.2 6-4.7v2.7c-.4-.1-.9-.2-1.4-.2-1.3 0-2.3.9-2.3 2.2 0 1.4 1 2.3 2.3 2.3 1.6 0 2.5-1.1 2.5-2.9V2h1.9Z" />
    </svg>
  );
}

export function BehanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.3 11.4c.9-.4 1.4-1.1 1.4-2.2 0-2-1.5-2.6-3.3-2.6H1v10.8h5.5c2 0 3.7-.9 3.7-3.1 0-1.4-.6-2.4-1.9-2.9ZM3.4 8.5h2.2c.8 0 1.4.3 1.4 1.1 0 .9-.6 1.2-1.4 1.2H3.4V8.5Zm2.4 6.9H3.4v-2.6h2.5c.9 0 1.6.4 1.6 1.3 0 1-.7 1.3-1.7 1.3ZM23 12.6c0-2.4-1.4-4.4-3.9-4.4-2.5 0-4.2 1.9-4.2 4.3 0 2.5 1.6 4.2 4.2 4.2 2 0 3.3-.9 3.8-2.7h-2.1c-.2.6-.9.9-1.6.9-1.1 0-1.7-.6-1.8-1.7H23c0-.3 0-.6 0-.9Zm-5.5-.9c.1-.9.7-1.5 1.6-1.5.9 0 1.4.6 1.5 1.5h-3.1ZM15.2 7.2h4.8v1.1h-4.8V7.2Z" />
    </svg>
  );
}
