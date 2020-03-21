const BoxPointer = imports.ui.boxpointer;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;

var ScrollablePopupMenu = new Lang.Class({
    Name: 'ScrollablePopupMenu',
    Extends: PopupMenu.PopupMenu,
    _topSection: null,
    _bottomSection: null,
    _validSections: ['top', 'bottom'],

    _init: function(sourceActor, arrowAlignment, arrowSide, logger) {
        PopupMenu.PopupMenuBase.prototype._init.call(this, sourceActor, 'popup-menu-content');
        this._logger = logger;
        this._arrowAlignment = arrowAlignment;
        this._arrowSide = arrowSide;

        this._boxPointer = new BoxPointer.BoxPointer(arrowSide, {
            x_fill: true,
            y_fill: true,
            x_align: St.Align.START
        });
        this.actor = this._boxPointer.actor;

        this.scroller = new St.ScrollView({
            hscrollbar_policy: Gtk.PolicyType.NEVER,
            vscrollbar_policy: Gtk.PolicyType.AUTOMATIC
        });

        this.boxlayout = new St.BoxLayout({
            vertical: true
        });

        this.scroller.add_actor(this.box);
        this.boxlayout.add(this.scroller);

        this.actor._delegate = this;
        this.actor.style_class = 'popup-menu-boxpointer';

        this._boxPointer.bin.set_child(this.boxlayout);
        this.actor.add_style_class_name('popup-menu');

        this.box.set_style('padding-bottom: 0');
        global.focus_manager.add_group(this.actor);
        this.actor.reactive = true;

        this._openedSubMenu = null;
        this._childMenus = [];
    },

    _isValidSection: function(name) {
        if (this._validSections.indexOf(name) != -1) {
            return true;
        }
        return false;
    },

    _getSectionName: function(name) {
        return '_' + this._getStyleName(name);
    },

    _getStyleName: function(name) {
        if (!this._isValidSection(name)) {
            this._logger.error('Tried to get invalid style name: ' + name);
            return 'invalidSection';
        }
        return name + 'Section';
    },

    _addSectionBefore: function(name, sibling) {
        this._addSection(name, true, sibling);
    },

    _addSectionAfter: function(name, sibling) {
        this._addSection(name, false, sibling);
    },

    _addSection: function(name, before, sibling) {
        if (!this._isValidSection(name)) {
            this._logger.error('Tried to add invalid section: ' + name);
            return;
        }
        let sectionName = this._getSectionName(name);
        this[sectionName] = new St.BoxLayout({
            vertical: true,
            style_class: this._getStyleName(name)
        });
        if (before === true) {
            this.boxlayout.insert_child_below(this[sectionName], sibling);
        }
        else {
            this.boxlayout.insert_child_above(this[sectionName], sibling);
        }
    },

    clearSection: function(name) {
        if (!this._isValidSection(name)) {
            this._logger.error('Tried to clear invalid section: ' + name);
            return;
        }
        let sectionName = this._getSectionName(name);
        if (this[sectionName] !== null) {
            this[sectionName].destroy();
            this[sectionName] = null;
        }
    },

    _sectionHasVisibleChildren: function(name) {
        if (!this._isValidSection(name)) {
            this._logger.error('Tried to get visibility for invalid section: ' + name);
            return false;
        }
        if (this[this._getSectionName(name)] === null) {
            return false;
        }
        return this[this._getSectionName(name)].get_children().some(function(child) {
            return child.visible;
        });
    },

    isEmpty: function() {
        let bottomHasVisibleChildren = this._sectionHasVisibleChildren('bottom');
        let topHasVisibleChildren = this._sectionHasVisibleChildren('top');
        return !bottomHasVisibleChildren && !topHasVisibleChildren &&
            PopupMenu.PopupMenuBase.prototype.isEmpty.call(this);
    },

    _addSectionDelimiter: function(name) {
        if (!this._isValidSection(name)) {
            this._logger.error('Tried to add delimiter to invalid section ' + name);
            return;
        }
        this[this._getSectionName(name)].add((new PopupMenu.PopupSeparatorMenuItem()).actor);
    },

    addToSection: function(section, actor) {
        if (!this._isValidSection(section)) {
            this._logger.error('Tried to add actor to invalid section ' + section);
            return;
        }
        if (this[this._getSectionName(section)] === null) {
            if (section == 'bottom') {
                this._addSectionAfter('bottom', this.scroller);
            }
            else if (section == 'top') {
                this._addSectionBefore('top', this.scroller);
            }
        }
        if (!this._sectionHasVisibleChildren(section)) {
            this._addSectionDelimiter(section);
        }
        if (section == 'bottom') {
            this._bottomSection.add(actor);
            return;
        }
        if (section == 'top') {
            let lastChild = this._topSection.get_last_child();
            this._topSection.insert_child_below(actor, lastChild);
            return;
        }
    },


    _getHeight: function(preferred, parent_before, parent_after) {
        if ((preferred < parent_after) && (parent_before != parent_after)) {
            this._logger.debug('Using preferred height ' + preferred);
            return preferred;
        }
        let diff = parent_after - parent_before;
        let third = Math.floor(parent_after / 3);
        if (diff > 0) {
            if (third > diff) {
                this._logger.debug('Using third of parent instead of diff ' + third);
                return third;
            }
            this._logger.debug('Using parent diff ' + diff);
            return diff;
        }
        if (preferred < third) {
            this._logger.debug('Using preferred height ' + preferred + ' because it is smaller than third');
            return preferred;
        }
        this._logger.debug('Using third of parent ' + third);
        return third;
    },

    itemActivated: function(animate) {},

    addMenuItem: function(menuItem, position) {
        this.parent(menuItem, position);
        if (menuItem instanceof PopupMenu.PopupSubMenuMenuItem) {
            let menu = menuItem.menu;
            menu.connect('open-state-changed', Lang.bind(this, function(item, open) {
                if (open === true) {
                    let parent_preferred_height_before =
                        menu._parent.actor.get_preferred_height(-1)[1];
                    menu.actor.show();
                    let parent_preferred_height = menu._parent.actor.get_preferred_height(-1)[1];
                    menu.actor.hide();
                    let preferred_height = menu.actor.get_preferred_height(-1)[1];

                    menu.actor.set_height(this._getHeight(preferred_height,
                        parent_preferred_height_before, parent_preferred_height));
                }
            }));
            menu.itemActivated = function(animate) {};
        }
    }
});

/* vi: set expandtab tabstop=4 shiftwidth=4: */
