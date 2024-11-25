import './styles/App.scss'
import './styles/login.scss'
import { RouterProvider } from 'react-router-dom'

import router from "./router/router";

function App() {
  return <RouterProvider router={router} />
}

export default App
