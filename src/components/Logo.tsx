export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Garage door with AI elements */}
      <div className="relative">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background square with rounded corners */}
          <rect x="2" y="2" width="40" height="40" rx="8" fill="#dc2626"/>
          
          {/* Inner darker rectangle */}
          <rect x="6" y="6" width="32" height="32" rx="4" fill="#0a0a0a"/>
          
          {/* Garage door slats */}
          <rect x="10" y="12" width="24" height="4" rx="1" fill="#dc2626" opacity="0.9"/>
          <rect x="10" y="18" width="24" height="4" rx="1" fill="#dc2626" opacity="0.7"/>
          <rect x="10" y="24" width="24" height="4" rx="1" fill="#dc2626" opacity="0.5"/>
          <rect x="10" y="30" width="24" height="4" rx="1" fill="#dc2626" opacity="0.3"/>
          
          {/* AI circuit dots */}
          <circle cx="15" cy="14" r="1.5" fill="#fff"/>
          <circle cx="29" cy="20" r="1.5" fill="#fff"/>
          <circle cx="22" cy="26" r="1.5" fill="#fff"/>
          
          {/* Connection lines */}
          <line x1="15" y1="14" x2="29" y2="20" stroke="#fff" strokeWidth="0.5" opacity="0.4"/>
          <line x1="29" y1="20" x2="22" y2="26" stroke="#fff" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-white tracking-tight">
          Man<span className="text-red-500">Cave</span>AI
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-0.5">Design Generator</span>
      </div>
    </div>
  );
}
