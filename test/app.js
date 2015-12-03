'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-agendatransparencia:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          UserOrganization: 'ciudadanoi',
          Repo: 'a_transparencia',
          Title: 'Agenda Transparencia',
          Slogan: 'Slogan',
          ActionCall: 'Action call',
          AmountOfCards: 5,
          Twitter: 'ciudadanoi',
          Facebook: 'ciudadanointeligente'
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
});
