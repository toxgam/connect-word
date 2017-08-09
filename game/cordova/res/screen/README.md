To create splash screen for iOS:

```
convert input.png -gravity center -background transparent -extent 640x1136 Default-568h@2x~iphone.png
convert input.png -gravity center -background transparent -extent 750x1334 Default-667h.png
convert input.png -gravity center -background transparent -extent 1242x2208 Default-736h.png
convert input.png -gravity center -background transparent -extent 2208x1242 Default-Landscape-736h.png
convert input.png -gravity center -background transparent -extent 2048x1536 Default-Landscape@2x~ipad.png
convert input.png -gravity center -background transparent -extent 1024x768 Default-Landscape~ipad.png
convert input.png -gravity center -background transparent -extent 1536x2048 Default-Portrait@2x~ipad.png
convert input.png -gravity center -background transparent -extent 768x1024 Default-Portrait~ipad.png
convert input.png -gravity center -background transparent -extent 640x960 Default@2x~iphone.png
convert input.png -gravity center -background transparent -extent 320x480 Default~iphone.png
```
