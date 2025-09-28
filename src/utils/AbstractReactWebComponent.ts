import React from "react"
import { createRoot, Root } from "react-dom/client"
import tw from "../generated/tw.css"

export abstract class AbstractReactWebComponent extends HTMLElement {
  protected reactRoot: Root | null = null
  private _isReactConnected = false

  abstract getComponent(): React.ComponentType<any>

  abstract getProps(): any

  abstract getObservedAttributes(): string[]

  protected useShadowDOM(): boolean {
    return true
  }

  protected shouldInjectStyles(): boolean {
    return this.useShadowDOM()
  }

  static get observedAttributes(): string[] {
    return []
  }

  connectedCallback() {
    if (this._isReactConnected) return
    this._isReactConnected = true

    this.setupDOM()
    this.renderReact()
  }

  disconnectedCallback() {
    this.cleanup()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (this.reactRoot && oldValue !== newValue) {
      this.renderReact()
    }
  }

  private setupDOM() {
    if (this.useShadowDOM()) {
      this.attachShadow({ mode: 'open' })
      
      if (this.shouldInjectStyles()) {
        this.injectStyles()
      }
    }
  }

  private injectStyles() {
    if (!this.shadowRoot) return

    const existingStyle = this.shadowRoot.querySelector('style[data-tailwind]')
    if (existingStyle) return

    const style = document.createElement('style')
    style.setAttribute('data-tailwind', 'true')
    style.textContent = tw
    
    if (this.shadowRoot.firstChild) {
      this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild)
    } else {
      this.shadowRoot.appendChild(style)
    }
  }

  protected renderReact() {
    const container = this.getOrCreateContainer()
    
    if (!this.reactRoot) {
      this.reactRoot = createRoot(container)
    }

    const Component = this.getComponent()
    const props = this.getProps()
    
    this.reactRoot.render(React.createElement(Component, props))
  }

  private getOrCreateContainer(): HTMLDivElement {
    const root = this.useShadowDOM() ? this.shadowRoot! : this
    
    let container = root.querySelector('.react-container') as HTMLDivElement
    if (!container) {
      container = document.createElement('div')
      container.className = 'react-container'
      root.appendChild(container)
    }
    
    return container
  }

  private cleanup() {
    if (this.reactRoot) {
      this.reactRoot.unmount()
      this.reactRoot = null
    }
    this._isReactConnected = false
  }
}

export function configureObservedAttributes<T extends typeof AbstractReactWebComponent>(
  constructor: T,
  attributes: string[]
): void {
  Object.defineProperty(constructor, 'observedAttributes', {
    get() { return attributes },
    configurable: true
  })
}