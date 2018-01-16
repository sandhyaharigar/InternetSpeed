const Hapi = require("hapi");

var speedTest=require('./index');

const server = new Hapi.Server();

server.connection(
    { 
        host: "localhost", 
        port: 5000, 
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
            }
        }
    }
);

server.route({
    method: "GET",
    path: "/",
    handler: (request, response) => {
        response("Hello World");
    }
});

server.route({
    method: "GET",
    path: "/get-internet-speed",
    handler: (request, response) => {
    	//response("speed test");
			speedTest.visual({maxTime:10000,log:false,maxServers:2},function(err,data){
				response(data);
			});
			/*var test = speedTest({maxTime: 5000});

			test.on('data', data => {
			response(data)
			});

			test.on('error', err => {
			response(error)
			});*/
    }
});

server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});