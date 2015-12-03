'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('generator-agendatransparencia') + ' generator!'
    ));

    var prompts = [
      {type: 'input', name: 'UserOrganization', message: 'Tu usuario u organización en github?', default: 'ciudadanointeligente' },
      {type: 'input', name: 'Repo', message: 'El repo', default: 'a_transparencia' },
      {type: 'input', name: 'Title', message: 'El título?', default: 'Agenda Transparencia' },
      {type: 'input', name: 'Slogan', message: 'El Slogan?', default: 'Todos los perritos se van al cielo' },
      {type: 'input', name: 'ActionCall', message: 'Cual es el llamado a la acción?', default: 'Ayudalos a llegar al cielo' },
      {type: 'input', name: 'AmountOfCards', message: 'Cuantas tarjetas deberían ser?', default: 9 },
      {type: 'input', name: 'Twitter', message: 'Usuario en Twitter', default: 'ciudadanoi' },
      {type: 'input', name: 'Facebook', message: 'Usuario en Facebook', default: 'ciudadanointeligente' }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },
  createConfig: function () {
    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath(this.props.Repo + '/_config.yml'),
      { Title: this.props.Title }
    )
  },
  createBowerJson: function (){
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath(this.props.Repo + '/bower.json'),
      this.props
    )
  },

  writing: function () {
    this.createConfig();
    this.createBowerJson();
  },

  install: function () {
    var elementDir = process.cwd() + '/' + this.props.Repo;
    process.chdir(elementDir);
    this.installDependencies({
      npm: false
    });
  },
  end: function () {
    this.spawnCommand('git', ['init']);
    this.spawnCommand('git', ['checkout', '-b', 'gh-pages']);
    this.spawnCommand('git', ['remote', 'add', 'origin', this.repo]);
    this.spawnCommand('git', ['add', '--all']);
    this.spawnCommand('git', ['commit', '-m', '"initial commit from generator"']);
  }

});
