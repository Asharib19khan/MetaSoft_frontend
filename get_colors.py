from PIL import Image
img = Image.open('public/metasoft-logo.png').convert('RGBA')
colors = {}
w,h=img.size
for x in range(w):
  for y in range(h):
    r,g,b,a=img.getpixel((x,y))
    if a > 50:
      c = (r//32*32, g//32*32, b//32*32)
      colors[c] = colors.get(c, 0) + 1
print(sorted(colors.items(), key=lambda i: -i[1])[:10])
