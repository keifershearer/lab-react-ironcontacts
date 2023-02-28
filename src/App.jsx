import { useState } from "react";
import "./App.css";
import contactsDB from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsDB.slice(0, 5))
  const deleteContact = (id) => {
    const deleted = contacts.filter((contact) => contact.id !== id)
    setContacts(deleted)
  }
  const sortPop = () => {
    const copy = [...contacts]
    copy.sort((a, b) => a.popularity - b.popularity)
    return setContacts(copy)
  }
  const sortName = () => {
    const copy = [...contacts]
    copy.sort((a, b) => a.name.localeCompare(b.name))
    return setContacts(copy)
  }
  const addContact = () => {
    const copy = [...contacts]
    const filteredContact = contactsDB.filter(element => {
      return copy.indexOf(element) === -1
    })
    const randomIndex = Math.floor(Math.random() * filteredContact.length)
    copy.push(filteredContact[randomIndex])
    setContacts(copy)
  }
  return <div className="App">
    <h1>IronContacts</h1>
    <div class='top-button-container'>
      <button onClick={addContact} id='add-contact-button'>Add Contact</button>
      <button onClick={sortName}>Sort by Name</button>
      <button onClick={sortPop}>Sort by Popularity</button>
    </div>
    <table>
      <thead>
        <th></th>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
      </thead>
      <tbody>
        {contacts.map(contact => {
          return (
            <tr>
              <td><button onClick={() => deleteContact(contact.id)} id='delete'>Delete</button></td>
              <td><img src={contact.pictureUrl} alt="contact pic" /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar && '🏆'}</td>
              <td>{contact.wonEmmy && '🏆'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>;
}
export default App;
