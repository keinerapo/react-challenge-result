import React, { useState, useRef, useCallback, useEffect } from "react"

export interface PhotoUploaderProps {
  label?: string
  name: string
  acceptedTypes?: string[]
  required?: boolean
  error?: string
  maxPhotos?: number
  maxDimensions?: { width: number; height: number }
  onValidationChange?: (fieldName: string, isValid: boolean, hasError: boolean) => void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  label = "Photos",
  name,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  required = false,
  error,
  maxPhotos = 2,
  maxDimensions = { width: 500, height: 500 },
  onValidationChange
}) => {
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [localError, setLocalError] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fieldError = localError || error
  const shouldShowError = !!fieldError

  const generatePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }, [])

  const validateImageDimensions = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const valid = img.width <= maxDimensions.width && img.height <= maxDimensions.height
        resolve(valid)
      }
      img.onerror = () => resolve(false)
      img.src = URL.createObjectURL(file)
    })
  }, [maxDimensions])

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    const validFiles: File[] = []
    const newPreviews: string[] = []
    for (let i = 0; i < Math.min(files.length, maxPhotos - photos.length); i++) {
      const file = files[i]
      if (!acceptedTypes.includes(file.type)) {
        const errorMsg = `Invalid file type. Please use: ${acceptedTypes.join(', ')}`
        setLocalError(errorMsg)
        onValidationChange?.(name, false, true)
        return
      }
      const isDimensionValid = await validateImageDimensions(file)
      if (!isDimensionValid) {
        const errorMsg = `Image dimensions must be max ${maxDimensions.width}x${maxDimensions.height}px`
        setLocalError(errorMsg)
        onValidationChange?.(name, false, true)
        return
      }
      validFiles.push(file)
      const preview = await generatePreview(file)
      newPreviews.push(preview)
    }
    const updatedPhotos = [...photos, ...validFiles]
    const updatedPreviews = [...previews, ...newPreviews]
    setPhotos(updatedPhotos)
    setPreviews(updatedPreviews)
    if (validFiles.length > 0) {
      setLocalError(undefined)
      const hasError = false
      const isValid = Boolean(!required || updatedPhotos.length > 0)
      onValidationChange?.(name, isValid, hasError)
    }
  }, [photos, previews, acceptedTypes, generatePreview, name, validateImageDimensions, maxPhotos, maxDimensions])

  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  useEffect(() => {
    if (required && photos.length === 0 && !localError) {
      const errorMsg = `${label} is required`
      setLocalError(errorMsg)
      onValidationChange?.(name, false, true)
    } else if (!required || photos.length > 0) {
      if (localError && localError.includes('required')) {
        setLocalError(undefined)
        const isValid = Boolean(!required || photos.length > 0)
        onValidationChange?.(name, isValid, false)
      }
    }
  }, [photos.length, required, label, localError, name, onValidationChange])

  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex gap-2">
        <div className="w-24 h-24 border border-grey-500 rounded-md flex items-center justify-center overflow-hidden">
          {previews[0] ? (
            <img 
              src={previews[0]} 
              alt="Photo 1" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500">Photo 1</span>
          )}
        </div>
        
        <div className="w-24 h-24 border border-grey-500 rounded-md flex items-center justify-center overflow-hidden">
          {previews[1] ? (
            <img 
              src={previews[1]} 
              alt="Photo 2" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500">Photo 2</span>
          )}
        </div>
        
        {photos.length < maxPhotos && (
          <div 
            className="w-24 h-24 border border-grey-500 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={openFileSelector}
          >
            <span className="text-xs text-gray-500">Add Photo</span>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{fieldError}</p>}
    </div>
  )
}

export default PhotoUploader