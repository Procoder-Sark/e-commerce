import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter } from 'react-router';
import routes from './routes.jsx';
import { RouterProvider } from 'react-router';

let router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: routes
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router= {router}>
    <App />
  </RouterProvider>,
)
