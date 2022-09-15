const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '004da025aece445886054f1dbe8fdab5'
});

const handleApicall =(req,res) =>{
app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
  	res.json(data);
  })
  .catch(err => res.status(400).json('unable'))
}

const handleImage = (req, res, db) =>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err=> res.status(400).json('unanble smth'))
}

module.exports = {
	handleImage,
	handleApicall
};