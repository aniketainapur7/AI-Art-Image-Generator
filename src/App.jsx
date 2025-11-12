import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HeroSectionOne } from './components/ui/HeroSectionOne'
import HeroWithBallpit from './components/ui/HeroWithBallpit'
import { FloatingNavDemo } from './components/ui/FloatingNavDemo'
import Homepage from './pages/Homepage'
import Landingpage from './pages/Landingpage'
import { SidebarDemo } from './components/ui/Sidebardemo'
import { Route, Router, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import { AuthProvider } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import ForYou from './pages/ForYou'
import Gallery from './pages/Gallery'
import History from './pages/History'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Landingpage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="gallery"
            element={
              <ProtectedRoute>
                <Gallery/>
              </ProtectedRoute>
            }
          />
          <Route
            path="for-you"
            element={
              <ProtectedRoute>
                <ForYou/>
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History/>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
   
  )
}

export default App
