import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Teams', '/teams'],
  ['Users', '/users'],
  ['Workouts', '/workouts'],
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <NavLink className="brand" to="/activities" aria-label="OctoFit home">
            <span className="brand-mark" aria-hidden="true">O</span>
            <span>OctoFit Tracker</span>
          </NavLink>
          <nav className="nav nav-pills app-nav" aria-label="Main navigation">
            {navigation.map(([label, path]) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container app-content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">Move together. Get stronger together.</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
