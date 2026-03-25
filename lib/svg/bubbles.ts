export function renderBubbles(count: number): string {
  if (count === 0) return '';

  const bubbleConfigs = [
    {cx: 80, startY: 140, endY: 10, r: 3, delay: '0s', dur: '3s'},
    {cx: 200, startY: 160, endY: 5, r: 2, delay: '0.8s', dur: '3.5s'},
    {cx: 310, startY: 130, endY: 15, r: 2.5, delay: '1.5s', dur: '2.8s'},
    {cx: 150, startY: 150, endY: 8, r: 1.8, delay: '2.2s', dur: '3.2s'},
    {cx: 260, startY: 145, endY: 12, r: 2.2, delay: '0.5s', dur: '3.8s'},
  ];

  return bubbleConfigs
    .slice(0, count)
    .map(
      (b) => `
    <circle cx="${b.cx}" cy="${b.startY}" r="${b.r}" fill="white" opacity="0.5">
      <animate attributeName="cy" values="${b.startY};${b.endY}" dur="${b.dur}" begin="${b.delay}" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0" dur="${b.dur}" begin="${b.delay}" repeatCount="indefinite"/>
    </circle>`,
    )
    .join('');
}
