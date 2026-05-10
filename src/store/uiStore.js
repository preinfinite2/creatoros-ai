// src/store/uiStore.js
import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  activeTool: null,
  generationLoading: false,

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setGenerationLoading: (loading) => set({ generationLoading: loading }),
}))
