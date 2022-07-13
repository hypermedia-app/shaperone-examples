import '@hydrofoil/shaperone-wc/shaperone-form.js'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { code } from '@zazuko/vocabulary-extras/builders'
import { isBlankNode } from 'is-graph-pointer'
import { fetchShapes, fetchQuery, fetchResource } from './fetch'
import { getSparqlUrl } from './queries/index.js'
import './config'

const form = document.querySelector('shaperone-form')

;(async function () {
  const shapes = await fetchShapes('view')

  const templates = shapes
    .any()
    .has(hydra.template)

  const queriesLoaded = templates.map(async template => {
    const iriTemplate = template.out(hydra.template)
    if (!isBlankNode(iriTemplate)) {
      return
    }
    
    const name = iriTemplate.out(code.name).value
    const query = await fetchQuery(name)
    const sparqlUrl = getSparqlUrl(query, template)

    iriTemplate.deleteOut().deleteIn()
    template.addOut(hydra.template, sparqlUrl)
  })

  await Promise.all(queriesLoaded)

  form.shapes = shapes.namedNode('')
})()

document.getElementById('load-example')
  .addEventListener('click', async () => {
    const example = await fetchResource('BEW-HEL-SEX')
    form.resource = example.namedNode('')
  })