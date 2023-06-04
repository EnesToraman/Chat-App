import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Contact {
  id: string,
  name: string
}

interface ContextDefaultValues {
  contacts: Contact[],
  createContact(contact: Contact): void
}

export const ContactsContext = createContext<ContextDefaultValues>({} as ContextDefaultValues);

export const ContactsProvider = ({ children } : { children: ReactNode}) => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contact', []);

  const createContact = (contact: Contact): void => {
    setContacts((prev: Contact[]) => ([...prev, contact]))
  }

  const value = {
    contacts,
    createContact
  }
  
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}