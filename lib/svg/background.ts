export function renderBackground(width: number, height: number): string {
  return `
    <defs>
      <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e90ff"/>
        <stop offset="100%" stop-color="#0a3d6b"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#ocean)"/>
    <!-- sand -->
    <ellipse cx="${width * 0.2}" cy="${height}" rx="60" ry="12" fill="#c2a366" opacity="0.4"/>
    <ellipse cx="${width * 0.7}" cy="${height}" rx="80" ry="10" fill="#c2a366" opacity="0.3"/>
    <!-- seaweed -->
    <path d="M60,${height} Q55,${height - 40} 65,${height - 60} Q55,${height - 50} 60,${height - 30}" fill="none" stroke="#2d8a4e" stroke-width="3" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" values="-3,60,${height};3,60,${height};-3,60,${height}" dur="4s" repeatCount="indefinite"/>
    </path>
    <path d="M320,${height} Q315,${height - 30} 325,${height - 50} Q315,${height - 40} 320,${height - 25}" fill="none" stroke="#3a9e5c" stroke-width="2.5" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" values="2,320,${height};-2,320,${height};2,320,${height}" dur="3.5s" repeatCount="indefinite"/>
    </path>
  `;
}
