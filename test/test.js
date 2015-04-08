"use strict";
var formValidator = require("../lib/validator");
var should = require("should");

describe('FormValidator', function() {
  var rules, data;
  before(function() {
    rules = {
      name: {
        optional: true,
        rules: [{
          rule: 'isLength',
          args: [3],
          msg: "Name should be 3 characters long"
        }]
      },
      email: {
        rules: [{
          rule: 'isEmail',
          msg: "Invalid email format"
        }],
        sanitize: [{
          action: "trim"
        }, {
          action: "normalizeEmail"
        }]
      },
      age: {

        rules: [{
          rule: 'isInt',
          msg: 'Age should be integer'
        }]
      }
    };
    data = {
      name: "name",
      email: "hello_world@gmail.com",
      age: 20
    }
  })
  describe('isValid()', function() {
    it('it should return true', function() {
      let validator = formValidator(rules, data);
      let result = validator.isValid()
      result.should.be.true
    })
  })
})