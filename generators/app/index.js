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
      {type: 'confirm', name: 'UserOrganization', message: 'Tu usuario u organización en github?', default: 'ciudadanointeligente' },
      {type: 'confirm', name: 'Repo', message: 'El repo', default: 'a_transparencia' },
      {type: 'confirm', name: 'Title', message: 'El título?', default: 'Agenda Transparencia' },
      {type: 'confirm', name: 'Slogan', message: 'El Slogan?', default: 'Todos los perritos se van al cielo' },
      {type: 'confirm', name: 'ActionCall', message: 'Cual es el llamado a la acción?', default: 'Ayudalos a llegar al cielo' },
      {type: 'confirm', name: 'AmountOfCards', message: 'Cuantas tarjetas deberían ser?', default: 9 },
      {type: 'confirm', name: 'Twitter', message: 'ciudadanoi', default: 'Twitter' },
      {type: 'confirm', name: 'Facebook', message: 'ciudadanointeligente', default: 'Facebook' }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },
  createConfig: function(){
    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath(this.props.Repo + '/_config.yml'),
      { title: this.props.Title }
    )
  },

  writing: function () {
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
    this.createConfig()
  },

  install: function () {
    this.installDependencies();
  },
  end: function () {
  }

});
