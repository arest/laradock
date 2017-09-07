#!/usr/bin/env node

import Server from 'socket.io';
import amqp from 'amqplib/callback_api';

export default function startServer() {

  	const io = new Server({secure: true, rejectUnauthorized: false}).attach(8090);

	amqp.connect('amqp://rabbitmq', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'socketio';

	    ch.assertQueue(q, {durable: true});

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function(msg) {
  			console.log("[x] Received %s", msg.content.toString());
  			io.emit('buynow', msg.content.toString() );
		}, {noAck: true});
	  });
	});
}

startServer();