import { FormStep } from "../components/FormStep"
import { FieldConfig } from "../types/fieldTypes"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { FORM_STEP_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcFormStep extends AbstractReactWebComponent {
  private fields: FieldConfig[] = []

  getComponent(): React.ComponentType<any> {
    return FormStep
  }

  getProps() {
    const handleSubmit = (data: any) => {
      this.dispatchEvent(new CustomEvent("wc-submit", { detail: data }))
    }

    return {
      fields: this.fields,
      title: this.getAttribute(FORM_STEP_ATTRIBUTES.TITLE) || 'Form',
      onSubmit: handleSubmit
    }
  }

  protected useShadowDOM(): boolean {
    return false
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  connectedCallback() {
    this.className = 'w-[393px] min-h-screen bg-white rounded-lg p-6'
    super.connectedCallback()
    this.customizeContainer()
  }

  private customizeContainer() {
    const container = this.querySelector('.react-container') as HTMLDivElement
    if (container && !container.style.marginBottom) {
      container.style.marginBottom = '1rem'
    }
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.FORM_STEP
  }
}

configureObservedAttributes(RcFormStep, RcFormStep.prototype.getObservedAttributes())

customElements.define("rc-form-step", RcFormStep)
