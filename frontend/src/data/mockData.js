export const hourlyUsage = [
  { time: '00:00', kwh: 0.9, predicted: 0.8 },
  { time: '03:00', kwh: 0.5, predicted: 0.6 },
  { time: '06:00', kwh: 1.8, predicted: 1.5 },
  { time: '09:00', kwh: 3.4, predicted: 3.1 },
  { time: '12:00', kwh: 2.8, predicted: 3.0 },
  { time: '15:00', kwh: 4.1, predicted: 3.7 },
  { time: '18:00', kwh: 6.8, predicted: 6.1 },
  { time: '21:00', kwh: 3.7, predicted: 4.0 },
]

export const applianceBreakdown = [
  { name: 'HVAC', value: 34, color: '#38bdf8' },
  { name: 'Lighting', value: 16, color: '#22d3ee' },
  { name: 'Laundry', value: 12, color: '#818cf8' },
  { name: 'Kitchen', value: 22, color: '#2dd4bf' },
  { name: 'Workstations', value: 16, color: '#60a5fa' },
]

export const heatmap = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 12 }, (_, hour) => ({
    day,
    hour,
    value: Math.round(20 + Math.sin(day + hour / 2) * 20 + Math.random() * 55),
  })),
)

export const timeline = [
  ['HVAC entered eco-cycle', 'Usage dropped 18% against baseline', 'Now'],
  ['Peak demand detected', 'Conference wing crossed 5.2 kWh', '18m'],
  ['Report generated', 'Weekly hostel energy report is ready', '1h'],
  ['Smart rule applied', 'Lighting dimmed in inactive zones', '2h'],
]

export const recommendations = [
  'Shift laundry cycles after 10 PM to reduce projected bill by 9.6%.',
  'HVAC compressor shows sustained peak draw. Schedule filter maintenance.',
  'Kitchen load is 14% above weekday profile. Enable prep-zone idle alerts.',
]
