var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
    },
    askFor: function() {
        this._askForProjectInfo();

//        this.pkg = require('../package.json')
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
            message: 'Got an e-mail address?',
            default: "you@you.com"
        }];

        this.prompt(prompts, function(answers) {
            this.appname = answers.appName;
            this.appDescription = answers.description;
            this.authorName = answers.authorName;
            this.authorEmail = answers.authorEmail;
            done();
        }.bind(this));
    },
    installing: function() {
        //var done = this.async();
        //this.npmInstall(['lodash'], {saveDev: true}, done);
        this.log(this.destinationRoot());
        this.installDependencies();
//        this.log(this.sourceRoot());

        //this.dest.copy('testing.js', 'testing.js')
    },
    writing: function() {
        this.log('wtf')
        this.template('_package.json', 'package.json');
        //this.gruntfile.insertConfig("compass",  "{ watch: { watch: true } }")
    }
});
