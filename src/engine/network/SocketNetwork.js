(function() {
    define(['engine/network/Network', 'lib/socket.io'], function(Network, io) {

        var SocketNetwork = function() {
            SocketNetwork.super.constructor.call(this);
        };

        SocketNetwork.extend(Network);


        SocketNetwork.prototype.connect = function(server) {
            this.socket = io.connect(server);
        };

        return SocketNetwork;
    });
})();