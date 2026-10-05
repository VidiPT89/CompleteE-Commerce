import assert from 'node:assert/strict'
import test from 'node:test'
import { formatEuro, matchesCatalog, nextOrderNumber } from '../src/lib/catalog'

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

test('finish, format and price must all hold on the same variant', () => {
  // 36exp costs 12,90 €; only the 24exp is under 11 €, so "36exp up to 11 €" finds nothing.
  assert.equal(matchesCatalog(trix, { format: '36exp', maxCents: 1100 }), false)
  assert.equal(matchesCatalog(trix, { format: '24exp', maxCents: 1100 }), true)
  assert.equal(matchesCatalog(trix, { finish: 'yellow-box', format: '120' }), false)
})

test('price limits are inclusive', () => {
  assert.equal(matchesCatalog(trix, { minCents: 1290 }), true)
  assert.equal(matchesCatalog(trix, { maxCents: 1090 }), true)
  assert.equal(matchesCatalog(trix, { minCents: 1291 }), false)
})

test('search ignores case and surrounding spaces, and reads the description', () => {
  assert.equal(matchesCatalog(trix, { q: '  KODAK ' }), true)
  assert.equal(matchesCatalog(trix, { q: 'street' }), true)
  assert.equal(matchesCatalog(trix, { q: '   ' }), true)
})

test('category must match exactly', () => {
  assert.equal(matchesCatalog(trix, { category: 'film' }), true)
  assert.equal(matchesCatalog(trix, { category: 'cameras' }), false)
})

test('prices follow the shopper language', () => {
  assert.match(formatEuro(1290, 'pt'), /^12,90\s€$/u)
  assert.equal(formatEuro(1290, 'en'), '€12.90')
})
