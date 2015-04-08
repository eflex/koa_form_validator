"use strict";
var FormValidator = require("./lib/validator")

module.exports = function() {
  return function*(next) {
    this.validateForm = function(rules, data) {
      if (!rules) throw new Error("Rules is required")
      data = data || this.body;

      return new FormValidator(rules, data)
    }

    yield * next;
  }
}