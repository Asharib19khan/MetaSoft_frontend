"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"

interface SelectFieldProps {
  id: string
  name: string
  options: string[]
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export function SelectField({ id, name, options, placeholder = "Select an option", value, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (open && activeIndex >= 0) {
        onChange(options[activeIndex])
        setOpen(false)
      } else {
        setOpen(true)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* hidden input keeps the value submittable with the native form */}
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between rounded-lg border border-line bg-white/[0.04] px-4 py-3 text-left text-sm outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(29,111,235,0.15)] ${
          open ? "border-brand shadow-[0_0_0_3px_rgba(29,111,235,0.15)]" : ""
        } ${value ? "text-ink" : "text-ink-muted"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-listbox`}
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-xl p-1.5 shadow-2xl"
          >
            {options.map((option, i) => {
              const selected = option === value
              return (
                <li key={option} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeIndex === i ? "bg-elevated text-ink" : "text-ink-secondary"
                    } ${selected ? "text-ink" : ""}`}
                  >
                    <span className="truncate">{option}</span>
                    {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
