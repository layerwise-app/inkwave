<a href="https://layerwise.app"><picture><source media="(prefers-color-scheme: dark)" srcset="https://layerwise.app/powered-by-dark.png"><img src="https://layerwise.app/powered-by.png" alt="Powered by Layerwise" width="174" height="28"></picture></a>

# Inkwave

Inkwave is an original 4 v 4 turf-war ink shooter that runs in the browser. It
is a starting point for anyone who wants to make their own 3D action game for
the web: matches, bots, menus, the HUD, music and sound effects already work.
Try the live demo at <https://inkwave.layerwise.site/>.

Players team up with three bots against four others and have three minutes (or
90 seconds) to paint more of the stage than the other team. They can swim
through their own ink as a squid to move fast and refill, climb inked walls,
and throw bombs and specials. Before a match they pick one of seven weapons,
one of three stages played by day or at dusk, and a bot difficulty, and they
can dress up their squidkid in the locker. It plays with a keyboard and mouse
or a gamepad; there are no touch controls.

Inkwave was built with [Layerwise](https://layerwise.app), and you can open it
in Layerwise to make your own version.

## Where things live

The game is plain JavaScript in `src/inkwave/`, rendered with a copy of three.js
kept in `src/inkwave/vendor/three/`. `src/routes/index.tsx` mounts it on the
home page.

- `src/inkwave/config.js` is where most changes start: the title, subtitle and
  version, team ink palettes, player movement, the seven weapons, the bomb and
  specials, match lengths and team size, bot difficulties, the stage list, bot
  names, XP per level, default settings and graphics quality presets.
- `src/inkwave/ui/menus.js` builds every menu screen and holds its copy:
  loading tips, main menu descriptions, How to Play rules and controls,
  settings labels and credits.
- `src/inkwave/ui/hud.js` is the in-match HUD.
- `src/inkwave/styles/ui.css` and `src/inkwave/styles/hud.css` style the menus
  and HUD. Menu accent colors come from the team palettes in `config.js`
  (`--a` and `--b` near the top of `ui.css` are only the first-paint
  fallback). The fonts (Titan One and Rubik) are in
  `public/inkwave/assets/fonts/`.
- `src/inkwave/game/character-style.js` lists the squidkid looks offered in
  the locker: skin tones, eye colors, outfits, hair, hats, brows and presets.
- `src/inkwave/world/maps.js` holds the stage layouts, built from boxes and
  ramps. `src/inkwave/world/dressing.js` places the props on each stage, and
  `src/inkwave/world/environment.js` draws the sky, sea and lighting.
- `src/inkwave/audio/` generates the sound effects and music in code.
- `public/inkwave/assets/stages/` has the stage-select art, and
  `public/inkwave/assets/lightmaps/` the baked shading for each stage, which
  `src/inkwave/assets.ts` matches to its layout.
- The page title and description are in `src/routes/index.tsx`, with defaults
  in `src/routes/__root.tsx`. The logo is `public/logo.svg` (and
  `public/logo.png`); the favicons in `public/` are made from it.

Each player's name, look, level and chosen weapon are saved in the browser's
localStorage under `inkwave.profile`, and their settings under
`inkwave.settings`. The game uses no accounts or database.

## Adding a stage

1. Add a layout to `src/inkwave/world/maps.js` (`TIDEWATER` is a good one to
   copy) and register it in `MAP_LAYOUTS`. Blocks listed in `half` are
   mirrored for the other team, so both sides stay identical.
2. Add an entry to `MAPS` in `src/inkwave/config.js` with the same `id`, a
   `name` and a `blurb`. `times` picks the environment theme (`day`, `golden`
   or `sunset`) used by day and at dusk, and `theme` repeats the day one.
3. Optionally list props for it under its `id` in `DRESSING` in
   `src/inkwave/world/dressing.js`.
4. Optionally add stage-select art: `<id>-day.webp`, `<id>-dusk.webp`,
   `<id>-day-sm.webp` and `<id>-dusk-sm.webp` in
   `public/inkwave/assets/stages/`. Without it, the stage select shows a
   top-down map drawn from the layout.

A new stage has no baked lightmap, so it plays without that extra shading and
logs a warning in the browser console. Changing an existing layout does the
same, because its lightmap no longer matches. The tools that rendered the stage
art and baked the lightmaps are not part of this project.

## Changing weapons

Each entry in `WEAPONS` in `src/inkwave/config.js` holds the real numbers for a
weapon (damage, range, fire rate, ink use and so on), plus `stats`, the 0 to 1
bars shown on the loadout screen. `WEAPON_ORDER` sets the order on the loadout
screen and the pool bots pick from. Firing behavior, models and icons are coded
per weapon kind in `src/inkwave/game/weapons.js`,
`src/inkwave/game/character-weapons.js` and `src/inkwave/ui/ui-icons.js`, so a
brand-new weapon needs code changes there as well.

## Commands

```bash
pnpm dev          # local dev server (Layerwise runs this for you)
pnpm check-types  # TypeScript check
pnpm build        # type check, then production build
```

## License

The game code in `src/inkwave/` is MIT-licensed; see `src/inkwave/LICENSE`.
The Titan One and Rubik fonts are under the SIL Open Font License.
