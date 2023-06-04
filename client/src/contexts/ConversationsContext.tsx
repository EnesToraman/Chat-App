import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ContactsContext } from './ContactsContext';
import { compareStringArray } from '../utils/compareStringArray';

interface Message {
  message: string,
  sender: string,
  fromMe: boolean,
  senderName: string
}

interface Conversation {
  recipients: string[],
  messages: Message[]
}

interface Recipients {
  id: string,
  name: string
}

interface FormattedConversation {
  recipients: Recipients[],
  messages: Message[],
  selected: boolean
}

interface ConversationsDefaultValues {
  conversations: Conversation[],
  createConversation(recipients: string[]): void
  formattedConversations: FormattedConversation[],
  selectedConversationIndex: number,
  setSelectedConversationIndex: Dispatch<SetStateAction<number>>
  selectedConversation: FormattedConversation,
  sendMessage(recipients: string[], message: string): void
}

export const ConversationsContext = createContext<ConversationsDefaultValues>({} as ConversationsDefaultValues);

export const ConversationsProvider = ({ id, children }: { id: string, children: ReactNode }) => {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0)
  const { contacts } = useContext(ContactsContext);

  const createConversation = (recipients: string[]): void => {
    setConversations((prev: Conversation[]) => ([...prev, { recipients, messages: [] }]))
  }

  const formattedConversations = conversations.map((conversation: Conversation, index: number) => {
    const recipients = conversation.recipients.map((recipient: string) => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map((message: Message) => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  const addMessageToConversation = (recipients: string[], message: string, sender: string) => {
    setConversations((prev: Conversation[]) => {
      let conversationExist = false;
      const newMessage = { sender, message }
      const newConversations = prev.map((conversation) => {
        if (compareStringArray(conversation.recipients, recipients)) {
          conversationExist = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          };
        }
        return conversation;
      })

      if (conversationExist) {
        return newConversations;
      } else {
        return [...prev, { recipients, messages: [newMessage] }];
      }
    })
  }

  const sendMessage = (recipients: string[], message: string) => {
    addMessageToConversation(recipients, message, id);
  }

  const value = {
    conversations,
    createConversation,
    formattedConversations,
    selectedConversationIndex,
    setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}