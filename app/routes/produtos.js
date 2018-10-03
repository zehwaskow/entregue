module.exports = (app) => {
    app.get('/produtos', (req, resp) => {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.lista((erros, resultados) => {
            resp.render('produtos/lista', {lista: resultados});
        });
        connection.end();
    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos/salva', (req, res) => {
        var connection = app.infra.connectionFactory();
        var produto = req.body;
        var produtosDAO = new app.infra.produtosDAO(connection);
        produtosDAO.salva(produto,(erros,resultados)=>{
            res.render('produtos/lista',{lista:resultados});
        });

    });
};


