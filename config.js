const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
	port: 3000,
	url: "http://localhost",
	apiUrl: "http://localhost:3000/api"
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: 'time'
    }
};

const production = {
    app: {
	port: 4267,
	url : "https://time.thomasguesnon.net",
	apiUrl: "https://time.thomasguesnon.net/api"
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: 'time'
    }
};

const staging = {
    app: {
	port: 5378,
	url : "https://pisteurdetemps.thomasguesnon.net",
	apiUrl: "https://pisteurdetemps.thomasguesnon.net/api"
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: 'pdt'
    }
};

const config = {
    dev,
    production,
    staging
};

module.exports = config[env];
