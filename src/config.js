import { templates } from '@hydrofoil/shaperone-wc/templates.js'
import { renderer, components } from '@hydrofoil/shaperone-wc/configure'
import * as MaterialRenderStrategy from '@hydrofoil/shaperone-wc-material/renderer'
import * as mwcComponents from '@hydrofoil/shaperone-wc-material/components.js'

components.pushComponents(mwcComponents)
renderer.setTemplates({
  ...MaterialRenderStrategy,
  focusNode: MaterialRenderStrategy.focusNode(templates.focusNode)
})
