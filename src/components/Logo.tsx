export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Garage door with AI elements */}
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Garage door shape */}
          <path 
            d="M8 12L20 4L32 12V34C32 35.1046 31.1046 36 30 36H10C8.89543 36 8 35.1046 8 34V12Z" 
            fill="#f2700d"
          />
          {/* Horizontal lines (garage door slats) */}
          <line x1="11" y1="16" x2="29" y2="16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="20" x2="29" y2="20" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="24" x2="29" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="28" x2="29" y2="28" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          {/* AI circuit pattern overlay */}
          <circle cx="15" cy="18" r="1.5" fill="#fff" opacity="0.8"/>
          <circle cx="25" cy="22" r="1.5" fill="#fff" opacity="0.8"/>
          <circle cx="20" cy="26" r="1.5" fill="#fff" opacity="0.8"/>
          <line x1="15" y1="18" x2="25" y2="22" stroke="#fff" strokeWidth="0.8" opacity="0.6"/>
          <line x1="25" y1="22" x2="20" y2="26" stroke="#fff" strokeWidth="0.8" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold text-white tracking-tight">
          ManCave<span className="text-orange-500">AI</span>
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Design Generator</span>
      </div>
    </div>
  );
}
