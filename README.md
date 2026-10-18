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

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The site will be live at `https://ammarkarimi.github.io/anniversary-website/`.
