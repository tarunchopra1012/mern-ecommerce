function modifyResponse(req, res, next) {
  const oldSend = res.send;
  res.send = function (data) {
    // Modify data here if needed
    console.log("Response being sent:", data);
    oldSend.call(this, data);
  };
  next();
}

module.exports = {
  modifyResponse,
};
