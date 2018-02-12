const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
// Kannattaa jättää erikoismerkit käyttäjätunnuksessa ja salassanassa
// käyttämättä ja käyttää pitkää salalausetta. Yli 19 merkkiä riittänee
// pitkälle.
const url = 'mongodb://<username>:<password>:@ds135186.mlab.com:35186/full-stack-persons'

mongoose.connect(url)

var args = process.argv.slice(2);

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: args[0],
  number: args[1]
})

if (args.length !== 0){
  person
    .save()
    .then(response => {
      console.log(`lisätään henkilö ${args[0]} numero ${args[1]} luetteloon`)
      mongoose.connection.close()
    })
} else {
  console.log('Puhelinluettelo:')
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
