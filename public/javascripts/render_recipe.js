function render_recipe(recipe)
// language=HTML
{

	function render_section(title, body){
		return `<h4>${title}</h4><p>${body}</p>`;
	}

	function render_list(title, items){

		console.log(items);
		const list_items = ['<ul class="collection">'];
		for(let i = 0; i < items.length; i++){
			list_items.push(`<li class="collection-item">${items[i]}</li>`);
		}
		list_items.push('</ul>')
		return `<h4>${title}</h4><ul>${list_items.join('\n')}</ul>`;
	}

	function render_recipe_details(recipe){

		// language=HTML
		return (
			`<p>	
					By ${recipe.contributor}&#09|&#09
					Category: ${recipe.category}&#09|&#09
					Rating: ${recipe.rating}
			</p>`
		);
	}

	return (
		`<div id="recipes" class="row custom-container">
			<div class="container">
				<h3>${recipe.recipe_name}</h3>
				${render_recipe_details(recipe)}
				${render_section('Source', recipe.source)}
				${render_list('Spices', recipe.spices.split(/,|\./g))}
				${render_list('Ingredients', recipe.ingredients.split(/,|\./g))}
				${render_section('Instructions', recipe.directions)}
			</div>
		</div>`
	);
}