# Klaus No. 01

A responsive portfolio concept for a fictional luxury watch, developed with AI assistance using HTML, CSS and JavaScript. Includes original layered SVG artwork, a scroll-driven product reveal, an editable style tile and a reduced-motion still layout.

Open index.html in a browser. The site uses plain HTML, CSS and JavaScript, so it works offline and needs no installation or build step.

- To preview a phone in Chrome or Edge, press F12, then Ctrl+Shift+M. Choose a phone size and refresh.
- Edit the copy and the header wordmark in index.html. Open style-tile.html for the editable style reference.
- Change the colour and type variables at the top of style.css. Update the swatch captions in style-tile.html to match.
- In scene.js, edit the three numbers in each timing array to adjust the opening, dial and reveal scroll distances. Each number is a percentage of the viewport height.
- Open assets/klaus-no-01.svg in a text editor or vector editor. The strap, case, dial, hands and highlights are named groups. The dial wordmark is editable text.

The watch illustration and wordmark were created for this demo. The page uses system fonts and includes no external assets.

## Scroll storyboard

| Beat | Framing and copy | Desktop | Phone |
| --- | --- | --- | --- |
| First light | Tight case crop with a rim highlight. Headline and action beside the watch on desktop and below on phones. | 65svh | 36svh |
| Dial detail | The same watch moves closer as the shade lifts. The headline clears the scene. | 90svh | 73svh |
| Full reveal | The camera pulls back and holds. The details link sits beside the full watch on desktop and below it on phones. | 65svh | 36svh |

The skip link stays visible through all three beats. Reduced-motion settings and viewports up to 550 pixels high use the composed still.

