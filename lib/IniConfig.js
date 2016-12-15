/**
 * Ini config reader
 *
 * @author appr
 */

var _iniparser = require('iniparser'),
    _fs = require('fs')
;

module.exports = {

    /**
     * Read config
     *
     * @param configPath
     */
    readConfig: function(configPath) {
        var config = _iniparser.parseSync(configPath + '.ini'),
            localConfig = null
        ;

        if (_fs.existsSync(configPath + '.local.ini')) {
            localConfig = _iniparser.parseSync(configPath + '.local.ini');
            var i;
            Object.keys(localConfig).forEach(function(i) {
                if (!config[i]) {
                    config[i] = localConfig[i];
                } else {
                    if (typeof localConfig[i] == 'object') {
                        Object.keys(localConfig[i]).forEach(function(j) {
                            if (!config[i]) {
                                config[i] = {};
                            }
                            config[i][j] = localConfig[i][j];
                        });
                    }
                }
            });
        }

        return config;
    }
};
