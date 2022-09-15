
const handleSignin =  (db, bcrypt) => (req, res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const correct = bcrypt.compareSync(req.body.password, data[0].hash);
			if(correct) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'));
			} else { res.status(400).json('wrong stuff')}

		})
	.catch(err => res.json('wrong'))

};

module.exports = {
	handleSignin
};