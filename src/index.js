import "@hydrofoil/shaperone-wc/shaperone-form.js"
import { html } from '@hydrofoil/shaperone-wc'
import { renderer, components } from '@hydrofoil/shaperone-wc/configure'
import * as MaterialRenderStrategy from '@hydrofoil/shaperone-wc-material/renderer'
// import * as mwcComponents from '@hydrofoil/shaperone-wc-material/components'
import { render } from "lit"
import { loadShape } from './localShape.js'

const body = document.querySelector('body')

// components.pushComponents(mwcComponents)
renderer.setTemplates(MaterialRenderStrategy)

;(async function () {
  const shape = await loadShape()

  render(html`<shaperone-form .shapes=${shape}></shaperone-form>`, body)
})()
