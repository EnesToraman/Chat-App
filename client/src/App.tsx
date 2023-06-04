import { Login } from './components/Login.jsx'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { Dashboard } from './components/Dashboard.js';
import { ContactsProvider } from './contexts/ContactsProvider.js';
import { ConversationsProvider } from './contexts/ConversationsProvider.js';
import { SocketProvider } from './contexts/SocketProvider.js';

function App() {
  const [id, setId] = useLocalStorage('id', '');

  return id
    ? (
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id} >
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    )
    : <Login setId={setId} />
}

export default App
