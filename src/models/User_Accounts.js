//Modules

const Password_Hasher = require('../modules/Password_Hasher');
const User_Schema = require('../mongoose_schemas/User');

/*----------------------------------------------------------------------------------------------------------------------
 FACADE
----------------------------------------------------------------------------------------------------------------------*/

class User_Accounts{

	constructor(){

		this.hash_function = Password_Hasher.Default();
		this.users = User_Schema();
	}

	authenticate_user(login_credentials){

		let user = null;

		return new Promise((resolve, reject) =>{

			//Get user document from mongoose model

			this.users.fetch_user(login_credentials.username).catch((error) =>{

				//User not found

				error.status = 401
				reject(error);

			//User found, check stored hash with input password

			}).then((fetched_user) =>{

				console.log(fetched_user);
				user = fetched_user;

				return this.hash_function.compare(user.password_hash,
					user.hash_salt,
					user.hash_iterations,
					login_credentials.password);

			//Error comparing passwords

			}).catch((error) =>{

				error.status = 500;
				reject(error);

			//User found, check stored hash with input password

			}).then((passwords_match) =>{

				if(!passwords_match){

					const error = new Error('Username or password does not match');
					error.status = 401;
					return reject(error);
				}

				resolve(user);


			//Error comparing passwords

			}).catch((error)=>{

				error.status = 500;
				reject(error);
			});
		})
	}


	create_user(user_info){

		return new Promise((resolve, reject) =>{

			//Attempt to generate hash

			this.hash_function.generate_hash(user_info.password).catch((error) =>{

				error.status = 500;
				reject(error);

			//Attempt to store user info & hashed password in db

			}).then((hash_obj) =>{

				Object.assign(user_info, hash_obj);

				return this.users.create(user_info)

			//Error puting entry in db

			}).catch((error) =>{

				error.status = 401;
				reject(error);

			//Return created user to caller

			}).then(resolve);
		})
	}
}


/*----------------------------------------------------------------------------------------------------------------------
 EXPORTS
 ----------------------------------------------------------------------------------------------------------------------*/


module.exports = new User_Accounts();

