const recipes = require('../models/Recipe');
const mongoose = require('mongoose');

class Recipe_Presenter{

	get_recipe_list_json(req, res, next){

		const ingredients = req.body.ingredients.split(',');

		recipes.query_recipes(ingredients).catch(next).then((recipes)=>{

			console.log(recipes);
			res.status(200).json(recipes);
		});
	}

	render_recipe(req,res,next){

		const recipe_id = req.query.recipe_id;
		if(!recipe_id){
			res.status(400);
			return next(new Error('Recipe not specified'));
		}

		recipes.get_by_id(recipe_id).then((recipe)=>{

			res.render('recipe', Object.assign({
				title: recipe.recipe_title
			}, recipe));

		}).catch(next);
	}

	render_recipe_editor(req,res,next){

		const recipe_id = req.query.recipe_id;

		if(!recipe_id)
			return res.render('recipe_editor')

		recipes.get_by_id(recipe_id).then((recipe)=>{

			res.render('recipe_editor', Object.assign({
				title: recipe.recipe_title
			}, recipe));

		}).catch(next);
	}

	get_recipe_json(req,res,next){

		recipes.get_by_id(recipe_id).then((recipe)=>{

			res.json(recipe);

		}).catch(next);
	}

	post_recipe(req,res,next){

		const recipe = {
			recipe_name: req.body.recipe_name,
			cotributor: req.body.contributor,
			category: req.body.category,
			description: req.body.description,
			spices: req.body.spices,
			source: req.body.source,
			rating: req.body.rating,
			ingredients: req.body.ingredients,
			directions: req.body.directions
		}

		recipes.insert_recipes(recipe).then((recipe)=>{

			res.redirect(`/recipe?recipe_id=${recipe._id}`);

		}).catch(next);

	}
}

module.exports = new Recipe_Presenter();