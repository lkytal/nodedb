mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/local')

Schema = mongoose.Schema

ChemSchema = new Schema {
		name : String,
		cid : String,
		create_date : String
	}

Chem = mongoose.model("Chem", ChemSchema)

addChem = (data) ->
	item = new Chem(data)
	item.save (err) -> console.log err

findChem = (name) ->
	Chem.findOne {name:name}, (err, data) -> console.log data.name
	
exp =
	name : 'dmf'
	cid : '1-1-1'
	create_date : '2014'
	
addChem exp

findChem 'dmf'