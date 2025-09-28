import InputSubmit from "../components/InputSubmit"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { SUBMIT_BUTTON_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcInputSubmit extends AbstractReactWebComponent {
  private isFormValid: boolean = false
  
  getComponent(): React.ComponentType<any> {
    return InputSubmit
  }

  getProps() {
    return {
      label: this.getAttribute(SUBMIT_BUTTON_ATTRIBUTES.LABEL) || 'Submit',
      disabled: this.hasAttribute(SUBMIT_BUTTON_ATTRIBUTES.DISABLED),
      type: this.getAttribute(SUBMIT_BUTTON_ATTRIBUTES.TYPE) || 'submit',
      variant: this.getAttribute(SUBMIT_BUTTON_ATTRIBUTES.VARIANT) || 'primary',
      isFormValid: this.isFormValid,
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('form-validation-change', this.handleFormValidationChange.bind(this) as EventListener)
  }

  private handleFormValidationChange(event: Event) {
    const customEvent = event as CustomEvent
    this.isFormValid = customEvent.detail.isFormValid
    this.renderReact()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === SUBMIT_BUTTON_ATTRIBUTES.FORM_VALID && oldValue !== newValue) {
      this.isFormValid = newValue === 'true'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.SUBMIT_BUTTON
  }
}

configureObservedAttributes(RcInputSubmit, RcInputSubmit.prototype.getObservedAttributes())

customElements.define("rc-input-submit", RcInputSubmit)
