const bcyrpt = require("bcrypt");
const Joi = require("joi");
const { v4: uuid } = require("uuid");

const { sign } = require("../utils/jwt");
const Io = require("../utils/io");
const Users = new Io("./db/users.json");

const POST_USER = async (req, res) => {
  const { name, username, password } = req.body;
  const { image } = req.files;
  const users = await Users.read();
  const id = users[users.length - 1]?.id + 1 || 1;
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    image: Joi.required(),
  });

  const { error } = schema.validate({ name, username, password, image });
  if (error) return res.status(400).json({ message: error.message });

  const format = image.mimetype.split("/")[1];
  const uuidName = `${uuid()}.${format}`;
  const path = `${process.cwd()}/src/uploads/${uuidName}`;
  image.mv(path);

  const token = sign({ id });
  res.cookie("token", token);

  const hash = await bcyrpt.hash(password, 12);

  const newUser = {
    id,
    name,
    username,
    password: hash,
    path,
  };

  const all = users.length ? [...users, newUser] : [newUser];
  Users.write(all);
  res.status(200).json({ message: "User added" });
};

const GET_USER = async (_, res) => {
  const users = await Users.read();
  res.status(200).json(users);
};

module.exports = {
  POST_USER,
  GET_USER,
};
