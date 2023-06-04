import { Login } from './components/Login.jsx'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { Dashboard } from './components/Dashboard.js';
import { ContactsProvider } from './contexts/ContactsContext.jsx';
import { ConversationsProvider } from './contexts/ConversationsContext.js';

function App() {
  const [id, setId] = useLocalStorage('id', '');

  return id
    ? (
      <ContactsProvider>
        <ConversationsProvider id={id} >
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    )
    : <Login setId={setId} />
}

export default App
