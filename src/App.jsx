import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import './index.css'

import Books from "./Components/Books"
import Form from "./Components/Form"
import BookDetail from "./Components/BookDetails"


function App() {

  const [darkmode, setDarkMode] = useState(false);

  return (
    <div>

      <Routes>
        <Route path='/' element={<Books darkmode={darkmode} setDarkMode={setDarkMode}/>} />
        <Route path='/register' element={<Form darkmode={darkmode} setDarkMode={setDarkMode}/>} />
        <Route path="/book-details" element={<BookDetail darkmode={darkmode} setDarkMode={setDarkMode}/>} />
      </Routes>

    </div>
  )
}

export default App