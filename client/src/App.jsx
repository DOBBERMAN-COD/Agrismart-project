import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WasteListings from './pages/WasteListings'
import GetTransport from './pages/GetTransport'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import CreateListing from "./pages/CreateListing"
import MyListings from "./pages/MyListings"

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
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/my-listings" element={<MyListings/>}/>
        <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App