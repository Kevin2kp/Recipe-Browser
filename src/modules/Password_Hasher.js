const crypto = require('crypto');

/**
 * @param {hash_algorithm}
 * @param {key_length}
 * @param {salt_length}
 * @param {iterations}
 * @param {output_encoding}
 */

class Password_Hasher{

	constructor(hash_algorithm, key_length, salt_length,iterations, output_encoding){
		
		this.hash_algorithm = hash_algorithm;
		this.key_length = key_length;
		this.salt_length = salt_length;
		this.iterations = iterations;
		this.output = output_encoding;
	}

	generate_hash(password){

		return new Promise((resolve, reject) =>{

			const salt = crypto.randomBytes(this.salt_length).toString('utf8');

			crypto.pbkdf2(
				password,
				salt,
				this.iterations,
				this.key_length,
				this.hash_algorithm,
				(error, hash) => {

					if (error) {
						return reject(error);
					}

					resolve({
						password_hash: hash.toString(this.output_encoding),
						hash_salt: salt,
						hash_iterations: this.iterations
					});
				}
			);
		})
	}

	compare(hash, salt, iterations, password){

		return new Promise((resolve, reject) =>{

			crypto.pbkdf2(
				password,
				salt,
				iterations,
				this.key_length,
				this.hash_algorithm,
				(error, generated_hash) => {

					if (error) {
						return reject(error);
					}

					resolve(hash === generated_hash.toString(this.output_encoding));
				}
			);
		});
	}
}

const DEFAULT_CONFIG = {

	hash_algorithm: 'sha512',
	key_length: 512,
	salt_length: 128,
	iterations: 10000,
	output_encoding: 'utf8'
}

class Factory{

	constructor(){

		//Default parameters

		Object.assign(this, DEFAULT_CONFIG);

	}

	apply_config(config){

		this.hash_algorithm = config.hash_algorithm || this.hash_algorithm;
		this.key_length = config.key_length || this.key_length;
		this.salt_length = config.salt_length || this.salt_length;
		this.iterations = config.iterations || this.iterations;
		this.output_encoding = config.output_encoding || this.output_encoding;

		return this;
	}

	create_instance(){

		return new Password_Hasher(

			this.hash_algorithm,
			this.key_length,
			this.salt_length,
			this.iterations,
			this.output_encoding
		);
	}

	static Default(){
		return new Factory().create_instance();
	}
}

module.exports = Factory;