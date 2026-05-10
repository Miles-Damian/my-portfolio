import { useEffect, useState } from 'react'
import { defaultAboutContent } from '../data/aboutContent.js'
import {
  loadLocalAboutContent,
  resetAboutContent,
  saveAboutContent,
} from '../hooks/useAboutContent.js'
import { isSupabaseConfigured } from '../services/aboutContentApi.js'
import { getAdminSession, signInAdmin, signOutAdmin } from '../services/supabaseAuth.js'
import Icon from './Icon.jsx'
import useAboutContent from '../hooks/useAboutContent.js'

const textFields = [
  { label: 'Full Name', name: 'fullName' },
  { label: 'Title', name: 'title' },
  { label: 'Education Label', name: 'education' },
  { label: 'University', name: 'university' },
  { label: 'Degree', name: 'degree' },
  { label: 'Specialization', name: 'specialization' },
  { label: 'Graduation Date', name: 'graduationDate' },
  { label: 'Skill Line', name: 'skillsLine' },
  { label: 'Work Line', name: 'workLine' },
]

const modules = [
  {
    description: 'Edit your profile title, education details, introduction, and About stats.',
    icon: 'person',
    key: 'about',
    title: 'About Content',
  },
  {
    description: 'Manage featured project cards, live links, images, and tech stack tags.',
    icon: 'work',
    key: 'projects',
    title: 'Projects',
  },
  {
    description: 'Update email, Facebook, GitHub, location, and contact form settings.',
    icon: 'mail',
    key: 'contact',
    title: 'Contact',
  },
  {
    description: 'Review Supabase connection status and site content publishing settings.',
    icon: 'settings',
    key: 'settings',
    title: 'Site Settings',
  },
]

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const session = await signInAdmin(email, password)
      onLogin(session)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-slate-950">
      <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-8">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <Icon>admin_panel_settings</Icon>
          </span>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-slate-600">Sign in with your Supabase admin account.</p>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <button
          className="w-full rounded-xl bg-cyan-600 py-4 font-bold text-white transition-all hover:bg-cyan-700 active:scale-95 disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
      </form>
    </main>
  )
}

function AdminHeader({ onOpenDashboard, onSignOut, session }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button className="flex items-center gap-3 text-left" onClick={onOpenDashboard} type="button">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
            <Icon>terminal</Icon>
          </span>
          <span>
            <span className="block text-lg font-bold text-slate-950">Admin Panel</span>
            <span className="block text-sm text-slate-500">Dashboard</span>
          </span>
        </button>

        <div className="flex items-center gap-5 text-sm text-slate-700">
          <span className="hidden sm:inline">{session.email}</span>
          <a className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-700" href="#home">
            <Icon className="text-[18px]">home</Icon>
            Home
          </a>
          <button className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-700" onClick={onSignOut} type="button">
            <Icon className="text-[18px]">logout</Icon>
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  )
}

function Dashboard({ onSelectModule }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-950">Welcome back</h1>
        <p className="mt-2 text-slate-600">Select a module to manage.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <button
            className="group min-h-[230px] rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
            key={module.key}
            onClick={() => onSelectModule(module.key)}
            type="button"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                <Icon>{module.icon}</Icon>
              </span>
              <Icon className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-600">
                arrow_forward
              </Icon>
            </div>
            <h2 className="text-lg font-bold text-slate-950">{module.title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{module.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

function AboutEditor({ onBack }) {
  const currentAboutContent = useAboutContent()
  const [formData, setFormData] = useState(loadLocalAboutContent)
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setFormData(currentAboutContent)
  }, [currentAboutContent])

  const updateField = (fieldName, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }))
  }

  const updateHighlight = (index, fieldName, value) => {
    setFormData((currentData) => ({
      ...currentData,
      highlights: currentData.highlights.map((highlight, highlightIndex) =>
        highlightIndex === index ? { ...highlight, [fieldName]: value } : highlight,
      ),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setStatus('')

    try {
      await saveAboutContent(formData)
      setStatus(isSupabaseConfigured() ? 'Saved to Supabase.' : 'Saved locally. Add Supabase env vars to publish globally.')
    } catch {
      setStatus('Unable to save to Supabase. Check your table, keys, and policies.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    resetAboutContent()
    setFormData(defaultAboutContent)
    setStatus('Restored to default About content.')
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <button className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cyan-700" onClick={onBack} type="button">
        <Icon className="text-[18px]">arrow_back</Icon>
        Back to dashboard
      </button>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">About Content</h1>
          <p className="mt-2 text-slate-600">
            Manage the content shown in your public About section.
          </p>
        </div>
        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${isSupabaseConfigured() ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          {isSupabaseConfigured() ? 'Supabase connected' : 'Local mode'}
        </span>
      </div>

      <form className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            {textFields.map((field) => (
              <label className="block" key={field.name}>
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {field.label}
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  onChange={(event) => updateField(field.name, event.target.value)}
                  type="text"
                  value={formData[field.name]}
                />
              </label>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Introduction Paragraph
            </span>
            <textarea
              className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              onChange={(event) => updateField('intro', event.target.value)}
              value={formData.intro}
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Background Paragraph
            </span>
            <textarea
              className="min-h-40 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              onChange={(event) => updateField('background', event.target.value)}
              value={formData.background}
            />
          </label>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-950">Highlights</h2>
            <div className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={`${highlight.label}-${index}`}>
                  <label className="mb-3 block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Value
                    </span>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      onChange={(event) => updateHighlight(index, 'value', event.target.value)}
                      value={highlight.value}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Label
                    </span>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      onChange={(event) => updateHighlight(index, 'label', event.target.value)}
                      value={highlight.label}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <button
              className="w-full rounded-xl bg-cyan-600 py-4 font-bold text-white shadow-sm transition-all hover:-translate-y-1 hover:bg-cyan-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              className="mt-3 w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition-all hover:border-cyan-300 hover:text-cyan-700 active:scale-95"
              onClick={handleReset}
              type="button"
            >
              Reset Content
            </button>
            {status && <p className="mt-4 text-center text-sm text-slate-600">{status}</p>}
          </div>
        </aside>
      </form>
    </section>
  )
}

export default function AdminPanel() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [session, setSession] = useState(getAdminSession)

  const handleSignOut = () => {
    signOutAdmin()
    setSession(null)
    setActiveModule('dashboard')
  }

  if (!session) {
    return <LoginScreen onLogin={setSession} />
  }

  return (
    <main className="min-h-screen bg-slate-50 font-body-md text-slate-950">
      <AdminHeader
        onOpenDashboard={() => setActiveModule('dashboard')}
        onSignOut={handleSignOut}
        session={session}
      />
      {activeModule === 'dashboard' ? (
        <Dashboard onSelectModule={setActiveModule} />
      ) : activeModule === 'about' ? (
        <AboutEditor onBack={() => setActiveModule('dashboard')} />
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <button className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cyan-700" onClick={() => setActiveModule('dashboard')} type="button">
            <Icon className="text-[18px]">arrow_back</Icon>
            Back to dashboard
          </button>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-950">Coming soon</h1>
            <p className="mt-2 text-slate-600">
              This module is ready for the next CMS section.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
