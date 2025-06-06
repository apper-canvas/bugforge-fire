import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-ghost relative overflow-hidden">
        {/* Scan lines overlay */}
        <div className="fixed inset-0 pointer-events-none scan-lines"></div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-secondary border-2 border-steel font-mono text-ghost"
          progressClassName="bg-terminal"
        />
      </div>
    </Router>
  )
}

export default App