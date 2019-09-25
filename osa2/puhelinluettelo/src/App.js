import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'

const Persons = ({ persons, filter }) => {

  const numbers = persons
    .filter(person => person.name.toLowerCase().includes(filter))
    .map(person =>
      <Person
        key={person.id}
        person={person}
      />
    )
  return (
    <ul>{numbers}</ul>
  )

}

const Filter = ({filter, setFilter}) => {

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <form>
      <div>filter shown with:
        <input value={filter}
          onChange={handleFilterChange} />
      </div>
    </form>
  )

}

const PersonForm = ({addPerson, newName, newNumber, setNewName, setNewNumber}) => {
   
  const handlePersonChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  
 
  return (
  <form onSubmit={addPerson}>
    <div>
      name:
        <input
        value={newName}
        onChange={handlePersonChange} />
    </div>
    <div>
      number:
        <input
        value={newNumber}
        onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fullfilled')
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} already exists in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} setFilter = {setFilter}/>
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} setNewName = {setNewName} setNewNumber = {setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter = {filter} />
    </div>
  )

}

export default App