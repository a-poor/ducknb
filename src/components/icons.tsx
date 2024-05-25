export function PlayCursorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <polygon
        points="6 3 20 12 6 21 6 3"
        transform="translate(0, 1) scale(1, 0.9)"
      />
      <g transform="translate(7, 2.5) scale(0.8, 0.8)">
        <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
        <path d="M7 22h1a4 4 0 0 0 4-4v-1" />
        <path d="M7 2h1a4 4 0 0 1 4 4v1" />
      </g>
    </svg>
  );
}
