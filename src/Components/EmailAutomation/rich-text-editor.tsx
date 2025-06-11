// React
import React from 'react'

import { useState, useEffect, useRef } from "react"
import { Box, Paper, ToggleButton, Divider, styled } from "@mui/material"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const EditorContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  overflow: "hidden",
}))

const EditorToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const EditorContent = styled("div")(({ theme }) => ({
  minHeight: "150px",
  padding: theme.spacing(2),
  "&:focus": {
    outline: "none",
  },
  "&:empty:before": {
    content: "attr(data-placeholder)",
    color: theme.palette.text.disabled,
  },
}))

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your message here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [])

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value]) 

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }

  return (
    <EditorContainer variant="outlined">
      <EditorToolbar>
        <ToggleButton value="bold" aria-label="bold" onClick={() => execCommand("bold")} size="small">
          <FormatBoldIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic" onClick={() => execCommand("italic")} size="small">
          <FormatItalicIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="underline" onClick={() => execCommand("underline")} size="small">
          <FormatUnderlinedIcon fontSize="small" />
        </ToggleButton>

        <Divider orientation="vertical" flexItem />

        <ToggleButton
          value="bullet"
          aria-label="bullet list"
          onClick={() => execCommand("insertUnorderedList")}
          size="small"
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="number"
          aria-label="numbered list"
          onClick={() => execCommand("insertOrderedList")}
          size="small"
        >
          <FormatListNumberedIcon fontSize="small" />
        </ToggleButton>

        <Divider orientation="vertical" flexItem />

        <ToggleButton value="left" aria-label="align left" onClick={() => execCommand("justifyLeft")} size="small">
          <FormatAlignLeftIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="align center"
          onClick={() => execCommand("justifyCenter")}
          size="small"
        >
          <FormatAlignCenterIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="right" aria-label="align right" onClick={() => execCommand("justifyRight")} size="small">
          <FormatAlignRightIcon fontSize="small" />
        </ToggleButton>
      </EditorToolbar>

      <EditorContent
        ref={editorRef}
        contentEditable
        data-placeholder={placeholder}
        onInput={handleContentChange}
        onBlur={handleContentChange}
      />
    </EditorContainer>
  )
}