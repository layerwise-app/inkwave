const metadata = {
  tidewater: { hash: 'e81eef8b', ppm: 8, size: 2048 },
  kelpline: { hash: '7dfce20', ppm: 8, size: 1024 },
  halyard: { hash: '827df3aa', ppm: 5, size: 1024 },
} as const;

export function lightmapMetadata(layoutId: string) {
  return metadata[layoutId as keyof typeof metadata];
}

export function lightmapImage(layoutId: string) {
  return `/inkwave/assets/lightmaps/${layoutId}.png`;
}
