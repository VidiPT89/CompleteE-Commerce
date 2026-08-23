import assert from 'node:assert/strict'
import test from 'node:test'
import { matchesCatalog, nextOrderNumber } from '../src/lib/catalog'

const trix = {
  slug: 'tri-x-400',
  name: 'TRI-X 400 · 35mm',
  nameEn: 'TRI-X 400 · 35mm',
  brand: 'Kodak',
  category: 'film',
  collectionSlug: 'film',
  description: 'Black and white street film',
  imageUrl: '/x.jpg',
  variants: [
    { finish: 'yellow-box', format: '36exp', priceCents: 1290, stock: 40 },
    { finish: 'yellow-box', format: '24exp', priceCents: 1090, stock: 18 },
  ],
}

test('search matches brand and film name', () => {
  assert.equal(matchesCatalog(trix, { q: 'kodak' }), true)
  assert.equal(matchesCatalog(trix, { q: 'tri-x' }), true)
  assert.equal(matchesCatalog(trix, { q: 'leica' }), false)
})

test('filters by collection, finish, format and price', () => {
  assert.equal(matchesCatalog(trix, { collection: 'film', finish: 'yellow-box', format: '36exp' }), true)
  assert.equal(matchesCatalog(trix, { collection: 'cameras' }), false)
  assert.equal(matchesCatalog(trix, { minCents: 1200, maxCents: 1400 }), true)
  assert.equal(matchesCatalog(trix, { maxCents: 1000 }), false)
})

test('order numbers stay sequential', () => {
  assert.equal(nextOrderNumber(1), 'FORJA-00001')
  assert.equal(nextOrderNumber(12), 'FORJA-00012')
})
