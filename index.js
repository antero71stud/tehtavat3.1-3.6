const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const persons = 
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

app.get('/api/info', (request, response) => {
    const maara = persons.length
    const responseText = `puhelinluettelossa on ${maara}:n henkilön tiedot<br /><br />${new Date()}`
    response.send(responseText)
})

const PORT = 3011
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})