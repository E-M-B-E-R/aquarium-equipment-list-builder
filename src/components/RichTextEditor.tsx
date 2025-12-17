import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Palette } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function RichTextEditor({ value, onChange, onBlur }: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelection = useRef<Range | null>(null);

  const colors = [
    '#000000', '#374151', '#6B7280', '#DC2626', '#EA580C', 
    '#D97706', '#65A30D', '#059669', '#0891B2', '#2563EB', 
    '#7C3AED', '#C026D3'
  ];

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedSelection.current && selection) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
  };

  const execCommand = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const applyFontSize = (size: string) => {
    restoreSelection();
    document.execCommand('fontSize', false, '7');
    const fontElements = editorRef.current?.getElementsByTagName('font');
    if (fontElements && fontElements.length > 0) {
      const lastFont = fontElements[fontElements.length - 1];
      lastFont.removeAttribute('size');
      lastFont.style.fontSize = size;
    }
    saveSelection();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const applyHeading = (level: string) => {
    restoreSelection();
    document.execCommand('formatBlock', false, level);
    saveSelection();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const applyColor = (color: string) => {
    restoreSelection();
    document.execCommand('foreColor', false, color);
    saveSelection();
    setShowColorPicker(false);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50 flex-wrap">
        {/* Bold, Italic, Underline */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onClick={(e) => {
            e.preventDefault();
            execCommand('bold');
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onClick={(e) => {
            e.preventDefault();
            execCommand('italic');
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onClick={(e) => {
            e.preventDefault();
            execCommand('underline');
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headings */}
        <select
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onChange={(e) => {
            applyHeading(e.target.value);
            e.target.value = '';
          }}
          className="px-2 py-1 border rounded text-sm"
          defaultValue=""
        >
          <option value="" disabled>Heading</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Normal</option>
        </select>

        {/* Font Size */}
        <select
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onChange={(e) => {
            applyFontSize(e.target.value);
            e.target.value = '';
          }}
          className="px-2 py-1 border rounded text-sm"
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          <option value="12px">Small</option>
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="24px">Extra Large</option>
        </select>

        {/* Color Picker */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
            onClick={(e) => {
              e.preventDefault();
              setShowColorPicker(!showColorPicker);
            }}
            className="p-2 hover:bg-gray-200 rounded flex items-center gap-1"
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-6 gap-1">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      applyColor(color);
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onBlur={onBlur}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        className="p-4 min-h-[200px] focus:outline-none prose max-w-none"
        style={{ wordBreak: 'break-word' }}
      />
    </div>
  );
}
