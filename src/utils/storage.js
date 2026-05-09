// src/utils/storage.js
export function saveProject(project) {
  const projects = getProjects()
  projects.unshift({
    id: Date.now().toString(),
    ...project,
    createdAt: new Date().toISOString()
  })
  localStorage.setItem('creatoros_projects', JSON.stringify(projects))
  return projects
}

export function getProjects() {
  return JSON.parse(localStorage.getItem('creatoros_projects') || '[]')
}

export function deleteProject(id) {
  const projects = getProjects().filter(p => p.id !== id)
  localStorage.setItem('creatoros_projects', JSON.stringify(projects))
  return projects
}

export function getProjectById(id) {
  return getProjects().find(p => p.id === id)
}
