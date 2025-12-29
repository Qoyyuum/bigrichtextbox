# BigRichTextBox

A tiny, distraction-free **online rich text box** — inspired by [bigtextbox.com](https://bigtextbox.com/), but built for rich text.

## Use it online

- Live app:
  - https://qoyyuum.github.io/bigrichtextbox/index.html

Open the link and start typing.

## What this is

BigRichTextBox is a single static web page that gives you a large, clean writing surface.

You can:
- Write rich text (bold, italic, underline)
- Use headings (H1–H6)
- Switch font family
- Use bulleted / numbered lists
- Set alignment (left/center/right/justify)
- Toggle theme (default **dark**, click to switch **light**)

## How it works (simple)

This project is intentionally minimal:
- It is **just static files** (`index.html`, `styles.css`, `app.js`).
- It runs entirely in your browser (no backend server).
- It is hosted via **GitHub Pages**.

### Rich text editor

Rich text editing is handled by **QuillJS**:
- Quill renders the editor UI and formatting.
- Quill is loaded from a CDN (no build step needed).

### Saving your text

Your text is automatically saved to your browser using **Local Storage**:
- The app stores Quill “Delta” content as JSON.
- Refreshing the page restores what you last wrote.

Nothing is uploaded anywhere by this app.

### Theme toggle

The theme toggle:
- Defaults to **dark**
- Persists your preference in Local Storage
- Uses CSS variables to style both the page and Quill’s toolbar/editor

## Run locally

Because it’s static, you can run it in multiple ways:

### Option A: open the file

- Open `index.html` directly in a browser.

### Option B: run a small local server (recommended)

Python:

```bash
py -m http.server 8000
```

Then open:

- http://localhost:8000/

## Project structure

- `index.html` – page layout + Quill toolbar
- `styles.css` – styling (including light/dark theme)
- `app.js` – Quill init, autosave/restore, toolbar visibility, theme toggle

## Credits

- Editor: [QuillJS](https://quilljs.com/)
- Inspiration: [bigtextbox.com](https://bigtextbox.com/)
