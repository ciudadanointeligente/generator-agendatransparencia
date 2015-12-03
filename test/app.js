'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var open = require("nodegit").Repository.open;

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
