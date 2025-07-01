import { Card } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

interface NodePanelProps {
  onAddNode: (type: string) => void
}

export default function NodePanel({ onAddNode }: NodePanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Card
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('application/reactflow', 'message')
          e.dataTransfer.effectAllowed = 'move'
        }}
        onClick={() => onAddNode('message')}
        className="flex items-center gap-2 p-2 cursor-pointer select-none"
        tabIndex={0}
        role="button"
        aria-label="Add Message Node"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Message</span>
      </Card>
    </div>
  )
}
