const express = require('express');
const router = express.Router();

//Presenter classes

const 	index = require('../presenters/Main_Presenter'),
		user = require('../presenters/User_Presenter'),
		recipes = require('../presenters/Recipe_Presenter');

//Routes

router.get('/', (req, res, next) =>{

	if(!req.session || !req.session.user_id){
		return index.render_land_page(req,res,next);
	}

	index.render_homepage(req,res, next);
});

router.get('/login', (req,res,next) =>{

	if(req.session && req.session.user_id){
		return index.render_homepage(req,res,next);
	}

	console.log('attempting')
	user.render_login_page(req,res,next);
});

router.post('/login', (req,res,next) =>{

	if(req.session && req.session.user_id){
		return res.status(400).end();
	}

	user.submit_login_form(req,res,next);
});

router.get('/register', (req,res,next) =>{

	if(req.session && req.session.user_id){
		return index.render_homepage(req,res,next);
	}

	user.render_registration_page(req,res,next);
});

router.post('/register', (req,res,next) =>{

	if(req.session && req.session.user_id){
		return res.status(400).end();
	}

	user.submit_registration_form(req,res,next);
});

router.post('/logout', (req,res,next) =>{

	user.logout(req,res,next);
});

router.post('/recipes', (req,res,next) =>{

	if(!req.session || !req.session.user_id){
		return res.status(401).end();
	}

	recipes.get_recipe_list_json(req,res,next);
});

router.get('/recipes/edit', (req,res,next)=>{

	if(!req.session || !req.session.user_id){
		return index.render_land_page(req,res,next);
	}

	recipes.render_recipe_editor(req,res,next);
})

router.post('/recipes/edit', (req,res,next)=>{

	if(!req.session || !req.session.user_id){
		return res.status(401).end();
	}

	recipes.post_recipe(req,res,next);
});

router.get('/recipes/view', (req,res,next)=>{

	if(!req.session || !req.session.user_id){
		return index.render_land_page(req,res,next);
	}

	console.log(req.body);
	recipes.render_recipe(req,res,next);
})

module.exports = router;