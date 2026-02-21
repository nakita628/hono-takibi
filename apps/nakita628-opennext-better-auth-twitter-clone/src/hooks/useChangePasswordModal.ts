import { create } from 'zustand'

type ChangePasswordModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useChangePasswordModal = create<ChangePasswordModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
