var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var { Strategy } = require('passport-http-bearer');
const axios = require('axios');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('jobgy', 'homestead', 'secret', {
    host: '127.0.0.1',
    port: 54320,
    dialect: 'postgres',
    protocol: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

passport.use(new Strategy((token, done) => {
    return done(null, { id: 2 }, { scope: 'all' });
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

// const User = require('./app/models/User');

router.get('/stations/all', (req, res) => {
	/* let a = await axios.get('https://booking.uz.gov.ua/train_search/station', {
		params: {
			term: req.query.term,
		},
	});

	let b = a.data.map(item => {
		return {
			id: item.value,
			label: item.title,
		};
	}) */

	let c = [
		{
			id: 2204450,
			label: 'Суми',
		},
		{
			id: 2204001,
			label: 'Харків',
		},
		{
			id: 2200001,
			label: 'Київ',
		},
		{
			id: 2218000,
			label: 'Львів',
		},
		{
			id: 2218400,
			label: 'Рівне',
		},
		{
			id: 2218500,
			label: 'Чернівці',
		},
		{
			id: 2210700,
			label: 'Дніпро',
		},
		{
			id: 2208001,
			label: 'Одеса',
		},
		{
			id: 2218200,
			label: 'Івано-Франківськ',
		},
		{
			id: 2218060,
			label: 'Луцьк',
		},
	];

	res.json(c);
});

app.use('/api/v1', router);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port);
