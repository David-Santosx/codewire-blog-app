// Editor.tsx
// by David - Santosx at 2025-02-28

"use client";

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react"; // Documentação: https://xdsoft.net/jodit/docs/
import { Card, CardContent } from "@/components/ui/card";

export const Editor = ({ placeholder, value, onChange }: { placeholder: string | null, value: string, onChange: (value: string) => void }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Corpo da Notícia",
      language: "pt_br",
      height: "500px",
    }),
    [placeholder]
  );

  return (
    <Card className="p-2 rounded-sm">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => onChange(newContent)}
        onChange={(newContent) => onChange(newContent)}
      />
    </Card>
  );
};
