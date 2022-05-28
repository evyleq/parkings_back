module.exports.ans_ok = function (data, res) {
  return res.status(200).json({
    success: true,
    obj: data,
  });
};

module.exports.ans_created = function (data, res) {
  return res.status(201).json({
    success: true,
    obj: data,
  });
};

module.exports.ans_err = function (msg, res) {
  return res.status(500).json({
    success: false,
    title: 'An error occured',
    message: msg,
  });
};

module.exports.ans_not_auth = function (title, msg, res) {
  return res.status(401).json({
    success: false,
    title: title,
    message: msg,
  });
};

module.exports.ans_fobidden = function (res) {
  return res.status(403).json({
    success: false,
    title: 'Permission denied',
    message: '',
  });
};
