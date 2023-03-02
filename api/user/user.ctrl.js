//function
const users = [
  { id: 1, name: 'jerry' },
  { id: 2, name: 'bat' },
  { id: 3, name: 'tony' },
];

const getUsers = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  req.query.offset = req.query.offset || 1;
  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(limit) || Number.isNaN(offset)) {
    return res.status(400).end();
  }
  // console.log(users.slice(offset, limit));
  res.json(users.slice(offset - 1, limit));
};

const getUser = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
};

const postUser = function (req, res) {
  const name = req.body.name;
  const eng = /^[a-zA-Z]*$/;
  if (!name || !eng.test(name)) return res.status(400).end();
  const overlapUser = users.filter((user) => user.name === name)[0];
  if (overlapUser) return res.status(409).end();
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

const putUser = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  const name = req.body.name;
  const overlapUser = users.filter((user) => user.name === name)[0];
  if (overlapUser) return res.status(409).end();
  const eng = /^[a-zA-Z]*$/;
  if (!name || !eng.test(name)) return res.status(400).end();

  user.name = name;
  res.status(201).json(user);
};

const deleteUser = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const deletedUsers = users.filter((user) => user.id !== id);
  return res.status(204).end();
};

module.exports = { getUsers, getUser, postUser, putUser, deleteUser };
