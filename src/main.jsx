import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Todo from './Pages/Todo';
import Register from './Pages/Register';
import Layout from './Layout';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProtectedRoutes from './component/ProtectedRoutes';
import Logout from './Pages/Logout';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'todo', element: <ProtectedRoutes component={<Todo />} /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'logout', element: <Logout /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
