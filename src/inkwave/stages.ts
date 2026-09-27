export function stageImage(id: string, time: string, small: boolean) {
  const suffix = `${id}-${time === 'dusk' ? 'dusk' : 'day'}${small ? '-sm' : ''}.webp`;
  return `/inkwave/assets/stages/${suffix}`;
}
