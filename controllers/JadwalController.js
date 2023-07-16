const { Jadwal } = require('../db/models/jadwal');
module.exports = {
  async index(req, res) {
    let jadwals = await Jadwal.findAll();
    return res.json(jadwals);
  },
    async create(req, res) {
        const { id_user, tanggal, waktu, antrian, nama_pet,kondisi_pet } = req.body;
        let obj = {
          id_user,
          tanggal,
          waktu,
          antrian,
          nama_pet,
          kondisi_pet
        };
        try {
          let jadwal = await Jadwal.create(obj);
          return res.json({
            message: `user ${jadwal.nama_pet} berhasil di buat`,
          });
        } catch (e) {
          return res.json({ message: e.errors[0].message });
        }
      },
}
