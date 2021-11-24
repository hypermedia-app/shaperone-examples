import str2stream from 'string-to-stream'
import { parsers } from '@rdf-esm/formats-common'
import * as RDF from '@rdf-esm/dataset'
import { rdf, sh } from '@tpluscode/rdf-ns-builders'
import clownface from 'clownface'
import isAbsoluteUrl from 'is-absolute-url'

/**
 * @param id resource URI or path to local shape
 */
export default async function fetchShapes (id) {
  const uri = isAbsoluteUrl(id) ? id : `./dist/shapes/${id}.ttl`

  const res = await window.fetch(uri)
  const stream = str2stream(await res.text())

  const parsed = parsers.import('text/turtle', stream)

  const dataset = RDF.dataset()
  // @ts-ignore https://unpkg.com/browse/@rdfjs/types@1.0.1/stream.d.ts
  for await (const quad of parsed) {
    dataset.add(quad)
  }

  return clownface({ dataset }).has(rdf.type, sh.NodeShape)
}
