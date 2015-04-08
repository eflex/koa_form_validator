"use strict";
var validator = require("validator")

var FormValidator = module.exports = function(rules, data) {
  if (!(this instanceof FormValidator)) return new FormValidator(rules, data)

  this.data = data;
  this.rules = rules;
  this.err = {};
}

FormValidator.prototype.isValid = function() {

  for (let key in this.rules) {
    let field = this.rules[key]
    let optional = field.optional || false;
    let rules = field.rules || [];
    let sanitize = field.sanitize || [];
    let value = this.data[key] || ""

    if (optional && !value) continue;

    for (let r of rules) {
      let result = this.validateThis(r.rule, value, r.args)
      let msg = r.msg;
      if (!result) {
        this.err[key] = msg;
        break;
      }
    }
  }

  return Object.keys(this.err).length < 1
}

FormValidator.prototype.validateThis = function(rule, value, args) {
  let tmpArgs = args || []
  tmpArgs = Array.isArray(tmpArgs) ? tmpArgs : [tmpArgs]
  let newArgs = [value].concat(tmpArgs)
  let fn = validator[rule];
  if (fn) return fn.apply(null, newArgs)
  else throw new Error(`${rule} is not found.`)
}

FormValidator.prototype.errors = function() {
  return this.err;
}

FormValidator.prototype.cleanedData = function() {
  let cleanedData = this.data;

  for (let key in this.data) {
    let validation = this.rules[key]
    let sanitizer = validation.sanitize || [];
    if (validation) {
      for (let s of sanitizer) {
        let d = cleanedData[key]
        cleanedData[key] = this.validateThis(s.action, d, s.args)
      } // end for
    }
  }
  return cleanedData;
}