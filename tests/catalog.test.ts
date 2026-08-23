import assert from 'node:assert/strict'
import test from 'node:test'
import { matchesCatalog } from '../src/lib/catalog'

const ember = {
  slug: 'ember-overshirt',
  name: 'Sobrecamisa Ember',
  nameEn: 'Ember overshirt',
  category: 'outerwear',
  description: 'Heavy cloth',
  imageUrl: '/x.jpg',
  variants: [
    { color: 'black', size: 'M', priceCents: 8900, stock: 8 },
    { color: 'amber', size: 'L', priceCents: 9200, stock: 3 },
  ],
}

test('search matches Portuguese and English names', () => {
  assert.equal(matchesCatalog(ember, { q: 'ember' }), true)
  assert.equal(matchesCatalog(ember, { q: 'sobrecamisa' }), true)
  assert.equal(matchesCatalog(ember, { q: 'tote' }), false)
})

test('filters by category, colour, size and price', () => {
  assert.equal(matchesCatalog(ember, { category: 'outerwear', color: 'amber', size: 'L' }), true)
  assert.equal(matchesCatalog(ember, { color: 'olive' }), false)
  assert.equal(matchesCatalog(ember, { minCents: 9000, maxCents: 9500 }), true)
  assert.equal(matchesCatalog(ember, { maxCents: 8000 }), false)
})
