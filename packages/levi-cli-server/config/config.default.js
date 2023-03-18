/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1678891971190_9829';

  // add your middleware config here
  config.middleware = [];

  // 暂时关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置mongodb
  config.mongoose = {
    url: 'mongodb+srv://sky124380729:HRdXVESyfnvpvgLW@cluster0.skfldei.mongodb.net/cli',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
