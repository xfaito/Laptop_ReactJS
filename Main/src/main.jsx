import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store.jsx'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
    <App />
    </Provider>

  )
  

