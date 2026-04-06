import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area // QUAN TRỌNG: Phải import Area
} from 'recharts'

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-100">
          <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.label}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-medium text-gray-900">${payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="mt-6 bg-white w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {/* Sử dụng thẻ SVG chuẩn, không dùng thư viện react-native */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />

          <Tooltip content={CustomTooltip} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#incomeGradient)"
            dot={{ r: 4, fill: '#875cf5', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
