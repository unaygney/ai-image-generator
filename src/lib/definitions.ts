export interface AuthModalContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  openModal: () => void
  closeModal: () => void
}
