const Lang = imports.lang;
const DEFAULT_LEVEL = 250;

var Level = new Lang.Class({
    Name: 'Level',
    _init: function(name, prefix, weight) {
        this.name = name;
        this.prefix = prefix;
        this.weight = weight;
    }
});

var Logger = new Lang.Class({
    Name: 'Logger',

    _init: function(prefix, level, addNewLine) {
        if (level === undefined) {
            level = DEFAULT_LEVEL;
        }
        this.setPrefix(prefix);
        this._level = level;
        this._levels = {};
        if (addNewLine === false) {
            this._addNewLine = false;
        }
        else {
            this._addNewLine = true;
        }
    },

    setAddNewLine: function(enabled) {
        if (enabled === true || enabled === false) {
            this._addNewLine = enabled;
        }
    },

    setPrefix: function(prefix) {
        if (prefix === undefined || prefix === null || prefix.length === 0) {
            this._prefix = '';
            return;
        }
        this._prefix = prefix + ' ';
    },

    setLevel: function(level) {
        this._level = level;
    },

    log: function(message, level) {
        if (level >= this._level) {
            this._log(this._prefix + message + ((this._addNewLine === true)?'\r\n':''));
        }
    },

    addLevel: function(name, prefix, weight) {
        this._levels[weight] = new Level(name, prefix, weight);
        this[name] = Lang.bind(this, function(message) {
            this.log(prefix + ' ' + message, weight);
        });
    },

    getLevels: function() {
        return this._levels;
    },

    _log: function(message) {
        if (typeof log === 'function') {
            log(message);
            return;
        }
        if (typeof global.log === 'function') {
            global.log(message);
            return;
        }
    },
});

/* vi: set expandtab tabstop=4 shiftwidth=4: */
