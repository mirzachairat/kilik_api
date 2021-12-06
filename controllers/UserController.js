const { User } = require("../db/models");
module.exports = {
  async index(req, res) {
    let users = await User.findAll();
    return res.json(users);
  },
  async create(req, res) {
    const { full_name, username, email, password } = req.body;
    let obj = {
      full_name,
      username,
      email,
      password,
    };
    try {
      let user = await User.create(obj);
      return res.json({
        message: `El usuario ${user.full_name} ha sido creado con éxito`,
      });
    } catch (e) {
      return res.json({ message: e.errors[0].message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { full_name, username, email, password } = req.body;
    let obj = {
      full_name,
      username,
      email,
      password,
    };
    try {
      await User.update(obj, { where: { id: id } });
      return res.json({
        message: `El usuario ${obj.full_name} ha sido actualizado con éxito`,
      });
    } catch (e) {
      return res.json({ message: e.errors[0].message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id: id } });
      return res.json({
        message: `El usuario ha sido eliminado con éxito`,
      });
    } catch (e) {
      return res.json({ message: e.errors[0].message });
    }
  },
};
