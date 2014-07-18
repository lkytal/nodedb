mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/local')

Schema = mongoose.Schema

exp =
	name : 'dmf'
	cid : '1-1-1'
	create_date : '2014'

ChemSchema = new Schema {
		name : String,
		cid : String,
		create_date : String
	}

Chem = mongoose.model("Chem", ChemSchema)

exports.addChem = (data) ->
	item = new Chem(data)
	item.save (err) -> console.log err

exports.findChem = (name, callback) ->
	Chem.findOne {name:name}, (err, data) ->
		console.log err if err
		callback data