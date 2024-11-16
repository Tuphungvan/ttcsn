const newsRouter = require('./news');
const siteRouter = require('./site');
const authRouter = require('./auth');

function route(app) {
    app.use('/v1/auth', authRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
