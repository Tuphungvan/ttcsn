const newsRouter = require('./news');
const siteRouter = require('./site');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const adminRouter = require('./admin');
const SearchTourRouter = require('./tour/search');
const OrderRouter = require('./order');
function route(app) {
    app.use('/admin', adminRouter);
    app.use('/v1/auth', authRouter);
    app.use('/profile', profileRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    app.use('/tours/search', SearchTourRouter);
    app.use('/order',OrderRouter);
}

module.exports = route;
