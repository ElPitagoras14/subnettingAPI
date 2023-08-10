class Response {
  success(res, payload) {
    const code = 200;
    return res.status(code).send({
      code,
      message: "Ok",
      payload,
    });
  }

  unknownError(res, err) {
    const code = 500;
    return res.status(code).send({
      code,
      message: "Internal Server Error",
    });
  }

  badRequest(res, errMessage) {
    const code = 400;
    return res.status(code).send({
      code,
      message: errMessage,
    });
  }
}

module.exports = Response;
