const crud = require('../../utils/crud');
const Log = require('../../models/v1/log');

let select;
let populate = '';
let populateParams = '';

exports.list = function (req, res) {
  const { page = 1, limit = 100, parking, dateFrom, dateTo } = req.query;
  let { sort } = req.query;
  const query = {};
  if (parking) {
    query.parking = parking;
  }
  if (sort) {
    const [field, order] = sort.split(':');
    if (field && order) {
      sort = { [field]: order === 'desc' ? -1 : 1 };
    } else {
      sort = {};
    }
  }
  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) {
      query.createdAt.$gte = new Date(+dateFrom);
    }
    if (dateTo) {
      query.createdAt.$lte = new Date(+dateTo);
    }
  }
  const skip = page && limit ? (+page - 1) * +limit : 0;
  crud.listQuery(
    res,
    Log,
    query,
    select,
    populate,
    populateParams,
    sort,
    skip,
    +limit,
  );
};

exports.one = function (req, res) {
  crud.oneById(req, res, Log, select, populate, populateParams);
};

exports.create = function (req, res) {
  crud.create(req, res, Log);
};

exports.update = function (req, res) {
  crud.updateOneById(req, res, Log);
};

exports.delete = function (req, res) {
  crud.deleteOneById(req, res, Log);
};
