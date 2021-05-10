// Does Network activity
const jayson = require("jayson");

class Daemon {
    constructor(config) {
        this.config = config;
        this.create_server();
        this.reset_server(config.port);
        this.create_client();
        this.out_queue = [];
        this.in_queue = [];
    }

    createServer() {
        this.server = new jayson.server({
            process: function (args, callback) {
                let result = process(args);
                callback(result, console.log("success!"));
            }
        });
    }

    createClient() {
        this.client = null;
    }

    resetServer(port) {
        this.server.http().listen(3000);
    }
    // send to individual
    send(target, data) {

    }

    // broadcast to network
    broadcast(data) {

    }

    // listener 
    listen() {

    }

    // Process Output before sending
    processTransaction(data) {

    }

    processBlock(data) {

    }

    // Verify Input
    verifyTransaction(data) {

    }

    // Verify Block
    verifyBlock(data) {

    }
}