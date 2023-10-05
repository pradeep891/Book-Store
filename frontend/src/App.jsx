import React from 'react'
import {Routes, Route} from 'react-router-dom'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/create' element={<CreateBooks />} />
    </Routes>
  )
}

export default App;