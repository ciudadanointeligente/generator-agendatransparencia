'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var open = require("nodegit").Repository.open;

describe('generator-agendatransparencia:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          UserOrganization: 'ciudadanointeligente_TEST_TEST_TEST',
          Repo: 'a_transparencia',
          Title: 'Agenda Transparencia_TEST_TEST_TEST',
          SiteDescription: 'Promovemos la transparencia para fortalecer democracia_TEST_TEST_TEST',
          BaseUrl: 'agendatransparencia.org_TEST_TEST_TEST',
          IntroOne: 'Estas son las 9 propuestas_TEST_TEST_TEST',
          IntroTwo: 'para lograr nuestros objetivos_TEST_TEST_TEST',
          ActionCall: 'Ayúdanos a viralizarlos_TEST_TEST_TEST!',
          AmountOfCards: 5,
          Twitter: 'ciudadanoi_TEST_TEST_TEST',
          Hashtags: 'AgendaTransparencia_TEST_TEST_TEST',
          DefaultTwitt: 'Maecenas purus neque, laoreet in lectus eget. _TEST_TEST_TEST',
          Facebook: 'ciudadanointeligente_TEST_TEST_TEST',
          Email: 'prensa@ciudadanointeligente.org_TEST_TEST_TEST',
          GoogleAnalitycs: 'UA-12345678-9_TEST_TEST_TEST'
        }).on('end', function(){
          process.chdir(process.cwd() + '/..');
          done();
        });
  });
  it('creates files', function () {
    assert.file([
      'a_transparencia/_config.yml',
      'a_transparencia/bower.json',
      // 'a_transparencia/favicon.ico',
      // 'a_transparencia/meme.html',
      // 'a_transparencia/quienes-somos.md',

    ]);
  });
  it('crea 5 cards', function () {
    assert.file([
      'a_transparencia/_cards/card-1.md',
      'a_transparencia/_cards/card-2.md',
      'a_transparencia/_cards/card-3.md',
      'a_transparencia/_cards/card-4.md',
      'a_transparencia/_cards/card-5.md'
    ]);
  })
  it('hace un commit', function (done) {
    open('a_transparencia').then(function(repo){
      branch = repo.getBranchCommit('gh-pages', function (a, commit) {
        done()
      })
    });
  });
});
