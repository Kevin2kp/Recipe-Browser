//NPM Modules

const xml2js = require('xml2js');
const path = require('path');
const fs = require('fs');

//Init

const parser = xml2js.Parser();
const recipes = require('../models/Recipe');
const file_path = path.resolve(__dirname, 'aLaCarteData_rev3.xml');

/*----------------------------------------------------------------------------------------------------------------------
 PARSE XML
----------------------------------------------------------------------------------------------------------------------*/


function parse_xml_recipes(){

	return new Promise((resolve, reject) => {

		fs.readFile(file_path, (read_error, file) =>{

			if(read_error)
				return reject(read_error);

			file  = file.toString('utf8')
				.replace(/\r?\n|\r|\s\s+|_xml/g, '');

			parser.parseString(file, (parse_error, result) =>{

				if(parse_error)
					return reject(parse_error);

				resolve(result.recipes.recipe);
			});
		});
	});
}

/*----------------------------------------------------------------------------------------------------------------------
 WRITE TO DB
----------------------------------------------------------------------------------------------------------------------*/


function write_entries_to_db(recipe_list){

	//Connect to DB

	for(let i = 0; i < recipe_list.length; i++){

		let recipe_info = recipe_list[i];

		const keys = Object.keys(recipe_info);
		for(let i = 0; i < keys.length; i++){

			recipe_info[keys[i]] = recipe_info[keys[i]][0];
		}

		console.log(recipe_info);

		recipes.insert_recipes(recipe_info).catch(console.log);
	}
}



parse_xml_recipes().catch(console.log).then((recipe_list)=>{

	return write_entries_to_db(recipe_list);
}).catch(console.log);


