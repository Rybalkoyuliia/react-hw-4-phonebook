import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchField } from './SearchField/SearchField';

import {
  StyledContactTitle,
  StyledPhonebookTitle,
  StyledPhonebookWrapper,
  StyledSearchFieldWrapper,
} from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    if (contactList?.length) {
      return contactList;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const updateContactList = (name, number) => {
    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const deleteContact = id => {
    return setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const returnContactList = () => {
    if (!filter) {
      return contacts;
    } else {
      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.includes(filter)
      );
    }
  };

  const setingFilter = filteredValue => {
    setFilter(filteredValue);
  };

  return (
    <StyledPhonebookWrapper>
      <StyledPhonebookTitle>My Phonebook</StyledPhonebookTitle>
      <ContactForm setValue={updateContactList} contactList={contacts} />
      <StyledSearchFieldWrapper>
        <StyledContactTitle>Contacts</StyledContactTitle>
        <SearchField setingFilter={setingFilter} />
      </StyledSearchFieldWrapper>
      <ContactList list={returnContactList()} deleteContact={deleteContact} />
    </StyledPhonebookWrapper>
  );
};
