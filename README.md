Pixel View 🖼️

A responsive image gallery built with HTML, CSS, and vanilla JavaScript — featuring category filters, a lightbox viewer with next/prev navigation, smooth hover transitions, and a filmstrip thumbnail rail.

Built as a CodeAlpha internship project.

✨ Features

Responsive masonry-style grid — adapts from 4 columns down to 1 column based on screen size
Category filters — sort images by Nature, Urban, Portrait, or Abstract
Lightbox viewer — click any image to open a full-screen view
Next / Previous navigation — via on-screen arrows, keyboard arrow keys, or swipe gestures on touch devices
Filmstrip thumbnail rail — jump directly to any image inside the lightbox
Hover effects & smooth transitions — image zoom, caption reveal, and fade animations
Keyboard accessible — navigate the gallery and lightbox using Tab, Enter, and Esc
Respects reduced motion — animations are disabled for users with motion sensitivity preferences
🛠️ Built With

HTML5 — semantic structure
CSS3 — Grid layout, transitions, animations, responsive media queries
JavaScript (ES6) — DOM manipulation, event handling, filtering logic, lightbox state management
📁 Project Structure

ImageGallery/
├── index.html       # Page structure and markup
├── style.css         # All styling, layout, and animations
├── script.js         # Gallery rendering, filtering, and lightbox logic
└── README.md         # Project documentation
🚀 Getting Started

No build tools or installation required — this is a static front-end project.

Clone the repository
git clone https://github.com/arpitkumar4648/CodeAlpha_PixelView.git
Open the project folder
cd CodeAlpha_PixelView
Open index.html in any modern browser (double-click the file, or use a local server like VS Code's Live Server extension).
Keep index.html, style.css, and script.js in the same folder — index.html links to the other two by relative path.

🎮 Usage

Action	How
Filter images	Click a category pill (All / Nature / Urban / Portrait / Abstract)
Open an image	Click any thumbnail in the grid
Next / Previous image	Click the arrow buttons, press ← / →, or swipe on mobile
Jump to a specific image	Click its thumbnail in the filmstrip at the bottom of the lightbox
Close the viewer	Click the ✕ button, press Esc, or click outside the image
🖌️ Customizing

To use your own images, open script.js and edit the photos array:

const photos = [
  { id:1, cat:'nature', title:'Your Title', size:'reg', img:'your-image-url-or-path.jpg' },
  // ...
];
cat — must match one of the filter categories (nature, urban, portrait, abstract), or add a new pill in index.html for a new category
size — controls grid layout: reg (square), wide (spans 2 columns), or tall (spans 2 rows)
📸 Image Credits

Sample images are sourced from Picsum Photos for demonstration purposes.

👤 Author

Arpit Kumar GitHub: @arpitkumar4648

📄 License
This project is open source and free to use for learning purposes.
