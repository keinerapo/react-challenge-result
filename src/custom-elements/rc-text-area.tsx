import TextArea from "../components/TextArea"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { TEXT_AREA_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcTextArea extends AbstractReactWebComponent {
  
  getComponent(): React.ComponentType<any> {
    return TextArea
  }

  getProps() {
    return {
      label: this.getAttribute(TEXT_AREA_ATTRIBUTES.LABEL) || "",
      name: this.getAttribute(TEXT_AREA_ATTRIBUTES.NAME) || "",
      placeholder: this.getAttribute(TEXT_AREA_ATTRIBUTES.PLACEHOLDER) || "",
      required: this.hasAttribute(TEXT_AREA_ATTRIBUTES.REQUIRED),
      rows: parseInt(this.getAttribute(TEXT_AREA_ATTRIBUTES.ROWS) || "3"),
      cols: parseInt(this.getAttribute(TEXT_AREA_ATTRIBUTES.COLS) || "50"),
      maxLength: this.getAttribute(TEXT_AREA_ATTRIBUTES.MAX_LENGTH) ? parseInt(this.getAttribute(TEXT_AREA_ATTRIBUTES.MAX_LENGTH)!) : undefined,
      minLength: this.getAttribute(TEXT_AREA_ATTRIBUTES.MIN_LENGTH) ? parseInt(this.getAttribute(TEXT_AREA_ATTRIBUTES.MIN_LENGTH)!) : undefined,
      error: this.getAttribute(TEXT_AREA_ATTRIBUTES.ERROR) || undefined,
      onValidationChange: (fieldName: string, isValid: boolean, hasError: boolean) => {
        this.dispatchEvent(new CustomEvent('field-validation', {
          detail: { fieldName, isValid, hasError },
          bubbles: true
        }))
      }
    }
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.TEXT_AREA
  }
}

configureObservedAttributes(RcTextArea, RcTextArea.prototype.getObservedAttributes())

customElements.define("rc-text-area", RcTextArea)