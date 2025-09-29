import React from 'react'

interface PhotoPreviewProps {
  src: string
  alt: string
  className?: string
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ src, alt, className = '' }) => {
  const baseClasses = 'w-24 h-24 border border-gray-500 [border-style:solid] rounded-md flex items-center justify-center'
  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses}>
         {src ? (
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
          ) : (
            <span className="text-xs text-gray-500">{alt}</span>
          )}
    </div>
  )
}

export default PhotoPreview