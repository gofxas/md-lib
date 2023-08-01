const { Files } = require("./index");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const findById = async (id) => {
  const result = await Files.findByPk(id);
  return result;
};

const findAndCountAll = async (query) => {
  const result = await Files.findAndCountAll({
    where: query,
    attributes: ["id", "pid", "title", "passwd", "createdAt", "updatedAt"],
  });
  result.rows = result.rows.map((t) => t.dataValues);
  return result;
};

const create = async (obj) => {
  const result = await Files.create(obj);
  return result;
};

const update = async (values, query) => {
  const result = await Files.update(values, {
    where: query,
  });
  return result;
};

const deleteDoc = async (ids = []) => {
  const result = await Files.destroy({
    where: {
      id: { [Op.in]: ids },
    },
  });
  return result;
};

module.exports = {
  findById,
  findAndCountAll,
  create,
  update,
  deleteDoc,
};
