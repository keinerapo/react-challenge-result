import PhotoUploader from "../components/PhotoUploader"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { PHOTO_UPLOADER_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcPhotoUploader extends AbstractReactWebComponent {
  
  getComponent(): React.ComponentType<any> {
    return PhotoUploader
  }

  getProps() {
    const acceptedTypes = this.getAttribute(PHOTO_UPLOADER_ATTRIBUTES.ACCEPTED_TYPES)
    
    return {
      label: this.getAttribute(PHOTO_UPLOADER_ATTRIBUTES.LABEL) || 'Photos',
      name: this.getAttribute(PHOTO_UPLOADER_ATTRIBUTES.NAME) || 'photos',
      acceptedTypes: acceptedTypes ? acceptedTypes.split(',').map(t => t.trim()) : undefined,
      required: this.hasAttribute(PHOTO_UPLOADER_ATTRIBUTES.REQUIRED),
      error: this.getAttribute(PHOTO_UPLOADER_ATTRIBUTES.ERROR) || undefined,
      onValidationChange: (fieldName: string, isValid: boolean, hasError: boolean) => {
        this.dispatchEvent(new CustomEvent('field-validation', {
          detail: { fieldName, isValid, hasError },
          bubbles: true
        }))
      }
    }
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.PHOTO_UPLOADER
  }
}

configureObservedAttributes(RcPhotoUploader, RcPhotoUploader.prototype.getObservedAttributes())

customElements.define("rc-photo-uploader", RcPhotoUploader)