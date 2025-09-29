import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import CustomForm from '../components/CustomForm'
import tailwindCSS from '../generated/tw.css'

class CustomFormComponent extends HTMLElement {
  private root: Root | null = null
  private mountPoint: HTMLDivElement | null = null

  connectedCallback() {
    this.mountPoint = document.createElement('div')
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = tailwindCSS
    shadowRoot.appendChild(style)
    shadowRoot.appendChild(this.mountPoint)
    this.root = createRoot(this.mountPoint)
    this.root.render(React.createElement(CustomForm))
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount()
      this.root = null
    }
  }
}

customElements.define("custom-form-component", CustomFormComponent)