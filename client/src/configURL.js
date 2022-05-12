//port de backend

const _port = 4000
const _urlTasks = `http://localhost:${_port}/api/tasks`;
const _urlTurns = `http://localhost:${_port}/api/turns`;
const _urlOrders = `http://localhost:${_port}/api/orders`;
const _urlProviders = `http://localhost:${_port}/api/providers`;
const _urlUsers = `http://localhost:${_port}/user/new-user`;


module.exports = {
    _urlTasks: _urlTasks,
    _urlTurns: _urlTurns,
    _urlOrders: _urlOrders,
    _urlProviders: _urlProviders,
    _urlUsers: _urlUsers
}