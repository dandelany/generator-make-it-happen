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
            message: "Got an e-mail address?",
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
    _askForFeatures: function() {
        var done = this.async();
        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: "Okey-doke. What else would you like?",
            choices: [{

            }]
        }]
    },
    installing: function() {
        //var done = this.async();
        //this.npmInstall(['lodash'], {saveDev: true}, done);
        this.log(this.destinationRoot());
        //this.installDependencies();
//        this.log(this.sourceRoot());

        //this.dest.copy('testing.js', 'testing.js')
    },
    writing: function() {
        this.log('wtf');
        var done = this.async();


//        //this.spawnCommand('git', ['clone', 'https://github.com/driftyco/ionicons.git'])
//        this.spawnCommand('git', ['clone', 'https://github.com/dandelany/shutdown2013.git'])
//            .on('exit', function() {
//                console.log('I cloned it!');
//                this.mkdir('super', function() {
//                    this.dest.copy('shutdown2013/clean.py', 'super/clean.py');
//                    console.log('it worked');
//                    done();
//                });
//
//            }.bind(this));

        this.mkdir('super');
        this.remote('driftyco', 'ionicons', 'v1.5.2', function(err, remote) {
//            remote.copy('clean.py', 'super/clean.py');
            remote.copy('fonts/ionicons.ttf', 'super/ionicons.ttf');
            remote.directory('fonts');
            done();
        });


//        this.template('_package.json', 'package.json');
//        this.template('Gruntfile.js', 'Gruntfile.js');
//        this.directory('src');
//
//        this.mkdir('build');
//        this.mkdir('build/dev');
//        this.mkdir('build/dist');

        //this.gruntfile.insertConfig("compass",  "{ watch: { watch: true } }")
    }
});
