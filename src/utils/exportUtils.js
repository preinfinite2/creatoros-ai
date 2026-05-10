// src/utils/exportUtils.js
export function exportAsJSON(data, filename = 'export.json') {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  downloadFile(blob, filename)
}

export function exportAsCSV(data, filename = 'export.csv') {
  if (!data || !data.length) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header]?.toString() || ''
        return cell.includes(',') ? `"${cell}"` : cell
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadFile(blob, filename)
}

export function exportAsText(content, filename = 'export.txt') {
  const blob = new Blob([content], { type: 'text/plain' })
  downloadFile(blob, filename)
}

export function exportProject(project, format = 'json') {
  const data = {
    title: project.title,
    toolType: project.toolType,
    input: project.input,
    output: project.output,
    metadata: project.metadata,
    exportedAt: new Date().toISOString(),
  }

  switch (format) {
    case 'json':
      exportAsJSON(data, `${project.title || 'project'}.json`)
      break
    case 'txt':
      const text = extractTextFromProject(project)
      exportAsText(text, `${project.title || 'project'}.txt`)
      break
    default:
      exportAsJSON(data, `${project.title || 'project'}.json`)
  }
}

export function exportAllProjects(projects, format = 'json') {
  if (format === 'csv') {
    const csvData = projects.map(p => ({
      title: p.title,
      type: p.toolType,
      created: p.metadata?.createdAt,
      updated: p.metadata?.updatedAt,
    }))
    exportAsCSV(csvData, 'all-projects.csv')
  } else {
    exportAsJSON(projects, 'all-projects.json')
  }
}

function extractTextFromProject(project) {
  const output = project.output
  if (!output) return ''

  if (output.titles) return output.titles.map(t => t.text).join('\n')
  if (output.hooks) return output.hooks.map(h => h.text).join('\n\n')
  if (output.script) return output.script
  if (output.ideas) return output.ideas.map(i => `${i.id}. ${i.title}`).join('\n')
  
  return JSON.stringify(output, null, 2)
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
