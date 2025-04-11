"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    fecha: "Ene",
    compromisos: 3,
  },
  {
    fecha: "Feb",
    compromisos: 5,
  },
  {
    fecha: "Mar",
    compromisos: 7,
  },
  {
    fecha: "Abr",
    compromisos: 5,
  },
  {
    fecha: "May",
    compromisos: 8,
  },
  {
    fecha: "Jun",
    compromisos: 10,
  },
]

export function CompromisoChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="fecha" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="compromisos" stroke="#e11d48" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
