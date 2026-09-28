import { useState, useEffect } from 'react';
import Image from 'next/image';

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&q=80';

export default function SafeImage({ src, alt, fallbackSrc = DEFAULT_FALLBACK, className, fill, width, height, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      unoptimized
      fill={fill}
      width={width}
      height={height}
      {...props}
    />
  );
}
