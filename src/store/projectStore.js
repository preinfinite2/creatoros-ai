// src/store/projectStore.js
import { create } from 'zustand'
import { projectService } from '@services/projectService'

export const useProjectStore = create((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  loadProjects: () => {
    try {
      const projects = projectService.getAll()
      set({ projects })
    } catch (error) {
      set({ error: error.message })
    }
  },

  addProject: (project) => {
    try {
      const newProject = projectService.create(project)
      set((state) => ({ projects: [newProject, ...state.projects] }))
      return newProject
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  deleteProject: (id) => {
    try {
      projectService.delete(id)
      set((state) => ({ projects: state.projects.filter(p => p.id !== id) }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  getProjectById: (id) => {
    return get().projects.find(p => p.id === id) || null
  },

  getProjectsByType: (type) => {
    return get().projects.filter(p => p.toolType === type)
  },

  getRecentProjects: (limit = 5) => {
    return get().projects.slice(0, limit)
  },

  clearError: () => set({ error: null }),
}))
