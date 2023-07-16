const { Pet } = require('../db/models')

module.exports = {

    async index(req, res) {
        let pets = await Pet.findAll();
        return res.json(pets);
      },

    async create(req, res){
        const {id_user, nama_pet,jenis_kelamin,tgl_lahir,berat,spesies,ras,warna,vaksin} = req.body
        let obj = {
            id_user,
            nama_pet,
            jenis_kelamin,
            tgl_lahir,
            berat,
            spesies,
            ras,
            warna,
            vaksin
        };
        try{
            let pet = await Pet.create(obj);
            return res.json({
                message : "data berhasil di simpan"
            });
        }catch(e){
            return res.json({
                message : e.errors[0].message
            });
        }
    }
}