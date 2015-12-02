'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-agendatransparencia:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
            UserOrganization: 'ciudadanoi',
            Repo: 'a_transparencia',
            Title: 'Agenda Transparencia',
            Slogan: 'Slogan',
            ActionCall: 'Action call',
            Twitter: 'ciudadanoi',
            Facebook: 'ciudadanointeligente'
    }).withPrompts({someAnswer: true})
      .on('end', done);
  });

    it('creates files', function () {
        assert.file([
            'dummyfile.txt'
        ]);
    });
});
