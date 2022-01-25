import Search from "./search";

module.exports = function (request, response, next) {
  if (request.session.resultat) {
    response.locals.resultat = request.session.resultat;
    request.session.resultat = undefined;
  }

  request.resultat = function (type, content) {
    if (request.session.resultat === undefined) {
      request.session.resultat = {};
    }

    request.session.resultat[type] = content;
  };

  next();
};
