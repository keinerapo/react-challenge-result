import TextField from "../components/TextField"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { TEXT_INPUT_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcTextField extends AbstractReactWebComponent {
  
  getComponent(): React.ComponentType<any> {
    return TextField
  }

  getProps() {
    return {
      label: this.getAttribute(TEXT_INPUT_ATTRIBUTES.LABEL) || '',
      name: this.getAttribute(TEXT_INPUT_ATTRIBUTES.NAME) || '',
      type: this.getAttribute(TEXT_INPUT_ATTRIBUTES.TYPE) || 'text',
      placeholder: this.getAttribute(TEXT_INPUT_ATTRIBUTES.PLACEHOLDER) || '',
      required: this.hasAttribute(TEXT_INPUT_ATTRIBUTES.REQUIRED) || this.getAttribute(TEXT_INPUT_ATTRIBUTES.REQUIRED) === 'true',
      error: this.getAttribute(TEXT_INPUT_ATTRIBUTES.ERROR) || undefined,
      disabled: this.hasAttribute(TEXT_INPUT_ATTRIBUTES.DISABLED),
      maxLength: this.getAttribute(TEXT_INPUT_ATTRIBUTES.MAX_LENGTH) ? parseInt(this.getAttribute(TEXT_INPUT_ATTRIBUTES.MAX_LENGTH)!) : undefined,
      minLength: this.getAttribute(TEXT_INPUT_ATTRIBUTES.MIN_LENGTH) ? parseInt(this.getAttribute(TEXT_INPUT_ATTRIBUTES.MIN_LENGTH)!) : undefined,
      noNumbers: this.hasAttribute(TEXT_INPUT_ATTRIBUTES.NO_NUMBERS) || this.getAttribute(TEXT_INPUT_ATTRIBUTES.NO_NUMBERS) === 'true',
      onValidationChange: (fieldName: string, isValid: boolean, hasError: boolean) => {
        this.dispatchEvent(new CustomEvent('field-validation', {
          detail: { fieldName, isValid, hasError },
          bubbles: true
        }))
      }
    }
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.TEXT_FIELD
  }
}

configureObservedAttributes(RcTextField, RcTextField.prototype.getObservedAttributes())

customElements.define("rc-text-field", RcTextField)

