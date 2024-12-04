import type React from "react"
import { useCallback, useRef, useState } from "react"
import "./styles.css"

interface SplitPaneProps {
  left: React.ReactNode
  right: React.ReactNode
  defaultSplit?: number
  minSize?: number
}

const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  defaultSplit = 50,
  minSize = 100,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [splitPosition, setSplitPosition] = useState(defaultSplit)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef<number>(0)
  const initialSplitRef = useRef<number>(defaultSplit)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      dragStartXRef.current = e.clientX
      initialSplitRef.current = splitPosition
    },
    [splitPosition],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const deltaX = e.clientX - dragStartXRef.current
      const deltaPercent = (deltaX / containerWidth) * 100

      const newSplit = Math.min(
        Math.max(
          initialSplitRef.current + deltaPercent,
          (minSize / containerWidth) * 100,
        ),
        100 - (minSize / containerWidth) * 100,
      )

      requestAnimationFrame(() => {
        setSplitPosition(newSplit)
      })
    },
    [isDragging, minSize],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div
      className={`repl-split-panel-container ${isDragging && "dragging"}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={`repl-split-panel-left ${isDragging && "repl-split-panel-dragging"}`}
        style={{ width: `${splitPosition}%` }}
      >
        {left}
      </div>
      <div className="repl-split-panel-divider" onMouseDown={handleMouseDown} />
      <div
        className={`repl-split-panel-right ${isDragging && "repl-split-panel-dragging"}`}
        style={{ width: `${100 - splitPosition}%` }}
      >
        {right}
      </div>
    </div>
  )
}

export default SplitPane
