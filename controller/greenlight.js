'use strict';

var
  config = require('../config'),
  _ = require('lodash'),
  util = require('util'),
  Q = require('q'),
  fsJson = require('fs-json')(),
  changeCase = require('change-case'),
  async = require('async'),
  github = require('./github'),
  program = require('commander'),
  inquirer = require('inquirer'),
  colors = require('colors'),
  fs = require('fs'),
  url = require('url'),
  exec = require('child_process').exec,
  request = require('request'),
  rp = require('request-promise'),
  mkdirp = require('mkdirp'),
  rimraf = require('rimraf'),
  cancelOption = '[cancel]',
  env = require('./env'),
  rootDirectory = `${env.home()}/workspace`,
  projectEntriesPath = `${rootDirectory}/projects/projects.json`;

function getSessions(auth, complete) {
  const options = {
    method: 'GET',
    // TODO: Switch URI for live version
    // uri: 'https://greenlight.operationspark.org/api/os/install',
    uri: 'http://localhost:3000/api/os/install',
    qs: {
      id: github.grabLocalID(),
    },
    headers: {
      authorization: 'cb829798-b86e-496a-b311-6b37628e8116',
    },
  };
  rp(options)
    .then(res => complete(JSON.parse(res)))
    .catch(err => console.error('upload failed:', err));
}

module.exports.getSessions = getSessions;

function listEnrolledClasses(classes, complete) {
  complete(_.map(classes, 'name'));
}

module.exports.listEnrolledClasses = listEnrolledClasses;

function get() {
  const options = {
    method: 'GET',
    // TODO: Switch URI for live version
    // uri: 'https://greenlight.operationspark.org/api/os/install',
    uri: 'http://localhost:3000/api/os/install',
    qs: {
      id: github.grabLocalID(),
    },
    headers: {
      // TODO: swap authorization value for dynamic, user entered value
      authorization: 'cb829798-b86e-496a-b311-6b37628e8116',
    },
  };
  rp(options)
    .then(res => {
      console.log(res);
      const r = JSON.parse(res);
      var x = _.map(r, 'name');
      console.log(x);
    })
    .catch(err => console.error('upload failed:', err));
}

module.exports.get = get;

function submit(gistID) {
  const body = {
    id: github.grabLocalID(),
    requirementId: 'v4sZfMFaanbqaWeNS',
    sessionId: 'EJYqdYzGv8ZuprrC2',
    url: `https://api.github.com/gists/${gistID}`,
  };
  const options = {
    method: 'POST',
    // TODO: Switch URI for live version
    // uri: 'https://greenlight.operationspark.org/api/os/install',
    uri: 'http://localhost:3000/api/os/grade',
    body: JSON.stringify(body),
    headers: {
      // TODO: swap authorization value for dynamic, user entered value
      authorization: 'cb829798-b86e-496a-b311-6b37628e8116',
    },
  };
  rp(options)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error('upload failed:', err));
}

module.exports.submit = submit;
