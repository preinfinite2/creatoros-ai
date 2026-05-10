// src/services/projectService.js
const PROJECTS_KEY = 'creatoros_projects'

class ProjectService {
  getAll() {
    try {
      const projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]')
      return this._sortByDate(projects)
    } catch {
      return []
    }
  }

  create(projectData) {
    const projects = this.getAll()
    
    const newProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: projectData.title || 'Untitled Project',
      toolType: projectData.toolType || 'other',
      input: projectData.input || {},
      output: projectData.output || {},
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        ...projectData.metadata,
      },
      settings: projectData.settings || {},
    }

    projects.unshift(newProject)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
    
    return newProject
  }

  update(id, data) {
    const projects = this.getAll()
    const index = projects.findIndex(p => p.id === id)
    
    if (index === -1) throw new Error('Project not found')

    projects[index] = {
      ...projects[index],
      ...data,
      metadata: {
        ...projects[index].metadata,
        updatedAt: new Date().toISOString(),
        version: (projects[index].metadata?.version || 0) + 1,
      }
    }

    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
    return projects[index]
  }

  delete(id) {
    const projects = this.getAll().filter(p => p.id !== id)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
    return true
  }

  getById(id) {
    return this.getAll().find(p => p.id === id) || null
  }

  getByType(type) {
    return this.getAll().filter(p => p.toolType === type)
  }

  search(query) {
    const projects = this.getAll()
    const searchLower = query.toLowerCase()
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      JSON.stringify(p.input).toLowerCase().includes(searchLower) ||
      JSON.stringify(p.output).toLowerCase().includes(searchLower)
    )
  }

  getStats() {
    const projects = this.getAll()
    const now = new Date()
    const thisMonth = projects.filter(p => {
      const date = new Date(p.metadata.createdAt)
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    })

    return {
      total: projects.length,
      thisMonth: thisMonth.length,
      byType: {
        titles: projects.filter(p => p.toolType === 'title-generator').length,
        hooks: projects.filter(p => p.toolType === 'hook-generator').length,
        scripts: projects.filter(p => p.toolType === 'script-generator').length,
        ideas: projects.filter(p => p.toolType === 'idea-generator').length,
      },
      recent: projects.slice(0, 5),
    }
  }

  _sortByDate(projects) {
    return projects.sort((a, b) => 
      new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt)
    )
  }

  clearAll() {
    localStorage.removeItem(PROJECTS_KEY)
    return true
  }
}

export const projectService = new ProjectService()
