const moment = require('moment');
const _Get = require('lodash.get');
const _SetWith = require('lodash.setwith');

const FACTRANS = 39061.6583107871/1000;

const convert2Sv = input => {
    let val = Number(input);
    return isFinite(val) ? (FACTRANS * val) : 0;
};

/**
 *
 * @param data
 * @return {{}}
 */
const aggregateData = data => {

    let output = {};
    for (let row of data.table.rows){
        let [prov,datetime,value] = row;

        let currentVal, key = moment(datetime).utc().startOf('d').format();
        if (currentVal = _Get(output,`[${key}][${prov}]`)) {
            _SetWith(output,`[${key}][${prov}]`, currentVal += convert2Sv(value), Object);
        } else {
            _SetWith(output,`[${key}][${prov}]`, convert2Sv(value), Object);
        }
    }

    return output;
};

module.exports = aggregateData;
