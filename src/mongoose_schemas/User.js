const mongoose = require('mongoose');

/*----------------------------------------------------------------------------------------------------------------------
 LOAD MONGOOSE SCHEMA
 ----------------------------------------------------------------------------------------------------------------------*/

const User_Schema = new mongoose.Schema({

	first_name: {
		type: String,
		required: true,
		trim: true
	},

	last_name: {
		type: String,
		required:false,
		trim: true
	},

	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},

	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},

	password_hash: {
		type: String,
		required: true
	},

	hash_salt: {
		type: String,
		required: true
	},

	hash_iterations: {
		type: Number,
		validate: {
			validator: Number.isInteger,
			message: `Input is not an integer`
		}

	}
});


/*----------------------------------------------------------------------------------------------------------------------
METHODS
----------------------------------------------------------------------------------------------------------------------*/

User_Schema.statics = {

	fetch_user(username){

		return new Promise((resolve, reject) =>{

			this.findOne({username}).catch(reject).then(user =>{

				resolve(user);
			})
		})
	},
}

module.exports = mongoose.model.bind(mongoose,'User_Accounts', User_Schema);