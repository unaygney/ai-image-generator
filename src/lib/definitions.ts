import { promptsTable } from '@/db/schema'

export interface AuthModalContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  openModal: () => void
  closeModal: () => void
}
export type Promt = typeof promptsTable.$inferSelect
