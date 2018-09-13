const user_accounts = require('../models/User_Accounts');

class User_Presenter{

	render_login_page(req,res,next){

		res.render('login', {title: 'Login', session: Boolean(req.session.user_id)});
	}

	render_registration_page(req,res,next){

		res.render('registration', {title: 'Register', session: Boolean(req.session.user_id)});
	}

	submit_login_form(req,res,next){

		const login_credentials = {

			username: req.body.username,
			password: req.body.password
		}

		//Validate user input here




		//Authenticate user

		user_accounts.authenticate_user(login_credentials).catch((error) =>{

			//Login error: do something about it

			next(error);

		}).then((user)=>{

			req.session.user_id = user._id;
			res.redirect('/');
		})
	}

	submit_registration_form(req,res,next) {

		const user_info = {

			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		}

		//Validate user input here


		user_accounts.create_user(user_info).catch(error => {

			res.status(500);
			next(error);

		}).then(user => {

			req.session.user_id = user._id;
			res.redirect('/');

		})
	}

	logout(req,res,next){

		req.session.destroy();
		res.redirect('/');
	}
}

module.exports = new User_Presenter();