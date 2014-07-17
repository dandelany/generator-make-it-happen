var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
    },
    askFor: function() {
        this._askForProjectInfo();
        this.pkg = require('../package.json')
    },
    _askForProjectInfo: function() {
        var done = this.async();
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
            type: 'checkbox',
            name: 'features',
            message: "Okey-doke. What else would you like?",
            choices: [{
                name: 'jQuery',
                value: 'includeJQuery',
                checked: true
            }, {
                name: 'Bacon.js functional reactive programming library',
                value: 'includeBacon',
                checked: false
            }/*, {
                name: 'D3.js (Data Driven Documents)',
                value: 'includeD3',
                checked: false
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

            var features = answers.features;
            var hasFeature = function(f) { return features && features.indexOf(f) >= 0; }
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
    writing: function() {
        var done = this.async();

        this.mkdir('src');
        this.mkdir('src/scripts');
        this.mkdir('src/styles');
        this.mkdir('src/styles/fonts');
        this.mkdir('build');
        this.mkdir('build/dev');
        this.mkdir('build/dist');

        this.template('_package.json', 'package.json');
        this.template('Gruntfile.js', 'Gruntfile.js');
        //this.template('gitignore', '.gitignore');
        //this.template('gitattributes', '.gitattributes');
        this.template('README.md', 'README.md');

//        this.directory('src/scripts');
//        this.directory('src/styles');
        this.directory('src');


        this.remote('driftyco', 'ionicons', 'v1.5.2', function(err, remote) {
            //remote.copy('fonts/ionicons.ttf', 'src/ionicons.ttf');
            remote.directory('fonts', 'src/styles/fonts');
            done();
        });

        //this.gruntfile.insertConfig("compass",  "{ watch: { watch: true } }")
    },
    installing: function() {
        //var done = this.async();
        //this.npmInstall(['lodash'], {saveDev: true}, done);
        //this.log(this.destinationRoot());
        //this.log(this.sourceRoot());
        this.installDependencies();
    }
});
