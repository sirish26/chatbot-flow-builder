import React from 'react'
import { Input } from '@/components/ui/input'
import { Node } from 'reactflow'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SettingsPanelProps {
  node: Node<{ text: string }>
  onChange: (text: string) => void
  goBack: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, onChange, goBack }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold">Message</h2>
      </div>
      <hr />

      <div className="space-y-1">
        <label className="text-sm font-medium">Text</label>
        <Input
          value={node.data.text}
          onChange={handleInputChange}
          placeholder="Enter text"
          autoFocus
        />
      </div>
      <hr />
    </div>
  )
}

export default SettingsPanel
