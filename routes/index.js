module.exports = app => {
    app.use('/', require('./base.routes'))
    app.use('/lugares', require('./places.routes'))
    app.use('/mapas', require('./maps.routes'))
    app.use('/api', require('./api.routes'))
}

