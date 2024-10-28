import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Header=lazy(()=>import("./components/Header"))
const Home=lazy(()=>import("./components/Home"))
const Learning=lazy(()=>import("./components/Learning"))
const Loader=lazy(()=>import("./components/Loader"))
const Login=lazy(()=>import("./components/Login"))
const Quiz=lazy(()=>import("./components/Quiz"))
const Result=lazy(()=>import("./components/Result"))

function App() {
  return (
    <Router>
      <Header/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/learn" element={<Learning/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App
