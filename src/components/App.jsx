import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
    };
    this.onAddContact = this.onAddContact.bind(this);
    this.onFilterInput = this.onFilterInput.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('phonebook') !== null) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  onFilterInput(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  onDelete(id) {
    this.setState(state => ({
      contacts: state.contacts.filter(item => item.id !== id),
    }));
  }

  onAddContact(name, number) {
    const isExists = this.state.contacts.find(item => item.name.includes(name));
    if (!isExists) {
      const newContact = {
        name,
        id: uuidv4(),
        number,
      };
      this.setState(state => ({
        contacts: [...state.contacts, newContact],
      }));
    } else {
      alert(`${name} is already in contacts`);
    }
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onFilterInput} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteItem={this.onDelete}
        />
      </div>
    );
  }
}
