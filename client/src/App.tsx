import { Login } from './components/Login.jsx'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage.js'
import { Dashboard } from './components/Dashboard.js';

function App() {
  const [id, setId] = useLocalStorage('id', '');

  return id ? <Dashboard id={id} /> : <Login setId={setId} />
}

export default App
