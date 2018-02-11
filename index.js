const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
/*app.use(morgan('tiny'))*/

morgan.token('data', function (req, res) 
{ 
    return JSON.stringify(req.body)
})

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

const generateId = () => {
    const max=1000000000
    return Math.floor(Math.random() * max);
}


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    /*console.log('id ',id)*/
    const person = persons.find(p => p.id === id)
    if ( person ) {
        /*console.log(person)*/
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

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'name or number missing'})
    }

    if(body.name.trim().length===0 || body.number.trim().length===0){
        return response.status(400).json({error: 'name and number is mandatory'})
    }
  
    const oldperson = persons.find(p => p.name === body.name)

    if(oldperson !== undefined){
        return response.status(409).json({error: 'name must be unique'})
    }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3011
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})