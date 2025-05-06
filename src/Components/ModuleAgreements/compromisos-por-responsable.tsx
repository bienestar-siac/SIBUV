"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Juan Pérez",
    total: 2,
  },
  {
    name: "María López",
    total: 1,
  },
  {
    name: "Carlos Rodríguez",
    total: 1,
  },
  {
    name: "Ana Martínez",
    total: 1,
  },
]

export default function CompromisosPorResponsable({ filteredCompromisos }) {
  const uniquePlazos = ([...new Set(filteredCompromisos.map(item => item?.['responsable 1']))]).filter((item) => {
    return item !== ''
  })

  const data = uniquePlazos?.map((item) => {
    return {
       name: item,
       total: filteredCompromisos?.filter((agreements) => {
           return agreements?.['responsable 1'] === item
       })?.length
    }
  })
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#2196f3" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
