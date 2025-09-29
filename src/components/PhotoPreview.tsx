import React from 'react'

interface PhotoPreviewProps {
  src: string
  alt: string
  className?: string
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ src, alt, className = '' }) => {
  const baseClasses = 'bg-red-200 rounded-lg overflow-hidden'
  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-24 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          target.parentElement!.className = target.parentElement!.className.replace('bg-red-200', 'bg-green-200')
        }}
      />
    </div>
  )
}

export default PhotoPreview