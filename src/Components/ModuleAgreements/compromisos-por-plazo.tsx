"use client"
import { 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts"

const COLORS = ["#4caf50", "#ff9800", "#f44336"]

export default function CompromisosPorPlazo({
  filteredCompromisos,
}) {
  const uniquePlazos = ([...new Set(filteredCompromisos.map(item => item?.['plazo de ejecución']))]).filter((item) => {
    return item !== ''
  })

  const data = uniquePlazos?.map((item) => {
    return {
       name: item,
       value: filteredCompromisos?.filter((agreements) => {
           return agreements?.['plazo de ejecución'] === item
       })?.length
    }
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
