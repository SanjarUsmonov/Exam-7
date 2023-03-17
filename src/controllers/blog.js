const { v4: uuid } = require("uuid");
const Io = require("../utils/io");
const Blogs = new Io("./db/blog.json");
const Joi = require("joi");
const { sign } = require("../utils/jwt");

const BLOG = async (req, res) => {
  const { title, text } = req.body;
  const { image } = req.files;
  const blog = await Blogs.read();
  const id = blog[blog.length - 1]?.id + 1 || 1;
  const schema = Joi.object({
    image: Joi.required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
  });

  const { error } = schema.validate({ image, title, text });
  if (error) return res.status(400).json({ message: error.message });

  const format = image.mimetype.split("/")[1];
  const uuidName = `${uuid()}.${format}`;
  const path = `${process.cwd()}/src/uploads/${uuidName}`;
  image.mv(path);

  const token = sign({ id });
  res.cookie("token", token);

  const newBlog = {
    id,
    title,
    text,
    path,
    view: 0,
  };

  const all = blog.length ? [...blog, newBlog] : [newBlog];
  Blogs.write(all);
  res.status(200).json({ message: "Blog created" });
};

const GET_BLOG = async (req, res) => {
  const blog = await Blogs.read();
  const { viewBlog } = req.query;

  if (viewBlog) {
    console.log(blog[2].view + 1);
  }

  res.status(200).json(blog);
};

module.exports = { BLOG, GET_BLOG };
