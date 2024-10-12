'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TaskTable } from '../task-table'
import { TaskTableColumns } from '@/components/task-table/task-table-columns'
import type { Task } from '@/types/task'
import { BASE_URL } from '@/constants/base-url'
import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type CreateTaskSchema,
  createTaskSchema,
} from '@/schemas/create-task-schema'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface QueryPostResponse {
  tasks: Task[]
}

export function TasksTab() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data } = useQuery<QueryPostResponse>({
    queryKey: ['get-tasks'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/admin/tasks/get-tasks`)
      return response.json()
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  const { mutate: createTask } = useMutation({
    mutationKey: ['create-task'],
    mutationFn: async (data: CreateTaskSchema) => {
      const response = await fetch(`${BASE_URL}/api/admin/tasks/create-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tasks'],
      })

      reset()

      setIsCreateDialogOpen(false)

      toast({
        title: 'Tarefa criada com sucesso!',
        description: 'A tarefa foi criada com sucesso.',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar tarefa',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: CreateTaskSchema) => {
    createTask(data)
  }

  const tasks = data?.tasks || []

  return (
    <div>
      <h1 className="text-3xl font-bold">Tarefas Recentes</h1>
      <p className="text-muted-foreground mb-6">
        Aqui você pode visualizar as tarefas recentes criadas.
      </p>
      <div className="flex justify-between items-center mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crie uma nova tarefa</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar uma nova tarefa.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="title">Título</label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Título da tarefa"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tag">Tag</label>
                <Input
                  id="tag"
                  {...register('tag')}
                  placeholder="Tag da tarefa"
                />
                {errors.tag && (
                  <p className="text-red-500">{errors.tag.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status">Status</label>
                <Select
                  onValueChange={(value) =>
                    register('status').onChange({ target: { value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BACKLOG">Backlog</SelectItem>
                    <SelectItem value="TODO">A Fazer</SelectItem>
                    <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                    <SelectItem value="DONE">Concluída</SelectItem>
                    <SelectItem value="CANCELED">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="priority">Prioridade</label>
                <Select
                  onValueChange={(value) =>
                    register('priority').onChange({ target: { value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixa</SelectItem>
                    <SelectItem value="MEDIUM">Média</SelectItem>
                    <SelectItem value="HIGH">Alta</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-red-500">{errors.priority.message}</p>
                )}
              </div>

              {/* Botão de submissão */}
              <Button type="submit" className="mt-4">
                Criar Tarefa
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <TaskTable data={tasks} columns={TaskTableColumns} />
      </div>
    </div>
  )
}
