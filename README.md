# todo.txt gnome-shell extension

This extension enables you to manage your [todo.txt](http://todotxt.com/ "Todo.txt homepage") file from gnome-shell.

##Supported features
* Adding new tasks
* Marking tasks as completed
* Deleting tasks (optionally with confirmation dialog)
* Show tasks grouped by projects or contexts
* Auto-archive of done tasks to done.txt
* Tasks are sorted by priority
* Done but not archived tasks are shown in italic text and include "archive" button
* Editing tasks
* Changes in todo.txt file via other ways are reflected in the extension
* Tasks can be shown in a specific style, based on the priority
* URLs in tasks can be opened in the default browser by clicking on them

##Known issues/missing features
* Task priority is not shown (but is considered for sorting)
* There is no possibility to show archived tasks
* ...

##Screenshots
* Ungrouped mode
* Some tasks with projects and/or contexts
* One task with high priority
* One task with an URL, shown with default gnome theme color for URLs


![Ungrouped todo.txt screenshot](https://bytebucket.org/bartl/todo-txt-gnome-shell-extension/raw/master/images/basic.png "Todo.txt in ungrouped mode")

* Grouped by projects
* Ungrouped tasks not in a separate group
* Custom URL color
* Custom top bar display
* Different color and style based on task priority
* Projects label hidden
* Long tasks are truncated
* Buttons to change priority

![Grouped todo.txt screenshot](https://bytebucket.org/bartl/todo-txt-gnome-shell-extension/raw/master/images/advanced.png "Todo.txt with advanced settings")

Preferences:

![Preferences screenshot](https://bytebucket.org/bartl/todo-txt-gnome-shell-extension/raw/master/images/preferences.png "Todo.txt preferences")

##Installation
The preferred way is to use [the Gnome extensions web page](https://extensions.gnome.org/extension/570/todotxt/)

If you cannot use that site or want to use the latest code, you can follow the instructions below.

* Obtain the source code, either by cloning the repository or by downloading a tarball from [the Bitbucket page](https://bitbucket.org/bartl/todo-txt-gnome-shell-extension/downloads/)
* Extract, copy or move the code to the directory ~/.local/share/gnome-shell/extensions/todo.txt@bart.libert.gmail.com
*Note: only this directory name will work, so pay attention*
* Make sure the following dependencies are installed on your system:
    * glib-compile-schemas (In Debian, this is provided by the package libglib2.0-bin, check your distro's documentation for the correct package for your case)
    * python
    * The python modules mentioned in the file requirements.txt (If you use pip, you can do pip install -r requirements.txt). Note that additional requirements might be necessary for these. This depends on your system, so it's hard to provide a complete list (a web search engine like [google](https://encrypted.google.com) or [duckduckgo](https://duckduckgo.com) might help you if necessary), but some examples include:
        * For debian testing: libxml2-dev, libxslt-dev, zlib1g-dev
        * For Fedora 25: redhat-rpm-config
* Run "make install"
* Enable the extension with gnome-tweak-tool
* Configure the extension with gnome-shell-extension-preferences

##Contributing
If you want to contribute to the extension, you have several options:

* Use the extension and report bugs or requests for new features at the [issue tracker](https://bitbucket.org/bartl/todo-txt-gnome-shell-extension/issues?status=new&status=open)
* Contibute code by forking the repo at the [homepage](https://bitbucket.org/bartl/todo-txt-gnome-shell-extension) and
  issueing a pull request
* Translate the extension by going to [transifex](https://www.transifex.com/bart-libert/todotxt-gnome-shell-extension/)

##Credits
This extension uses [jsTodoTxt](https://github.com/jmhobbs/jsTodoTxt "jsTodoTxt homepage") by John Hobbs and [JavaScript
Expression Evaluator](https://github.com/silentmatt/js-expression-eval) by Matthew Crumley

Parts of this extension are based on:

* [Todo list](https://extensions.gnome.org/extension/162/todo-list/) by bsaleil
* [SettingsCenter](https://extensions.gnome.org/extension/341/settingscenter/) by Xes

Additional code was contributed by:
Nneko Branche
Larissa Reis

Translators:
gmg (Chinese)
Nuno Martins (Portuguese)
jonnius (German)
Maestroschan (French)


Interface mock-ups:
Stephen Michel

Thank you!

##Licence
This code is released under GPLv2+

# bookmark_gnome_app
