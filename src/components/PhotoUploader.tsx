import { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from "react"

export interface PhotoUploaderProps {
  label?: string
  name: string
  acceptedTypes?: string[]
  required?: boolean
  error?: string
  value?: File[]
  onChange?: (files: File[]) => void
}

export interface PhotoUploaderRef {
  getFiles: () => File[]
  clear: () => void
}

const PhotoUploader = forwardRef<PhotoUploaderRef, PhotoUploaderProps>(({
  label = "Photos",
  name,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  required = false,
  error,
  value = [],
  onChange,
}, ref) => {
  const [photos, setPhotos] = useState<File[]>(value || [])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const shouldShowError = !!error

  useImperativeHandle(ref, () => ({
    getFiles: () => photos,
    clear: () => {
      setPhotos([])
      setPreviews([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      onChange?.([])
    }
  }), [photos, onChange])

  const generatePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }, [])

  useEffect(() => {
    if (value && value.length !== photos.length) {
      setPhotos(value)
      const generatePreviews = async () => {
        const newPreviews = await Promise.all(
          value.map(file => generatePreview(file))
        )
        setPreviews(newPreviews)
      }
      generatePreviews()
    }
  }, [value, photos.length, generatePreview])

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    const validFiles: File[] = []
    const newPreviews: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!acceptedTypes.includes(file.type)) {
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
    onChange?.(updatedPhotos)
  }, [photos, previews, acceptedTypes, generatePreview, name])

  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex justify-between">
        <div className="w-24 h-24 border border-gray-500 [border-style:solid] rounded-md flex items-center justify-center bg-red-200">
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
        
        <div className="w-24 h-24 border border-gray-500 [border-style:solid] rounded-md flex items-center justify-center bg-green-200">
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
        
        <div 
            className="w-24 h-24 border border-gray-500 [border-style:solid] rounded-md flex items-center justify-center"
            onClick={openFileSelector}
          >
            <span className="text-xs text-gray-500">Add Photo</span>
          </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
      {shouldShowError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
})

PhotoUploader.displayName = 'PhotoUploader'

export default PhotoUploader