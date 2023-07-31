const { Files } = require('./index');
const insert = async () => {
    for (let i =0;i<10;i++) {
        const result = await Files.create({ title: "sub-2-"+i,pid:2 });
    }
    for (let i =0;i<10;i++) {
        const result = await Files.create({ title: "sub-3-"+i,pid:3 });
    }
}

setTimeout(() => {
    insert();
}, 1000)