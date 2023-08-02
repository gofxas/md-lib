const { Files, Configs } = require("./index");
const { Sequelize } = require("sequelize");
const sha1 = require("sha1");
const Op = Sequelize.Op;
const findById = async (id) => {
  const result = await Files.findByPk(id);
  return result;
};

const findAndCountAll = async (query) => {
  const result = await Files.findAndCountAll({
    where: query,
    attributes: ["id", "pid", "title", "locked", "createdAt", "updatedAt"],
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

const initConfig = async (config = {
  passwd: "",
  bd_access_token: "",
  bd_refresh_token: "",
}) => {
  const result = await Configs.create(config);
  return result;
};

const getConfig = async () => {
  const result = await Configs.findByPk(1);
  return result;
};

const updateConfig = async (option) => {
  const result = await Configs.update(option, {
    where: { id: 1 },
  });
  return result;
};

const setPassword = async (newpass, old) => {
  const result = await Configs.findByPk(1);
  const passwd = result?.dataValues.passwd;
  if (passwd) {
    if (passwd != sha1(old)) {
      return { status: false, msg: "旧密码错误！" };
    } else {
      await Configs.update(
        { passwd: sha1(newpass) },
        {
          where: { id: 1 },
        }
      );
      return { status: true, msg: "密码设置成功！" };
    }
  } else {
    await Configs.update(
      { passwd: sha1(newpass) },
      {
        where: { id: 1 },
      }
    );
    return { status: true, msg: "密码设置成功！" };
  }
};

const verifyPassword = async (pass) => {
  const result = await Configs.findByPk(1);
  const passwd = result?.dataValues.passwd;
  if (passwd != sha1(pass)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  findById,
  findAndCountAll,
  create,
  update,
  deleteDoc,
  getConfig,
  setPassword,
  verifyPassword,
  updateConfig,
  initConfig,
};
