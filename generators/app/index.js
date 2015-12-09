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
      {type: 'input', name: 'SiteDescription', message: 'Descripción del sitio', default: 'Promovemos la transparencia para fortalecer democracia' },
      {type: 'input', name: 'BaseUrl', message: 'URL del sitio (sin http://)', default: 'agendatransparencia.org' },
      {type: 'input', name: 'IntroOne', message: 'Texto introducción primario', default: 'Estas son las 9 propuestas' },
      {type: 'input', name: 'IntroTwo', message: 'Texto introducción secundario', default: 'para lograr nuestros objetivos' },
      {type: 'input', name: 'ActionCall', message: 'Cual es el llamado a la acción?', default: 'Ayúdanos a viralizarlos!' },
      {type: 'input', name: 'AmountOfCards', message: 'Cuantas tarjetas deberían ser?', default: 9 },
      {type: 'input', name: 'Twitter', message: 'Usuario en Twitter', default: 'ciudadanoi' },
      {type: 'input', name: 'Hashtags', message: 'Hashtags (separados por comas)', default: 'AgendaTransparencia' },
      {type: 'input', name: 'DefaultTwitt', message: 'Texto twitt', default: 'Maecenas purus neque, laoreet in lectus eget. ' },
      {type: 'input', name: 'Facebook', message: 'Usuario en Facebook', default: 'ciudadanointeligente' },
      {type: 'input', name: 'Email', message: 'Email de contacto', default: 'prensa@ciudadanointeligente.org' },
      {type: 'input', name: 'GoogleAnalitycs', message: 'Código Google Analytics', default: 'UA-12345678-9' }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  createConfig: function () {
    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath(this.props.Repo + '/_config.yml'),
      this.props
    );
  },
  createBowerJson: function (){
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath(this.props.Repo + '/bower.json'),
      this.props
    );
  },
  createCards: function () {
    for (var i = 1; i < this.props.AmountOfCards + 1; i++) {
      var context = this.props;
      context.id = i;
      this.fs.copyTpl(
        this.templatePath('_cards/card.md'),
        this.destinationPath(this.props.Repo + '/_cards/card-' + i + '.md'),
        context
      );
    }
  },
  copyTemplate: function () {
    //_includes
    this.copy(this.templatePath('template/_includes/footer.html'), this.destinationPath(this.props.Repo + '/_includes/footer.html'));
    this.copy(this.templatePath('template/_includes/head-tw.html'), this.destinationPath(this.props.Repo + '/_includes/head-tw.html'));
    this.copy(this.templatePath('template/_includes/head.html'), this.destinationPath(this.props.Repo + '/_includes/head.html'));
    this.copy(this.templatePath('template/_includes/header.html'), this.destinationPath(this.props.Repo + '/_includes/header.html'));
    this.copy(this.templatePath('template/_includes/modal.html'), this.destinationPath(this.props.Repo + '/_includes/modal.html'));
    this.copy(this.templatePath('template/_includes/quienes-somos.md'), this.destinationPath(this.props.Repo + '/_includes/quienes-somos.md'));
    this.copy(this.templatePath('template/_includes/social.html'), this.destinationPath(this.props.Repo + '/_includes/social.html'));
    //_layouts
    this.copy(this.templatePath('template/_layouts/default.html'), this.destinationPath(this.props.Repo + '/_layouts/default.html'));
    this.copy(this.templatePath('template/_layouts/card-view.html'), this.destinationPath(this.props.Repo + '/_layouts/card-view.html'));
    //_sass
    this.copy(this.templatePath('template/_sass/_base.scss'), this.destinationPath(this.props.Repo + '/_sass/_base.scss'));
    this.copy(this.templatePath('template/_sass/_layout.scss'), this.destinationPath(this.props.Repo + '/_sass/_layout.scss'));
    this.copy(this.templatePath('template/_sass/_my-custom-settings.scss'), this.destinationPath(this.props.Repo + '/_sass/_my-custom-settings.scss'));
    this.copy(this.templatePath('template/_sass/_syntax-highlighting.scss'), this.destinationPath(this.props.Repo + '/_sass/_syntax-highlighting.scss'));
    //css
    this.copy(this.templatePath('template/css/main.scss'), this.destinationPath(this.props.Repo + '/css/main.scss'));
    //js
    this.copy(this.templatePath('template/js/controller.js'), this.destinationPath(this.props.Repo + '/js/controller.js'));
    this.copy(this.templatePath('template/js/imagesloaded.pkgd.js'), this.destinationPath(this.props.Repo + '/js/imagesloaded.pkgd.js'));
    this.copy(this.templatePath('template/js/js.cookie.js'), this.destinationPath(this.props.Repo + '/js/js.cookie.js'));
    this.copy(this.templatePath('template/js/masonry.pkgd.min.js'), this.destinationPath(this.props.Repo + '/js/masonry.pkgd.min.js'));
    //
    this.copy(this.templatePath('template/index.html'), this.destinationPath(this.props.Repo + '/index.html'));
    this.copy(this.templatePath('template/quienes-somos.md'), this.destinationPath(this.props.Repo + '/quienes-somos.md'));
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
