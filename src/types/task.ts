export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Status {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export interface Task {
  title: string
  tag: string
  userId: string
  priority: Priority
  status: Status
}
