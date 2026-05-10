// src/assets/icons/CreatorOSIcon.jsx
// Custom SVG icon for the app (used as favicon and branding)
function CreatorOSIcon({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#iconGradient)" />
      <path
        d="M8 16L14 10L20 16L14 22L8 16Z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="20" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

export default CreatorOSIcon
