function ProductsDAO(connection) {
	this._connection = connection;
}

ProductsDAO.prototype.lista = function (callback) {
	this._connection.query('select * from produtos', callback);
};

ProductsDAO.prototype.salva = function (produto, callback) {
	this._connection.query('insert into produtos set ?', produto, callback);
};

module.exports = () => ProductsDAO;

