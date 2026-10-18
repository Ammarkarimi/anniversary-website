# 💖 Happy Anniversary, Hammad

A crazy-cute anniversary website from **Rafika Karimi** to **Hammad Payawala**.

## What's inside

- 💌 An envelope intro that opens into the site
- ⏱️ A live "together for" counter (plus some very scientific stats)
- 📖 Our love story timeline
- 📸 A polaroid photo gallery with a lightbox
- 💘 A "reasons I love you" machine and "open when..." flip cards
- 🎮 A catch-the-hearts mini game with a secret reward
- ✍️ A typewriter love letter
- ❓ The big question (the "No" button runs away 😜) with confetti

## Personalise it

Everything personal lives in **`config.js`**: names, the date you got together, timeline,
reasons, the letter, and photo captions.

- **Photos:** put them in `photos/` as `1.jpg` … `9.jpg` (see `photos/README.md`).
- **Music (optional):** add `assets/music.mp3` and a 🎵 button appears automatically.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

## Deploy

GitHub Pages deploys straight from the `main` branch (Settings → Pages → Deploy from a branch → `main` / root).
Every push to `main` goes live in about a minute.

After changing `style.css`, `config.js` or `script.js`, bump the `?v=` number on their links in `index.html` so browsers fetch the new version.

The site will be live at `https://ammarkarimi.github.io/anniversary-website/`.
