const { Files } = require('./index');
const insert = async () => {
    const result = await Files.create({ title: "简介",});
}

setTimeout(() => {
    insert();
}, 1000)