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
}) => {

  return (
    <div className="mb-4">
      <span className="font-bold text-gray-700 block mb-2">{label}:</span>
      <div className="grid grid-cols-2 gap-2">
        <PhotoPreview
            key="photo-1"
            src={photos[0]}
            alt="Photo 1"
            className="bg-red-200"
        />
        <PhotoPreview
            key="photo-2"
            src={photos[1]}
            alt="Photo 2"
            className="bg-green-200"
        />
      </div>
    </div>
  )
}

export default PhotoPreviewGrid