const crud = require('../../utils/crud');
const mongoCrud = require('../../utils/mongo-crud');
const Parking = require('../../models/v1/parking');
const Log = require('../../models/v1/log');

const errors = require('../../controllers/errors');

let select;
let populate = '';
let populateParams = '';

exports.list = function (req, res) {
  crud.list(res, Parking, select, populate, populateParams);
};

exports.one = function (req, res) {
  crud.oneById(req, res, Parking, select, populate, populateParams);
};

exports.create = function (req, res) {
  crud.create(req, res, Parking);
};

exports.update = async function (req, res) {
  try {
    let obj = await mongoCrud.updateOne(
      Parking,
      {
        _id: req.params.id,
      },
      req.body,
    );
    let result = await mongoCrud.save(obj);
    return errors.ans_ok(result, res);
  } catch (error) {
    return errors.ans_err(error.message, res);
  }
};

exports.current = async function (req, res) {
  try {
    if (req.body.current || req.body.current === 0) {
      let obj = await mongoCrud.updateOne(
        Parking,
        {
          _id: req.params.id,
        },
        { current: req.body.current },
      );
      let result = await mongoCrud.save(obj);

      const log = new Log({
        parking: result._id,
        capacity: result.capacity,
        current: result.current,
      });

      if (req.files && req.files.length) {
        log.image = req.files[0].filename;
      }

      await log.save();

      return errors.ans_ok(result, res);
    }
    return errors.ans_err('Empty body', res);
  } catch (error) {
    return errors.ans_err(error.message, res);
  }
};

exports.delete = function (req, res) {
  crud.deleteOneById(req, res, Parking);
};
