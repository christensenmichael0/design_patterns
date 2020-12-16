const { fork } = require('child_process');

const forked = fork(__dirname + '/child.js');

forked.on('message', (msg) => {
    console.log('Message from child', msg);
});

forked.send({ hello: 'world' });
