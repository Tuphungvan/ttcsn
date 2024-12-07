
const siteRouter = require('./site');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const adminRouter = require('./admin');


function route(app) {
    app.use('/admin', adminRouter);
    app.use('/v1/auth', authRouter);
    app.use('/profile', profileRouter);
    app.use('/', siteRouter);

}

module.exports = route;
