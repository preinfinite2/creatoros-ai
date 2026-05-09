// src/pages/Dashboard.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHome from '../components/dashboard/DashboardHome'
import TitleGenerator from '../components/dashboard/TitleGenerator'
import HookGenerator from '../components/dashboard/HookGenerator'
import ScriptGenerator from '../components/dashboard/ScriptGenerator'
import IdeaGenerator from '../components/dashboard/IdeaGenerator'
import SavedProjects from '../components/dashboard/SavedProjects'

function Dashboard() {
  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-20 lg:pt-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="title-generator" element={<TitleGenerator />} />
          <Route path="hook-generator" element={<HookGenerator />} />
          <Route path="script-generator" element={<ScriptGenerator />} />
          <Route path="idea-generator" element={<IdeaGenerator />} />
          <Route path="saved" element={<SavedProjects />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
