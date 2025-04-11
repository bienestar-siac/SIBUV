"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DatePickerWithRangeProps {
  className?: string
}

export function DatePickerWithRange({ className }: DatePickerWithRangeProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() + 1)))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DatePicker
          label="Fecha inicial"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
            },
          }}
        />
        <DatePicker
          label="Fecha final"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}
