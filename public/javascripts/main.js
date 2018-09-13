$(document).ready(function(){

	const 	recipe_search_form = $('#recipe_search'),
			recipe_area = $('#recipe_area');


	function render_results (results){

		recipe_area.html(
			results.map((recipe) =>{
				return render_recipe(recipe);
			}).join('\n')
		)
	}

	//Hook up event handlers

	recipe_search_form.submit(function (e){

		e.preventDefault();

		$.post($(this).attr('action'), $(this).serialize(), (res) =>{
			console.log(res);
			render_results(res);
		});
	})

});