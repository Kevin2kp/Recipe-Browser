const password_hasher = require('../Password_Hasher').Default();

class Password_Hasher_Test{

	static profile_generate_hash(){
		let start = new Date();
		password_hasher.generate_hash('this is a test').catch(console.log).then(()=>{

			let diff = new Date().getTime() - start.getTime();
			console.log(`Time: ${diff} ms`);
		});
	}

	static test_generate_hash(){

		const test_password = 'this is a password';
		password_hasher.generate_hash(test_password).catch(console.log).then((password) =>{

			console.log(password.password_hash);

			return password_hasher.compare(password.password_hash,
				password.hash_salt,
				password.hash_iterations,
				test_password);

		}).catch(console.log).then((result) =>{

			console.log(`Pass: ${result}`);
		})
	}
}

Password_Hasher_Test.test_generate_hash();