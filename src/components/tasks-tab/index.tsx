'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { TaskTable } from '../task-table'
import { TaskTableColumns } from '@/components/task-table/task-table-columns'
import type { Task } from '@/types/task'

interface QueryPostResponse {
  tasks: Task[]
}

export function TasksTab() {
  const { data } = useQuery<QueryPostResponse>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/api/admin/tasks/get-tasks',
      )
      return response.json()
    },
  })

  const tasks = data?.tasks || []

  return (
    <div>
      <h1 className="text-3xl font-bold">Tarefas Recentes</h1>
      <p className="text-muted-foreground mb-6">
        Aqui você pode visualizar as tarefas recentes criadas.
      </p>
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Create New Task
        </Button>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <TaskTable data={tasks} columns={TaskTableColumns} />
      </div>
    </div>
  )
}
