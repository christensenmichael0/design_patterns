const request = require('request');
const aggregateData = require('./aggregate_data');

process.on('message', (msg) => {
    console.log('Message from parent:', msg);

    let url = 'http://tds.marine.rutgers.edu/erddap/tabledap/DOPPIO_REALTIME_MOD.json?obs_provenance,time,dJ_csVflxPioneer_outer1&time>=2020-09-19T00:00:00Z&time<2020-09-26T00:00:00Z';

    request(url, { json: true }, (error, resp, body) => {
        let statusCode = resp && resp.statusCode;

        if (error) resp.send(error).status(statusCode || 500);

        try {
            let processedData = aggregateData(body);
            process.send({ output: processedData });
        } catch (e) {
            console.log(e);
        }
    });
});

// let counter = 0;



// setInterval(() => {
//     process.send({ counter: counter++ });
// }, 1000);
