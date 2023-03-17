const Io = require("../utils/io");
const Users = new Io("./db/users.json");

const POST_LOGIN = async (req, res) => {
  const { username, password } = req.body;
  const users = await Users.read();

  const foundUser = users.find(
    (e) => e.username == username && e.password == password
  );

  if (!foundUser) {
    return res.status(400).json({ message: "Such user not found" });
  }

  return res.status(200).json({ user: foundUser });
};

module.exports = {
  POST_LOGIN,
};
