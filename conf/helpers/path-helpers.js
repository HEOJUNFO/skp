var path = require("path");

module.exports.register = function (Handlebars, options, params)  {
  Handlebars.registerHelper("path", function (a, b)  {
    return path.relative(a, b);
  });
};