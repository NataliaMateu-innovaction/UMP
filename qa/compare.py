from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
p=Path(r'C:/Users/Admin/Desktop/USDC - massivePayment/landing/qa')
a=Image.open(r'C:/Users/Admin/.codex/generated_images/01a154d7-1716-77a0-aa36-6cfa9cb9e04c/exec-a83c4266-79d9-4e9c-a2e3-0155accef135.png').convert('RGB')
b=Image.open(p/'desktop.png').convert('RGB')
print('reference',a.size,'implementation',b.size)
out=Image.new('RGB',(a.width+b.width,max(a.height,b.height)+40),'#20282b')
out.paste(a,(0,40));out.paste(b,(a.width,40));d=ImageDraw.Draw(out);d.text((20,12),'REFERENCE',fill='white');d.text((a.width+20,12),'IMPLEMENTATION',fill='white');out.save(p/'comparison.png')
full=Image.open(p/'full-page.png'); full.thumbnail((440,2200));full.save(p/'overview.png')
mob=Image.open(p/'mobile-full.png'); parts=[]
for y in range(0,mob.height,2200):
    part=mob.crop((0,y,mob.width,min(y+2200,mob.height)));part.thumbnail((250,1450));parts.append(part)
out=Image.new('RGB',(250*len(parts),1450),'#20282b')
for i,im in enumerate(parts):out.paste(im,(250*i,0))
out.save(p/'mobile-overview.png')
