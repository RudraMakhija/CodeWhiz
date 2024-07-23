import React, { useState } from "react"
import Editor from "@monaco-editor/react"

const editorOptions={
  fontSize: 15,
  wordWrap: 'on'
}

const CodeEditor = ({ language, theme, code, onChange }) => {

  const [value, setValue] = useState(code || "")

  const handleEditorChange = (value) => {
    setValue(value)
    onChange("code", value)
  }

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="70vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// Welcome to the code editor."
        onChange={handleEditorChange}
        options={editorOptions}
      />
    </div>
  )
}
export default CodeEditor