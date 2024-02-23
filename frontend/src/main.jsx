import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import PdfUploadForm from './Components/PdfUploadForm.jsx';
import PdfList from './Components/PdfList.jsx';
import PdfViewer from './Components/PdfViewer.jsx';
import Home from './Components/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/upload",
    element: <PdfUploadForm />
  },
  {
    path: "/files",
    element: <PdfList />
  },
  {
    path: "/files/:id",
    element: <PdfViewer />
  },
  {
    path: "/home",
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
