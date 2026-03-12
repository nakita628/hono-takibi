/**
 * Modal State Management (Zustand)
 *
 * Each modal has its own independent store with { isOpen, onOpen, onClose }.
 * Components import the specific modal hook they need.
 *
 * ||| Modal Triggers |||
 *
 *   useLoginModal      ← Sidebar, PostItem, UserBio (when not logged in)
 *   useRegisterModal   ← Form (welcome screen), LoginModal (toggle)
 *   useEditModal       ← UserBio (own profile "Edit" button)
 *   useChangePasswordModal ← EditModal ("Change Password" link)
 *
 * ||| Open/Close Flow |||
 *
 *   Component calls onOpen() → isOpen = true → Modal renders
 *   User clicks submit/close → onClose() → isOpen = false → Modal hides
 *
 * LoginModal ↔ RegisterModal can toggle between each other.
 */
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
