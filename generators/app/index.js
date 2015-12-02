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
      {type: 'confirm', name: 'UserOrganization', message: '', default: 'UserOrganization' },
      {type: 'confirm', name: 'Repo', message: '', default: 'Repo' },
      {type: 'confirm', name: 'Title', message: '', default: 'Title' },
      {type: 'confirm', name: 'Slogan', message: '', default: 'Slogan' },
      {type: 'confirm', name: 'ActionCall', message: '', default: 'ActionCall' },
      {type: 'confirm', name: 'Twitter', message: '', default: 'Twitter' },
      {type: 'confirm', name: 'Facebook', message: '', default: 'Facebook' }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  },
  end: function () {
  }

});
