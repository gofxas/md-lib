const { Files } = require('./index');
const insert = async () => {
    const result = await Files.create({ title: "2231" });
    console.log(result,'result');
}

setTimeout(() => {
    insert();
}, 1000)