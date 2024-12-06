const newsRouter = require('./news');
const siteRouter = require('./site');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const adminRouter = require('./admin');
const TourRouter = require('./tour');
const orderManageRouter= require('./order')
function route(app) {
    app.use('/admin', adminRouter);
    app.use('/v1/auth', authRouter);
    app.use('/profile', profileRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    app.use('/tours', TourRouter);
    app.use('/order',orderManageRouter);

}

module.exports = route;
