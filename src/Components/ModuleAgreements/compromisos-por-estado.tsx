"use client"
import { 
  Bar, 
  BarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts"

export default function CompromisosPorEstado({
  filteredCompromisos,
  sedes
}) {
  const data = sedes?.map((item) => {
      return {
         name: item,
         total: filteredCompromisos?.filter((agreements) => {
             return agreements?.['sedes/nodos'] === item
         })?.length
      }
  })
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#d32f2f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
