import { createFileRoute } from '@tanstack/react-router';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'INKWAVE — Turf Riot',
        description: 'An original 4v4 turf-war ink shooter. Paint the ground, swim through your ink, out-turf the other team.',
      }),
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="inkwave-host">
      <iframe
        className="inkwave-game"
        src="/inkwave/game/index.html?skipTitle=1"
        title="INKWAVE Turf Riot game"
        allow="autoplay; fullscreen; gamepad"
      />
    </main>
  );
}
