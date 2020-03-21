const Lang = imports.lang;

const Gettext = imports.gettext;
const _ = Gettext.domain('todotxt').gettext;

var TodoTxtErrorTypes = {
    TODO_TXT_ERROR: 0,
    FILE_WRITE_PERMISSION_ERROR: 1,
    FILE_WRITE_ERROR: 2
};

var TodoTxtError = new Lang.Class({
    Name: 'TodoTxtError',
    type: TodoTxtErrorTypes.TODO_TXT_ERROR,
    message: '',

    _init: function(error, logFunction) {
        if (error === undefined) {
            error = '';
        }
        if (typeof logFunction == 'function') {
            logFunction(error);
        }
        this.message = error;
    }
});

var FileWritePermissionError = new Lang.Class({
    Name: 'FileWritePermissionError',
    type: TodoTxtErrorTypes.FILE_WRITE_PERMISSION_ERROR,
    Extends: TodoTxtError,

    _init: function(filename, logFunction) {
        this.parent(_('%(file) cannot be written. Please check its permissions').replace(
            '%(file)', filename), logFunction);
    }
});

var FileWriteError = new Lang.Class({
    Name: 'FileWriteError',
    type: TodoTxtErrorTypes.FILE_WRITE_ERROR,
    Extends: TodoTxtError,

    _init: function(error, filename, logFunction) {
        this.parent(_('An error occured while writing to %(file): %(error)').replace(
            '%(file)', filename).replace('%(error)', error), logFunction);
    }
});

var ConfigurationError = new Lang.Class({
    Name: 'ConfigurationError',
    Extends: TodoTxtError,
    name: 'ConfigurationError'
});

const UndefinedTokenError = new Lang.Class({
    Name: 'UndefinedTokenError',
    Extends: TodoTxtError,
    name: 'UndefinedTokenError'
});

var IoError = new Lang.Class({
    Name: 'IoError',
    Extends: TodoTxtError,
    name: 'IoError'
});

var JsonError = new Lang.Class({
    Name: 'JsonError',
    Extends: TodoTxtError,
    name: 'JsonError'
});

var SettingsTypeError = new Lang.Class({
    Name: 'SettingsTypeError',
    Extends: TodoTxtError,
    name: 'SettingsTypeError',
    _init: function(setting, expectedType, value) {
        this.parent('Expected value of type ' + expectedType + ', but got ' + typeof value +
            ' while setting ' + setting);
    }
});

/* vi: set expandtab tabstop=4 shiftwidth=4: */
