require('dotenv').config({
	path: 'variables.env',
});
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// GraphQL express middleware
const { ApolloServer } = require('apollo-server-express');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');

const PORT = process.env.PORT || 5050;

const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		settings: {
			// 'editor.theme': 'light',
		},
	},
	context: ({ req }) => ({
		Recipe,
		User,
		currentUser: req.currentUser,
	}),
});

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };
app.use(cors('*'));

// Set up JWT auth middleware
app.use(async (req, res, next) => {
	const token = req.headers['authorization'];

	if (token && token !== 'null') {
		try {
			const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
			req.currentUser = currentUser;
		} catch (err) {}
	}
	return next();
});

server.applyMiddleware({ app });

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose
	.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true }
	)
	.then(() => console.info(`Connected to MongoDB`))
	.catch(err => console.error(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.info(`🚀 Server ready at port ${PORT}`));
