import React from 'react';

export function InstagramLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="20%" cy="105%" r="130%">
          <stop offset="0%" stopColor="#ffea70" />
          <stop offset="25%" stopColor="#f77737" />
          <stop offset="50%" stopColor="#e1306c" />
          <stop offset="75%" stopColor="#c13584" />
          <stop offset="100%" stopColor="#833ab4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export function FacebookLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        d="M13.5 8H15V5.5H13C10.8 5.5 10 6.8 10 9V10.5H8V13.5H10V20H13V13.5H15.2L15.6 10.5H13V9C13.01 8.4 13.2 8 13.5 8Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function TikTokLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#010101" />
      <path
        d="M16.6 8.2C15.5 8.1 14.5 7.4 14.1 6.3H11.5V15.2C11.4 16.4 10.4 17.3 9.2 17.2C8 17.1 7.1 16.1 7.2 14.9C7.3 13.7 8.3 12.8 9.5 12.9C9.8 12.9 10.1 13 10.4 13.2V10.4C10 10.3 9.6 10.3 9.2 10.3C6.7 10.3 4.7 12.3 4.7 14.8C4.7 17.3 6.7 19.3 9.2 19.3C11.7 19.3 13.7 17.3 13.7 14.8V10.5C15 11.4 16.5 11.9 18.1 11.9V9.3C17.5 9.3 17 8.9 16.6 8.2Z"
        fill="#25F4EE"
      />
      <path
        d="M17.1 8.7C16 8.6 15 7.9 14.6 6.8H12V15.7C11.9 16.9 10.9 17.8 9.7 17.7C8.5 17.6 7.6 16.6 7.7 15.4C7.8 14.2 8.8 13.3 10 13.4C10.3 13.4 10.6 13.5 10.9 13.7V10.9C10.5 10.8 10.1 10.8 9.7 10.8C7.2 10.8 5.2 12.8 5.2 15.3C5.2 17.8 7.2 19.8 9.7 19.8C12.2 19.8 14.2 17.8 14.2 15.3V11C15.5 11.9 17 12.4 18.6 12.4V9.8C18 9.8 17.5 9.4 17.1 8.7Z"
        fill="#FE2C55"
      />
      <path
        d="M16.8 8.4C15.7 8.3 14.7 7.6 14.3 6.5H11.8V15.4C11.7 16.6 10.7 17.5 9.5 17.4C8.3 17.3 7.4 16.3 7.5 15.1C7.6 13.9 8.6 13 9.8 13.1C10.1 13.1 10.4 13.2 10.7 13.4V10.6C10.3 10.5 9.9 10.5 9.5 10.5C7 10.5 5 12.5 5 15C5 17.5 7 19.5 9.5 19.5C12 19.5 14 17.5 14 15V10.7C15.3 11.6 16.8 12.1 18.4 12.1V9.5C17.8 9.5 17.3 9.1 16.8 8.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function YouTubeLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#FFFFFF" />
    </svg>
  );
}

export function TwitterXLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M17.5 5.5H19.5L14.9 10.7L20.2 17.5H15.8L12.4 13.1L8.5 17.5H6.5L11.4 11.9L6.3 5.5H10.8L13.8 9.5L17.5 5.5ZM16.8 16.3H17.9L9.6 6.6H8.4L16.8 16.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PinterestLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#E60023" />
      <path
        d="M12 6.5C8.96 6.5 6.5 8.96 6.5 12C6.5 14.33 7.95 16.32 10.01 17.11C9.96 16.68 9.93 16.03 10.04 15.56C10.14 15.13 10.69 12.8 10.69 12.8C10.69 12.8 10.52 12.46 10.52 11.96C10.52 10.8 11.19 9.93 12.03 9.93C12.74 9.93 13.08 10.46 13.08 11.1C13.08 11.82 12.62 12.88 12.38 13.9C12.18 14.73 12.79 15.4 13.6 15.4C15.08 15.4 16.22 13.84 16.22 11.59C16.22 9.61 14.79 8.23 12.78 8.23C10.43 8.23 9.07 9.99 9.07 11.81C9.07 12.52 9.34 13.28 9.68 13.69C9.75 13.77 9.76 13.84 9.74 13.92C9.68 14.17 9.54 14.73 9.51 14.86C9.47 15.03 9.35 15.08 9.18 15C8.07 14.48 7.37 12.87 7.37 11.59C7.37 8.89 9.33 6.5 13.04 6.5C16.02 6.5 18.35 8.62 18.35 11.41C18.35 14.37 16.49 16.73 13.91 16.73C13.05 16.73 12.24 16.28 11.96 15.75L11.43 17.78C11.24 18.51 10.71 19.41 10.35 19.98C10.88 20.14 11.44 20.23 12.02 20.23C16.57 20.23 20.25 16.55 20.25 12C20.25 7.45 16.57 3.77 12.02 3.77L12 6.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function RedditLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FF4500" />
      <path
        d="M18.5 12C18.5 11.3 17.9 10.7 17.2 10.7C16.9 10.7 16.6 10.8 16.3 11C15.3 10.3 13.9 9.8 12.3 9.8L13 6.5L15.3 7C15.3 7.6 15.8 8.1 16.5 8.1C17.1 8.1 17.6 7.6 17.6 7C17.6 6.3 17.1 5.8 16.5 5.8C16 5.8 15.5 6.1 15.4 6.6L12.8 6C12.7 6 12.6 6.1 12.5 6.2C12.4 6.3 12.4 6.4 12.4 6.5L11.6 10.2C10 10.2 8.6 10.7 7.6 11.4C7.3 11.2 7 11.1 6.7 11.1C6 11.1 5.4 11.7 5.4 12.4C5.4 12.9 5.7 13.4 6.1 13.6C6 13.9 6 14.1 6 14.4C6 16.7 8.7 18.5 12 18.5C15.3 18.5 18 16.7 18 14.4C18 14.1 18 13.9 17.9 13.6C18.3 13.3 18.5 12.8 18.5 12ZM9.5 13.5C9.5 12.9 10 12.5 10.5 12.5C11 12.5 11.5 12.9 11.5 13.5C11.5 14 11 14.5 10.5 14.5C10 14.5 9.5 14.1 9.5 13.5ZM14.3 16.3C13.6 16.7 12.8 16.9 12 16.9C11.2 16.9 10.4 16.7 9.7 16.3C9.5 16.2 9.5 15.9 9.6 15.7C9.7 15.5 10 15.5 10.2 15.6C10.7 15.9 11.3 16.1 12 16.1C12.7 16.1 13.3 15.9 13.8 15.6C14 15.5 14.3 15.5 14.4 15.7C14.5 15.9 14.5 16.2 14.3 16.3ZM13.5 14.5C13 14.5 12.5 14 12.5 13.5C12.5 12.9 13 12.5 13.5 12.5C14 12.5 14.5 12.9 14.5 13.5C14.5 14.1 14 14.5 13.5 14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ThreadsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M12.2 4C7.8 4 4.5 7.3 4.5 11.8C4.5 16.4 8 19.8 12.5 19.8C15.8 19.8 18.2 18 19 15.5L16.9 14.7C16.3 16.5 14.6 17.6 12.4 17.6C9.3 17.6 6.8 15.2 6.8 11.8C6.8 8.4 9.3 6.1 12.3 6.1C15.1 6.1 17.3 8.1 17.5 11.2C17.5 11.4 17.5 11.6 17.5 11.8C17.3 13.6 16.2 14.8 14.6 14.8C13.8 14.8 13.2 14.3 13.2 13.4V10.2C13.2 9.4 12.6 8.7 11.7 8.7C10.1 8.7 8.8 10.1 8.8 11.8C8.8 13.5 10.1 14.9 11.8 14.9C12.8 14.9 13.6 14.4 14.1 13.7C14.4 14.8 15.4 15.6 16.7 15.6C18.9 15.6 20.4 13.8 20.6 11.5C20.4 7.2 17 4 12.2 4ZM11.7 13.2C10.9 13.2 10.3 12.5 10.3 11.8C10.3 11.1 10.9 10.4 11.7 10.4C12.5 10.4 13.1 11.1 13.1 11.8C13.1 12.5 12.5 13.2 11.7 13.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ShareChatLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#2563EB" />
      <path
        d="M12 6.5C8.96 6.5 6.5 8.74 6.5 11.5C6.5 13.06 7.27 14.46 8.5 15.36V17.5L10.5 16.36C10.98 16.45 11.48 16.5 12 16.5C15.04 16.5 17.5 14.26 17.5 11.5C17.5 8.74 15.04 6.5 12 6.5ZM12 14.2C10.5 14.2 9.28 13 9.28 11.5C9.28 10 10.5 8.8 12 8.8C13.5 8.8 14.72 10 14.72 11.5C14.72 13 13.5 14.2 12 14.2Z"
        fill="#FFFFFF"
      />
      <circle cx="12" cy="11.5" r="1.3" fill="#F59E0B" />
    </svg>
  );
}

export function MojLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#E11D48" />
      <path
        d="M7 16.5V8.5L10.5 13.5L14 8.5V16.5H16.5V7H14.5L10.5 12.8L6.5 7H4.5V16.5H7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TelegramLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#229ED9" />
      <path
        d="M7.4 11.9L15.3 8.8C15.7 8.6 16.1 8.9 16 9.3L14.7 15.4C14.6 15.8 14.2 16 13.9 15.8L11.5 14L10.4 15.1C10.2 15.3 9.9 15.1 9.9 14.8L10.1 12.6L14.2 8.9C14.4 8.7 14.2 8.4 13.9 8.6L8.8 11.8L7.3 11.3C6.9 11.2 6.9 10.7 7.4 10.5L7.4 11.9Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SnapchatLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FFFC00" />
      <path
        d="M12 6.5C9.9 6.5 8.7 8 8.7 9.8C8.7 10.5 8.8 11.2 9 11.6C8.7 11.7 8.3 11.9 8 12.2C7.8 12.4 7.9 12.7 8.1 12.8C8.5 13 8.9 12.9 9.3 12.8C9.5 13.5 10 14.4 10.8 14.8C10.4 15 9.7 15.3 8.7 15.3C8.4 15.3 8.2 15.5 8.3 15.8C8.4 16.2 9.1 16.4 9.9 16.5C10.7 16.6 11.4 16.2 12 16.2C12.6 16.2 13.3 16.6 14.1 16.5C14.9 16.4 15.6 16.2 15.7 15.8C15.8 15.5 15.6 15.3 15.3 15.3C14.3 15.3 13.6 15 13.2 14.8C14 14.4 14.5 13.5 14.7 12.8C15.1 12.9 15.5 13 15.9 12.8C16.1 12.7 16.2 12.4 16 12.2C15.7 11.9 15.3 11.7 15 11.6C15.2 11.2 15.3 10.5 15.3 9.8C15.3 8 14.1 6.5 12 6.5Z"
        fill="#000000"
      />
      <path
        d="M12 7C10.2 7 9.2 8.3 9.2 9.8C9.2 10.5 9.3 11.1 9.5 11.5C9.3 11.6 8.8 11.8 8.5 12.1C8.8 12.3 9.2 12.3 9.7 12.2C9.9 13 10.4 14 11.1 14.4C10.7 14.6 9.8 14.9 8.9 14.9C9.2 15.4 10 15.6 10.7 15.7C11.5 15.8 12.2 15.4 12 15.4C11.8 15.4 12.5 15.8 13.3 15.7C14 15.6 14.8 15.4 15.1 14.9C14.2 14.9 13.3 14.6 12.9 14.4C13.6 14 14.1 13 14.3 12.2C14.8 12.3 15.2 12.3 15.5 12.1C15.2 11.8 14.7 11.6 14.5 11.5C14.7 11.1 14.8 10.5 14.8 9.8C14.8 8.3 13.8 7 12 7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function OkRuLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#EE8208" />
      <circle cx="12" cy="9" r="2.8" stroke="#FFFFFF" strokeWidth="1.8" />
      <path
        d="M8.5 14.5C9.5 15.3 10.7 15.8 12 15.8C13.3 15.8 14.5 15.3 15.5 14.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 16.5L8.5 18.5M14 16.5L15.5 18.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


