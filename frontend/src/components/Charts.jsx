import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { applianceBreakdown, hourlyUsage } from '../data/mockData.js'

const tooltipStyle = {
  background: 'rgba(2, 6, 23, .92)',
  border: '1px solid rgba(148, 163, 184, .2)',
  borderRadius: 16,
  color: '#e0f2fe',
}

export function UsageAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={hourlyUsage}>
        <defs>
          <linearGradient id="usage" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="kwh" stroke="#38bdf8" strokeWidth={3} fill="url(#usage)" />
        <Area type="monotone" dataKey="predicted" stroke="#818cf8" strokeDasharray="5 5" strokeWidth={2} fill="transparent" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ApplianceDonut() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={applianceBreakdown} dataKey="value" innerRadius={72} outerRadius={104} paddingAngle={4}>
          {applianceBreakdown.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function PeakBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={hourlyUsage}>
        <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="kwh" radius={[10, 10, 0, 0]} fill="#22d3ee" />
      </BarChart>
    </ResponsiveContainer>
  )
}
