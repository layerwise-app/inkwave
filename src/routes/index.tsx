import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import '~/inkwave/styles/ui.css';
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
  const appRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const fadeTimer = window.setTimeout(() => {
      if (!fadeRef.current) return;
      fadeRef.current.style.opacity = '0';
      fadeRef.current.style.pointerEvents = 'none';
    }, 60);
    void import('~/inkwave/main.js')
      .then(({ startInkwave }) => {
        if (!active || !appRef.current || !uiRef.current || !fadeRef.current || !errorRef.current) return;
        void startInkwave({
          app: appRef.current,
          uiRoot: uiRef.current,
          fadeEl: fadeRef.current,
          bootError: errorRef.current,
        });
      })
      .catch((error: unknown) => {
        if (!active || !errorRef.current) return;
        errorRef.current.textContent = error instanceof Error ? error.message : String(error);
        errorRef.current.style.display = 'block';
      });
    return () => {
      active = false;
      window.clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <main className="inkwave-root">
      <div id="app" ref={appRef} />
      <div id="ui-root" ref={uiRef} />
      <div id="fade" ref={fadeRef} />
      <div id="boot-error" ref={errorRef} role="alert" />
    </main>
  );
}
