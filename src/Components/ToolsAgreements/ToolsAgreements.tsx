"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Button,
  Typography
} from "@mui/material"

// Components
import Tools from './Tools/Tools'

// Handlers
import Handlers from './handler'

// Redux
import { useSelector } from "react-redux"

// Styles
import styles from './styles'

export default function ToolsAgreements() {
  return (
    <Box sx={styles.viewWorker}>
      <Tools />
    </Box>
  )
}