// Получить все сущности
// select - поля для получения из БД
exports.findAll = function (
  entity,
  select,
  populate = '',
  populateParams = '',
  sort = {},
  skip,
  limit,
) {
  return new Promise((resolve, reject) => {
    const query = entity
      .find()
      .select(select)
      .populate(populate, populateParams);
    if (sort) {
      query.sort(sort);
    }
    if (skip) {
      query.skip(skip);
    }
    if (limit) {
      query.limit(limit);
    }
    query.exec(function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

// Получить сущность
// query - запрос на поиск
// select - поля для получения из БД
exports.findAllQuery = function (
  entity,
  query,
  select,
  populate = '',
  populateParams = '',
  sort = {},
  skip,
  limit,
) {
  return new Promise((resolve, reject) => {
    const mquery = entity
      .find(query)
      .select(select)
      .populate(populate, populateParams);
    if (sort) {
      mquery.sort(sort);
    }
    if (skip) {
      mquery.skip(skip);
    }
    if (limit) {
      mquery.limit(limit);
    }
    mquery.exec(function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.count = function (
  entity,
  query,
  select,
  populate = '',
  populateParams = '',
) {
  return new Promise((resolve, reject) => {
    entity.countDocuments(query).exec(function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

// Получить сущность по id
// select - поля для получения из БД
exports.findById = function (
  entity,
  id,
  select,
  populate = '',
  populateParams = '',
) {
  return new Promise((resolve, reject) => {
    entity
      .findById(id)
      .select(select)
      .populate(populate, populateParams)
      .exec(function (err, result) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
  });
};

// Получить сущность
// query - запрос на поиск
// select - поля для получения из БД
exports.findOne = function (
  entity,
  query,
  select,
  populate = '',
  populateParams = '',
) {
  return new Promise((resolve, reject) => {
    entity
      .findOne(query)
      .select(select)
      .populate(populate, populateParams)
      .exec(function (err, result) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
  });
};

// Создать сущность
exports.create = function (entity, data) {
  return new entity(data);
};

// Обновить сущность
// query - запрос на поиск
exports.updateOne = function (entity, query, data) {
  return new Promise((resolve, reject) => {
    entity
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .exec(function (err, result) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
  });
};

// Удалить сущность
// query - запрос на поиск
exports.deleteOne = function (entity, query) {
  return new Promise((resolve, reject) => {
    entity.deleteOne(query).exec(function (err, result) {
      if (err) {
        return reject(err);
      }

      // if (result.n == 0) {
      //     return reject({
      //         message: 'No data found'
      //     });
      // }

      return resolve(result);
    });
  });
};

// Удаление множества сущностей
exports.deleteQuery = function (entity, query) {
  return new Promise((resolve, reject) => {
    entity.deleteMany(query).exec(function (err, result) {
      if (err) {
        return reject(err);
      }

      // console.log(result);

      // if (result.n == 0) {
      //     return resolve({
      //         message: 'No data found'
      //     });
      // }

      return resolve(result);
    });
  });
};

// Сохранить сущность
exports.save = function (entity, populate = '', populateParams = '') {
  return new Promise((resolve, reject) => {
    entity.save(async function (err, result) {
      if (err) {
        return reject(err);
      }
      let res = await result.populate(populate, populateParams).execPopulate();

      return resolve(res);
    });
  });
};
