import '@hydrofoil/shaperone-wc/shaperone-form.js'
import fetchShapes from './fetchShapes'
import './config'

const form = document.querySelector('shaperone-form')

;(async function () {
  const shapes = await fetchShapes('purchase')

  form.shapes = shapes.namedNode('')
})()
