# caliberG

The website for caliberguns: a product catalog with images, built with Next.js.

## Layout

- `src/` contains the Next.js app.
- `src/scripts/` contains the scripts that build the product data in `src/scripts/data/`, assign images, and check them.
- `src/*.html` are standalone prototype pages.

## Tech stack

- Next.js and React
- Tailwind CSS (via PostCSS)
- ESLint

## Getting started

```bash
cd src
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `src/.env.example` to `src/.env` and fill in the values before running the site.

## Scripts

Run these from the `src/` folder.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
