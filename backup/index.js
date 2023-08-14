const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const { Files, Configs } = require("../database/index.js");
const Op = Sequelize.Op;

let sequelize, FilesBackup, ConfigsBackup;

const init = async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(process.cwd(), "/backup/database.sqlite"),
    define: {
      freezeTableName: true,
    },
    logging: false,
  });
  FilesBackup = sequelize.define("Files", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    pid: {
      type: DataTypes.INTEGER(11),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    locked: {
      type: DataTypes.BOOLEAN,
    },
  });

  ConfigsBackup = sequelize.define("Configs", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    backupAt: {
      type: DataTypes.TIME,
    },
    passwd: {
      type: DataTypes.STRING,
    },
    bd_access_token: {
      type: DataTypes.TEXT,
    },
    bd_refresh_token: {
      type: DataTypes.TEXT,
    },
  });
  await sequelize.sync({ alter: true });
  await diffConfig();
};

const diffConfig = async () => {
  const localConf = await Configs.findByPk(1);
  const backupConf = await ConfigsBackup.findByPk(1);
  if (localConf.dataValues.updatedAt == backupConf.dataValues.updatedAt) {
    return true;
  }
  if (localConf.dataValues.updatedAt > backupConf.dataValues.updatedAt) {
    // 更新 备份文件内的
    await ConfigsBackup.update(
      {
        passwd: localConf.dataValues.passwd,
        bd_access_token: localConf.dataValues.bd_access_token,
        bd_refresh_token: localConf.dataValues.bd_refresh_token,
        backupAt: localConf.dataValues.backupAt,
      },
      { where: { id: 1 } }
    );
  } else {
    // 更新 本地文件的
    await Configs.update(
      {
        passwd: backupConf.dataValues.passwd,
        bd_access_token: backupConf.dataValues.bd_access_token,
        bd_refresh_token: backupConf.dataValues.bd_refresh_token,
        backupAt: backupConf.dataValues.backupAt,
      },
      { where: { id: 1 } }
    );
  }
};

const diffFiles = async () => {
  const localFiles = await Files.findAll({
    where: {},
    attributes: ["id", "updatedAt"],
  });
  const backupFiles = await FilesBackup.findAll({
    where: {},
    attributes: ["id", "updatedAt"],
  });

  const arr1 = localFiles.map((t) => ({ ...t.dataValues, next: "l" }));
  const arr2 = backupFiles.map((t) => ({ ...t.dataValues, next: "o" }));
  const arr3 = arr1.concat(arr2);
  var arr4 = arr3.reduce((p, c, i, a) => {
    if (p[c.id]) {
      const pU = new Date(p[c.id].updatedAt).getTime(),
        cU = new Date(c.updatedAt).getTime();
      if (pU == cU) {
        p[c.id].next = "";
      }
      if (pU < cU) {
        p[c.id].next = c.next;
      }
    } else {
      p[c.id] = c;
    }
    return p;
  }, {});
  const arr = Object.values(arr4).filter((t) => t.next);
  return arr;
};

// 本地无 线上有 用户选择保留
const updateLocalfiles = async (ids) => {
  const backFiles = await FilesBackup.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
  const files = backFiles.map((t) => t.dataValues);
  await Files.bulkCreate(files, {
    updateOnDuplicate: [
      "pid",
      "title",
      "content",
      "locked",
      "createdAt",
      "updatedAt",
    ],
  });
};
// 本地有 线上无 更新线上文档数据
const updateOnlinefiles = async (ids) => {
  const localFiles = await Files.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
  const files = localFiles.map((t) => t.dataValues);
  // files.forEach(async file => {
  //   await (file)
  // });
  await FilesBackup.bulkCreate(files, {
    updateOnDuplicate: [
      "pid",
      "title",
      "content",
      "locked",
      "createdAt",
      "updatedAt",
    ],
  });
};

// 本地无 线上有 用户选择删除
const deleteOnlinefiles = async (ids) => {
  const result = await FilesBackup.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
  return result;
};

// 获取需要用户确认的文档详细

const userChooseFiles = async (ids) => {
  const files = await FilesBackup.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
  const rows = files.map((t) => t.dataValues);
  return rows;
};

const close = async () => {
  sequelize.close();
};

module.exports = {
  init,
  diffConfig,
  diffFiles,
  close,
  updateLocalfiles,
  updateOnlinefiles,
  deleteOnlinefiles,
  userChooseFiles,
};
