const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const { Files, Configs } = requier("../database/index.js");

class Diffdatabase {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.join(process.cwd(), "/backup/database.sqlite"),
      define: {
        freezeTableName: true,
      },
      logging: false,
    });
    this.FilesBackup = sequelize.define("Files", {
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

    this.ConfigsBackup = sequelize.define("Configs", {
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
  }
  async init() {
    await this.sequelize.sync({ alter: true });
  }
  async diff() {
    await this.diffConfig();
  }
  // 对比更新 存储的设置内容
  async diffConfig() {
    const localConf = await Configs.findByPk(1);
    const backupConf = await this.ConfigsBackup.findByPk(1);
    if (localConf.dataValues.updatedAt == backupConf.dataValues.updatedAt) {
      return true;
    }
    if (localConf.dataValues.updatedAt > backupConf.dataValues.updatedAt) {
      // 更新 备份文件内的
      await this.ConfigsBackup.update(
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
  }
  async diffFiles() {
    const localFiles = await Files.findAndCountAll({
      where: {},
      attributes: ["id", "updatedAt"],
    });
    const backupFiles = await this.backupFiles.findAndCountAll({
        where: {},
        attributes: ["id", "updatedAt"],
    });
  }
}
