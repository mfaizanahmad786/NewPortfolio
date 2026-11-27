# Majd — portfolio

A Next.js recreation of the Framer portfolio at [majd-portfolio.framer.website](https://majd-portfolio.framer.website/).

The App Router site uses TypeScript and Tailwind. Copy for the homepage, navigation, and contact details lives in `data/site.ts`. Project bodies extracted from the reference live in `data/content.json` and are shaped by `lib/content.ts`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Pages

- `/` — home
- `/work` — all projects
- `/work/[slug]` — case studies (Damas, Najm, Kavi, Sham, AiWings, Abjad, Faseelh)

Images from the live site are stored in `public/media`.
