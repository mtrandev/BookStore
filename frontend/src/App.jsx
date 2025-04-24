import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreateBook from '../pages/CreateBook';
import ShowBook from '../pages/ShowBook';
import EditBook from '../pages/EditBook';
import DeleteBook from '../pages/DeleteBook';
import Login from '../src/components/LoginForm';
import Register from '../src/components/RegisterForm';
import PrivateRoute from '../src/components/PrivateRoute';
import Navbar from './components/Navbar';
import Profile from '../pages/Profile';


export const App = () => {
  return (
    <div>
        <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={
        <PrivateRoute><Home /></PrivateRoute>
      } />
      <Route path="/profile" element={<Profile />} /> 

      <Route path="/books/create" element={
        <PrivateRoute><CreateBook /></PrivateRoute>
      } />
      <Route path="/books/details/:id" element={
        <PrivateRoute><ShowBook /></PrivateRoute>
      } />
      <Route path="/books/edit/:id" element={
        <PrivateRoute><EditBook /></PrivateRoute>
      } />
      <Route path="/books/delete/:id" element={
        <PrivateRoute><DeleteBook /></PrivateRoute>
      } />
    </Routes>
    </div>
  );
};

export default App;
