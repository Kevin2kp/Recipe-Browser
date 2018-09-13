class Main_Presenter{

	render_homepage(req,res, next){

		res.render('main', {title: 'Search Recipes'});
	}

	render_land_page(req,res,next){

		res.render('land_page', {title: 'Home'});
	}
}

module.exports = new Main_Presenter();