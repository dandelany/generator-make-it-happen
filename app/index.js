var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var asciify = require('asciify');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
    },
    askFor: function() {
        this.pkg = require('../package.json');
        var done = this.async();
        this.log(yosay("Heyo! Let's make some code happen."));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: "What shall we call the project?",
            default: this.appname
        }, {
            type: 'input',
            name: 'description',
            message: "Alright, give me the elevator pitch.",
            default: "A project that does stuff."
        }, {
            type: 'input',
            name: 'authorName',
            message: "Cool. And your name is?",
            default: "Anonymous"
        }, {
            type: 'input',
            name: 'authorEmail',
            message: "Got an e-mail address?",
            default: "you@you.com"
        }, {
            type: 'input',
            name: 'devPort',
            message: "Which port would you like to serve the dev build from?",
            default: '4000'
        }, {
            type: 'input',
            name: 'repoUrl',
            message: "If the project has a remote Git repo, what is its URL? (leave blank if not)",
            default: ''
        }, {
            type: 'checkbox',
            name: 'features',
            message: "Okey-doke. What else would you like?",
            choices: [{
                name: 'jQuery',
                value: 'includeJQuery',
                checked: true
            }, {
                name: 'Material Design color palette',
                value: 'includeColors',
                checked: true
            }, {
                name: 'Ionicons icon font',
                value: 'includeIonicons',
                checked: true
            }, {
                name: 'React + JSX support',
                value: 'includeReact',
                checked: false
            }, {
                name: 'Bacon.js functional reactive programming library',
                value: 'includeBacon',
                checked: false
            }, {
                name: 'D3.js (Data Driven Documents)',
                value: 'includeD3',
                checked: false
            }/*, {
                name: 'JSHint Javascript linter',
                value: 'includeJSHint',
                checked: false
            }*/]
        }];

        this.prompt(prompts, function(answers) {
            this.appname = answers.appName;
            this.appName = this.appname;
            this.appDescription = answers.description;
            this.authorName = answers.authorName;
            this.authorEmail = answers.authorEmail;
            this.devPort = answers.devPort;
            this.repoUrl = answers.repoUrl;

            var features = answers.features;
            var hasFeature = function(f) { return features && features.indexOf(f) >= 0; };
            this.includeJQuery = hasFeature('includeJQuery');
            this.includeBacon = hasFeature('includeBacon');
            this.includeD3 = hasFeature('includeD3');
            this.includeColors = hasFeature('includeColors');
            this.includeIonicons = hasFeature('includeIonicons');
            this.includeReact = hasFeature('includeReact');
            this.includeJSHint = hasFeature('includeJSHint');
            done();
        }.bind(this));
    },
    showBanner: function() {
        var done = this.async();
        this.log(asciify("It's happening!", {font:'standard'}, function(e,t) {
            this.log(chalk.blue(t));
            done();
        }.bind(this)));
    },
    writing: function() {
        // copy root-level files
        this.template('_package.json', 'package.json');
        this.template('Gruntfile.js', 'Gruntfile.js');
//        this.template('gitignore', '.gitignore');
//        this.template('gitattributes', '.gitattributes');
        this.template('README.md', 'README.md');

        // copy src directory and create placeholder directories
        this.directory('src');
        this.mkdir('src/styles/lib');
        this.mkdir('src/fonts');

        // create build directory
        this.mkdir('build');
        this.mkdir('build/dev');
        this.mkdir('build/dist');

        // remaining are optional parts, do these conditionally based on required features
        // copy color palette
        var copyFromOptional = function(path) { return this.copy('optional/' + path, path); }.bind(this);
        if(this.includeColors) { copyFromOptional('src/styles/lib/palette.less'); }
        if(this.includeReact) { copyFromOptional('src/scripts/react-example.jsx'); }
    },
    _fetchRemoteOld: function(user, repo, tag, cb, cbArgs) {
        // fetch a remote github repo and kill the process if it fails
        cbArgs = cbArgs || [];
        this.remote(user, repo, tag, function(err, remote) {
            if(err) {
                var errMsg = [err, "Error fetching", user + "'s", repo, tag, "from Github. Aborting :("].join(" ");
                this.log(chalk.bgRed(errMsg));
                process.exit(1);
            }
            this.log(chalk.green(["Fetched from Github:", user + "'s", repo, tag, "\n"].join(" ")));
            cb.apply(this, [err, remote]);
        }.bind(this), true);
    },
    _fetchRemote: function(options) {
        if(!options || !options.user || !options.repo || !options.tag) {
            this.log(chalk.bgRed("Error: Fetching a Github repo requires user, repo and tag parameters."));
            process.exit(1);
        }
        // fetch a remote github repo and kill the process if it fails
        this.remote(options.user, options.repo, options.tag, function(err, remote) {
            if(err) {
                this.log(chalk.bgRed([err, "Error fetching", options.user + "'s", options.repo,
                                      options.tag, "from Github. Aborting :("].join(" ")));
                process.exit(1);
            }
            this.log(chalk.green(["Fetched from Github:", options.user + "'s", options.repo,
                                  options.tag, "\n"].join(" ")));
            // call the provided callback with err, remote, and any other args provided
            if(options.cb) { options.cb.apply(this, [err, remote].concat(options.cbArgs || [])); }
            // and then call the "done" async function to show we're done with asynchronous method
            if(options.asyncDone) { options.asyncDone(); }
        }.bind(this), true);
    },
    
    fetchNormalize: function() {
        // get Normalize.css from its github repo and copy relevant file
        this._fetchRemote({
            user: 'necolas',
            repo: 'normalize.css',
            tag: '3.0.1',
            asyncDone: this.async(),
            cb: function(err, remote) {
                remote.copy('normalize.css', 'src/styles/lib/normalize.css');
            }
        })
    },
    fetchLessHat: function() {
        // get LESS Hat from its github repo and copy relevant file
        this._fetchRemote({
            user: 'madebysource',
            repo: 'lesshat',
            tag: 'v3.0.2',
            asyncDone: this.async(),
            cb: function(err, remote) {
                remote.copy('build/lesshat.less', 'src/styles/lib/lesshat.less');
            }
        });
    },
    fetchIonicons: function() {
        // get Ionicons from its github repo and copy relevant files (font files + *.less)
        if(this.includeIonicons) {
            this._fetchRemote({
                user: 'driftyco',
                repo: 'ionicons',
                tag: 'v1.5.2',
                asyncDone: this.async(),
                cb: function(err, remote) {
                    remote.directory('less', 'src/styles/lib/ionicons');
                    remote.directory('fonts', 'src/fonts');
                }
            });
        }
    },
    installing: function() {
        this.installDependencies();
    }
});
