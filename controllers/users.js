module.exports = function(app){
    app.get('/auth', function(req, res) {
        console.log('oh shit');
        res.send(ok);
    });
};