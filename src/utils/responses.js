class Response {
  success(res, payload) {
    return res.send({
      code: 200,
      message: "Ok",
      payload,
    });
  }

  unknownError(res, err) {
    return res.send({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

module.exports = Response;
