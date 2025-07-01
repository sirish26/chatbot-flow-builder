'use client'

import { Handle, Position, NodeProps } from 'reactflow'
import { Card } from '@/components/ui/card'
import { MessageCircleMore , Send } from 'lucide-react'

export default function TextNode({ data }: NodeProps) {
  return (
    <Card className="p-0 w-[200px] max-w-full bg-white border-[1.5px] border-teal-300 shadow-sm rounded-lg flex flex-col">
      <div className="flex items-center justify-between text-sm font-semibold px-3 py-2 rounded-t-lg bg-[#a7f3d0] border-b border-teal-200">
        <div className="flex items-center gap-1">
          <MessageCircleMore className="w-4 h-4" />
          <span>Send Message</span>
        </div>
        <Send className="w-4 h-4" />
      </div>
      <div className="bg-white px-3 py-3 text-base min-h-[40px] whitespace-pre-line break-words rounded-b-lg">
        {data.text}
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Card>
  )
}
