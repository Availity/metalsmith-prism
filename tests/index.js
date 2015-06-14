/* global describe, it */

var chai = require('chai');
var metalsmith = require('metalsmith');
var metalsmithPrism = require('../lib');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var expect = chai.expect;
var fixture = path.resolve.bind(path, __dirname, 'fixtures');

describe('metalsmith-prism', function() {

  it('should highlight code blocks in html files', function(done) {

    var metal = metalsmith(fixture('markup'));

    metal
      .use(metalsmithPrism())
      .build(function(err){

        if(err) {
          return done(err);
        }

        var buildContent = fs.readFileSync(fixture('markup/build/markup.html'), "utf8");
        var expectedContent  = fs.readFileSync(fixture('markup/expected/markup.html'), "utf8");

        expect(buildContent).to.be.eql(expectedContent);

        done();
      });
  });

  it ('should highlight multiple languages', function(done) {

    var metal = metalsmith(fixture('multiple'));

    metal
      .use(metalsmithPrism())
      .build(function(err){

        if(err) {
          return done(err);
        }

        var buildContent = fs.readFileSync(fixture('multiple/build/multiple.html'), "utf8");
        var expectedContent  = fs.readFileSync(fixture('multiple/expected/multiple.html'), "utf8");

        expect(buildContent).to.be.eql(expectedContent);

        done();
      });

  });
});
