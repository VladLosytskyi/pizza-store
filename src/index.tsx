import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { store } from './redux-toolkit/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
        <ToastContainer autoClose={ 3000 } theme={ 'colored' } closeButton={ false } hideProgressBar />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
