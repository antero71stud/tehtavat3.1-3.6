const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person_pw')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

morgan.token('data', function (req, res) 
{ 
    return JSON.stringify(req.body)
})

app.get('/api/persons', (request, response) => {
    Person
    .find({})
    .then(persons => {
      response.json(persons.map(formatPerson))
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  })


app.get('/api/info', (request, response) => {
    const maara = persons.length
    const responseText = `puhelinluettelossa on ${maara}:n henkilön tiedot<br /><br />${new Date()}`
    response.send(responseText)
})

const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'name or number missing'})
    }

    if(body.name.trim().length===0 || body.number.trim().length===0){
        return response.status(400).json({error: 'name and number is mandatory'})
    }
  
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  })

const PORT = process.env.PORT || 3011
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
