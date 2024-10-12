import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const statuses = [
  {
    value: 'BACKLOG',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'TODO',
    label: 'A Fazer',
    icon: CircleIcon,
  },
  {
    value: 'IN_PROGRESS',
    label: 'Em Progresso',
    icon: StopwatchIcon,
  },
  {
    value: 'DONE',
    label: 'Feito',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELED',
    label: 'Cancelado',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Baixa',
    value: 'LOW',
    icon: ArrowDownIcon,
  },
  {
    label: 'Média',
    value: 'MEDIUM',
    icon: ArrowRightIcon,
  },
  {
    label: 'Alta',
    value: 'HIGH',
    icon: ArrowUpIcon,
  },
]
