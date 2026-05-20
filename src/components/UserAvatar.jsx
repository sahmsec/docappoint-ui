'use client';

import { useEffect, useMemo, useState } from 'react';
import { User } from 'lucide-react';

function getInitials(name) {
  if (!name) return '';

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase() || '').join('');
}

export default function UserAvatar({
  src,
  name,
  size = 'md',
  className = '',
  fallbackClassName = '',
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = useMemo(() => getInitials(name), [name]);
  const normalizedSrc = typeof src === 'string' ? src.trim() : '';

  const sizeClasses = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-sm',
    lg: 'w-24 h-24 text-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-10 h-10',
  };

  const avatarSizeClass = sizeClasses[size] || sizeClasses.md;
  const iconSizeClass = iconSizes[size] || iconSizes.md;
  const sharedClassName = `${avatarSizeClass} shrink-0 rounded-full object-cover ${className}`.trim();

  if (normalizedSrc && !hasError) {
    return (
      <img
        src={normalizedSrc}
        alt={name || 'User avatar'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={sharedClassName}
      />
    );
  }

  return (
    <div
      aria-label={name || 'User avatar'}
      className={`${avatarSizeClass} shrink-0 rounded-full bg-[#11281F] text-white flex items-center justify-center font-semibold ${fallbackClassName}`.trim()}
    >
      {initials ? <span>{initials}</span> : <User className={iconSizeClass} />}
    </div>
  );
}
