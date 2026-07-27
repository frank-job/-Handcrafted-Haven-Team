export default function HavenLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Circle mark: mobile only */}
      <svg
        className="sm:hidden w-12 h-12"
        viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#000" />
        <text x="16" y="22" textAnchor="middle" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fill="white">H</text>
      </svg>
      {/* Wordmark: sm and up only */}
      <div className="hidden sm:flex items-baseline gap-1 whitespace-nowrap">
        <span className="text-[25px] font-medium text-black">Handcrafted</span>
        <span className="text-[25px] font-medium italic text-blue-600 font-serif">Haven</span>
      </div>
    </div>
  );
}