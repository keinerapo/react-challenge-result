import SelectList from "../components/SelectList"
import { AbstractReactWebComponent, configureObservedAttributes } from "../utils/AbstractReactWebComponent"
import { SELECT_LIST_ATTRIBUTES, COMPONENT_ATTRIBUTES } from "../types/fieldTypes"
import React from "react"

class RcSelectList extends AbstractReactWebComponent {
  
  getComponent(): React.ComponentType<any> {
    return SelectList
  }

  getProps() {
    const optionsAttr = this.getAttribute(SELECT_LIST_ATTRIBUTES.OPTIONS)
    let options: string[] = []
    
    if (optionsAttr) {
      options = JSON.parse(optionsAttr)
    }

    return {
      label: this.getAttribute(SELECT_LIST_ATTRIBUTES.LABEL) || '',
      name: this.getAttribute(SELECT_LIST_ATTRIBUTES.NAME) || '',
      options: options,
      required: this.hasAttribute(SELECT_LIST_ATTRIBUTES.REQUIRED) || this.getAttribute(SELECT_LIST_ATTRIBUTES.REQUIRED) === 'true',
      error: this.getAttribute(SELECT_LIST_ATTRIBUTES.ERROR) || undefined,
      disabled: this.hasAttribute(SELECT_LIST_ATTRIBUTES.DISABLED),
      multiple: this.hasAttribute(SELECT_LIST_ATTRIBUTES.MULTIPLE),
      onValidationChange: (fieldName: string, isValid: boolean, hasError: boolean) => {
        this.dispatchEvent(new CustomEvent('field-validation', {
          detail: { fieldName, isValid, hasError },
          bubbles: true
        }))
      }
    }
  }

  getObservedAttributes(): string[] {
    return COMPONENT_ATTRIBUTES.SELECT_LIST
  }
}

configureObservedAttributes(RcSelectList, RcSelectList.prototype.getObservedAttributes())

customElements.define("rc-select-list", RcSelectList)


