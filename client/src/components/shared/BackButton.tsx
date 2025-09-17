interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({
  onClick,
  label = "Kembali",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
}
