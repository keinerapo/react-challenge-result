import React from 'react'
import PhotoPreview from './PhotoPreview'

interface PhotoPreviewGridProps {
  label: string;
  photos?: string[];
  className?: string;
}

const PhotoPreviewGrid: React.FC<PhotoPreviewGridProps> = ({ 
  label, 
  photos = [], 
  className = '' 
}) => {
  if (photos.length === 0) {
    return null
  }

  return (
    <div className={`mb-4 ${className}`}>
      <span className="font-bold text-gray-700 block mb-2">{label}:</span>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <PhotoPreview
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="bg-red-200"
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoPreviewGrid