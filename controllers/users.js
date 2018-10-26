module.exports = (app)=> {
    app.get('/auth', (req, res) => {
        console.log('oh shit');
        res.send('OK.');
    });
};