import fs from 'fs'
import path from 'path'

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  if (h.length === 3) {
    return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)]
  }
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}

function rgbaToRgb(rgba) {
  // rgba(r,g,b,a)
  const m = rgba.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const parts = m[1].split(',').map(s => s.trim())
  const r = Number(parts[0])
  const g = Number(parts[1])
  const b = Number(parts[2])
  const a = parts[3] !== undefined ? Number(parts[3]) : 1
  return { r, g, b, a }
}

function linearize(c) {
  c = c / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance([r,g,b]) {
  const R = linearize(r)
  const G = linearize(g)
  const B = linearize(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrast(rgb1, rgb2) {
  const L1 = luminance(rgb1)
  const L2 = luminance(rgb2)
  const top = Math.max(L1, L2)
  const bot = Math.min(L1, L2)
  return (top + 0.05) / (bot + 0.05)
}

function parseVars(cssText) {
  const vars = {}
  const re = /--([a-zA-Z0-9-]+):\s*([^;]+);/g
  let m
  while ((m = re.exec(cssText)) !== null) {
    vars[m[1]] = m[2].trim()
  }
  return vars
}

function toRgbTuple(val) {
  if (!val) return null
  if (val.startsWith('#')) return hexToRgb(val)
  if (val.startsWith('rgb')) {
    const o = rgbaToRgb(val)
    if (!o) return null
    if (o.a >= 1) return [o.r, o.g, o.b]
    // composite over white background for simplicity
    const bg = [255,255,255]
    const r = Math.round((1 - o.a) * bg[0] + o.a * o.r)
    const g = Math.round((1 - o.a) * bg[1] + o.a * o.g)
    const b = Math.round((1 - o.a) * bg[2] + o.a * o.b)
    return [r,g,b]
  }
  return null
}

const cssPath = path.resolve(process.cwd(), 'app/globals.css')
const css = fs.readFileSync(cssPath, 'utf8')
const vars = parseVars(css)

const pairs = [
  ['color-base','color-ink'],
  ['color-surface','color-ink'],
  ['color-elevated','color-ink'],
  ['color-primary','color-primary-foreground'],
  ['color-secondary','color-secondary-foreground'],
  ['color-muted','color-muted-foreground'],
  ['color-accent','color-accent-foreground'],
  ['color-destructive','color-destructive-foreground'],
  ['color-border','color-base']
]

console.log('Contrast check for app/globals.css')
for (const [a,b] of pairs) {
  const va = vars[a]
  const vb = vars[b]
  const ra = toRgbTuple(va)
  const rb = toRgbTuple(vb)
  if (!ra || !rb) {
    console.log(`- ${a} vs ${b}: SKIPPED (unsupported color format)`)
    continue
  }
  const cr = contrast(ra, rb)
  const passAA = cr >= 4.5
  const passLarge = cr >= 3.0
  console.log(`- ${a} (${va}) vs ${b} (${vb}): ratio=${cr.toFixed(2)} — AA_text=${passAA} AA_large=${passLarge}`)
}

process.exit(0)
