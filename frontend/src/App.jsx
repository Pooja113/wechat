import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Pages/HomePage';
import Chats from './Pages/Chats';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage />
    ),
  },
  {
    path: "chats",
    element: <Chats />,
  },
])

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )

}

export default App
