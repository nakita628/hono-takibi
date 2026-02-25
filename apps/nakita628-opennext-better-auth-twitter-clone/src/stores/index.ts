import { create } from 'zustand'

type ModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

function createModalStore() {
  return create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }))
}

export const useLoginModal = createModalStore()
export const useRegisterModal = createModalStore()
export const useEditModal = createModalStore()
export const useChangePasswordModal = createModalStore()
