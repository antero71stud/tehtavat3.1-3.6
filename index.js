const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = 
    [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Martti Tienari",
            "number": "040-123456",
            "id": 2
          },
          {
            "name": "Arto Järvinen",
            "number": "040-123456",
            "id": 3
          },
          {
            "name": "Lea Kutvonen",
            "number": "040-123456",
            "id": 4
          }
    ]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id ',id)
    const person = persons.find(p => p.id === id)
    if ( person ) {
        console.log(person)
        response.json(person)    
    } else {
        console.log(`person ${id} not found`)
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    /*console.log('id ',id, typeof id)*/
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })


app.get('/api/info', (request, response) => {
    const maara = persons.length
    const responseText = `puhelinluettelossa on ${maara}:n henkilön tiedot<br /><br />${new Date()}`
    response.send(responseText)
})

const PORT = 3011
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})