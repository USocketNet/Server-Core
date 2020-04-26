// const test = require('./config/server.json');
// console.log(test['redis']['']);


const core = require('usn-core');
//console.log(asd.config.get('asd'));

core.request.verify({ wpid: '1', snid: 'p6uddd9yzLGwMmOlue0bffLJayknesi4I2KIYieuFq4', apid: '93c92d1222223a92de556ca2db02b6c4' }, (res)=> {
    //console.log(res);
});

console.log(core.utils.config.redis());

//console.log(usn.config.safe('production', false));