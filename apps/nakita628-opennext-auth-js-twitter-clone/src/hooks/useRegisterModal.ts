import { create } from 'zustand'

type RegisterModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
