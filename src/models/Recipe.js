const Recipe_Schema = require('../mongoose_schemas/Recipe');
const Mongo_Client = require('mongodb').MongoClient;
const DB_PATH = 'mongodb://localhost:27017/comp_2406_a4';

class Recipe{

	query_recipes(ingredients){

		//Match any of words in ingredients

		const regex = new RegExp(`\\b${ingredients.join('|')}\\b`);

		//Connect

		let db;
		return new Promise((resolve, reject) =>{

			Mongo_Client.connect(DB_PATH).then((db)=>{

				return db.collection('recipes');


			//Get collection

			}).then((recipes_collection)=>{

				return recipes_collection.find({$or: [

					{ingredients: regex},
					{spices: regex}
				]});

			//Process and return query result, close connection

			}).catch(reject).then((cursor)=>{

				const recipes = [];
				cursor.each((error, document)=>{

					if(error)
						return reject(error);

					if(document !== null)
						return recipes.push(document);

					if(db)
						db.close();

					resolve(recipes);
				})
			});
		});
	}

	insert_recipes(recipe){

		return new Promise((resolve, reject)=>{

			//Connect

			let db;
			Mongo_Client.connect(DB_PATH).catch(console.log).then(_db=>{

				db = _db;
				return db.collection('recipes');

			//Get collection

			}).then((recipes_collection)=>{

				return recipes_collection.insert(recipe);

			//Process and return insertion result, close connection

			}).catch(reject).then((result)=>{

				if(db)
					db.close();

				resolve(result);
			});
		});
	}

	get_by_id(recipe_id){

		//Connect

		let db;
		return new Promise((resolve, reject) =>{

			Mongo_Client.connect(DB_PATH).then((db)=>{

				return db.collection('recipes');


			//Get collection

			}).then((recipes_collection)=>{

				return recipes_collection.findOne({_id: recipe_id});

			//Process and return query result, close connection

			}).catch(reject).then(resolve);
		});
	}
}

module.exports = new Recipe();