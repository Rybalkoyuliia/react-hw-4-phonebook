import React from 'react';

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

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let storedContacts = [];
    storedContacts = localStorage.getItem('contactList');
    this.setState({ contacts: JSON.parse(storedContacts) || [] });
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }

  updateContactList = (name, number) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  deleteContact = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  returnContactList = () => {
    if (!this.state.filter) {
      return this.state.contacts;
    } else {
      return this.state.contacts.filter(
        contact =>
          contact.name
            .toLowerCase()
            .includes(this.state.filter.toLowerCase()) ||
          contact.number.includes(this.state.filter)
      );
    }
  };

  setFilter = filteredValue => {
    this.setState({ filter: filteredValue });
  };

  render = () => {
    return (
      <StyledPhonebookWrapper>
        <StyledPhonebookTitle>My Phonebook</StyledPhonebookTitle>
        <ContactForm
          setValue={this.updateContactList}
          contactList={this.state.contacts}
        />
        <StyledSearchFieldWrapper>
          <StyledContactTitle>Contacts</StyledContactTitle>
          <SearchField setFilter={this.setFilter} />
        </StyledSearchFieldWrapper>
        <ContactList
          list={this.returnContactList()}
          delete={this.deleteContact}
        />
      </StyledPhonebookWrapper>
    );
  };
}
