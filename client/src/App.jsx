import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WasteListings from './pages/WasteListings'
import GetTransport from './pages/GetTransport'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import CreateListing from "./pages/CreateListing"

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/listings" element={<WasteListings/>}/>
        <Route path="/transport" element={<GetTransport/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App