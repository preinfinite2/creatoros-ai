// src/hooks/useProjects.js (Missing hook for project operations)
import { useCallback } from 'react'
import { useProjectStore } from '@store/projectStore'
import { exportProject, exportAllProjects } from '@utils/exportUtils'
import toast from 'react-hot-toast'

export function useProjects() {
  const {
    projects,
    isLoading,
    addProject,
    deleteProject,
    getProjectById,
    getProjectsByType,
    getRecentProjects,
  } = useProjectStore()

  const saveProject = useCallback((project) => {
    try {
      const newProject = addProject(project)
      toast.success('Project saved!')
      return newProject
    } catch (error) {
      toast.error('Failed to save project')
      throw error
    }
  }, [addProject])

  const removeProject = useCallback((id) => {
    try {
      deleteProject(id)
      toast.success('Project deleted')
    } catch (error) {
      toast.error('Failed to delete project')
      throw error
    }
  }, [deleteProject])

  const exportSingleProject = useCallback((project, format = 'json') => {
    try {
      exportProject(project, format)
      toast.success(`Project exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export project')
    }
  }, [])

  const exportProjects = useCallback((projectsList, format = 'json') => {
    try {
      exportAllProjects(projectsList || projects, format)
      toast.success(`Projects exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export projects')
    }
  }, [projects])

  return {
    projects,
    isLoading,
    saveProject,
    removeProject,
    exportSingleProject,
    exportProjects,
    getProjectById,
    getProjectsByType,
    recentProjects: getRecentProjects(),
  }
}
