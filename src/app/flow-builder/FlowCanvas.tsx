'use client'

import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {ReactFlowProvider,addEdge,useReactFlow,Connection,Edge,Node,OnConnect,useNodesState,useEdgesState,MarkerType} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import TextNode from '@/components/nodes/TextNode'
import NodePanel from './NodePanel'
import SettingsPanel from './SettingsPanel'
import { toast } from 'sonner'

const nodeTypes = {
  message: TextNode,
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowBuilderInner />
    </ReactFlowProvider>
  )
}

function FlowBuilderInner() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
  const { project } = useReactFlow()

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const hasEdgeFromSource = edges.some(
        (edge) => edge.source === connection.source
      )
      if (hasEdgeFromSource) {
        toast.error('Only one outgoing edge allowed.')
        return
      }

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      )
    },
    [edges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (typeof type !== 'string' || !type) return

      const bounds = reactFlowWrapper.current?.getBoundingClientRect()
      const position = project({
        x: event.clientX - (bounds?.left ?? 0),
        y: event.clientY - (bounds?.top ?? 0),
      })

      const newNode: Node = {
        id: `${type}_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`,
        type,
        position,
        data: { text: 'New message' },
      }

      setNodes((nds) => [...nds, newNode])
    },
    [project, setNodes]
  )

  const handleSave = () => {
    if (nodes.length > 1) {
      const nodesWithNoIncoming = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
      )
      if (nodesWithNoIncoming.length > 1) {
        toast.error('Only root node can have no incoming edges.')
        return
      }
    }

    const emptyTextNode = nodes.find(
      (node) =>
        node.type === 'message' &&
        typeof node.data === 'object' &&
        node.data &&
        typeof (node.data as any).text === 'string' &&
        ((node.data as any).text.trim() === '')
    )
    if (emptyTextNode) {
      toast.error('Some nodes have empty text.')
      return
    }

    toast.success('Flow saved successfully!')
    console.log({ nodes, edges })
    setNodes([])
    setEdges([])
    setSelectedNodeId(null)
  }

  const handleNodeTextChange = (id: string, newText: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, text: newText } } : node
      )
    )
  }

  const handleAddNode = (type: string) => {
    let position = { x: 200, y: 200 }
    const wrapper = reactFlowWrapper.current
    if (wrapper) {
      const bounds = wrapper.getBoundingClientRect()
      position = project({
        x: bounds.width / 2,
        y: bounds.height / 2,
      })
    }
    const newNode: Node = {
      id: `${type}_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`,
      type,
      position,
      data: { text: 'New message' },
    }
    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full max-w-full">
      <div
        className="flex-1 min-h-[300px] min-w-0 relative"
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }}
        >
        </ReactFlow>
      </div>
      <div className="w-full md:w-[380px] border-r p-4 flex flex-col gap-4 bg-white shadow-sm min-h-[200px]">
        <Button onClick={handleSave}>Save Changes</Button>
        {selectedNodeId ? (
          (() => {
            const node = nodes.find((n) => n.id === selectedNodeId) as Node<{ text: string }> | undefined
            if (!node) return null
            return (
              <SettingsPanel
                node={node}
                onChange={(newText: string) => handleNodeTextChange(node.id, newText)}
                goBack={() => setSelectedNodeId(null)}
              />
            )
          })()
        ) : (
          <NodePanel onAddNode={handleAddNode} />
        )}
      </div>
    </div>
  )
}
