const connection = require('../database/connection')

module.exports = {

    async create (req, res) {
        const { image_name, url, key, dweller_id } = req.body

        const [image_id] = await connection('images').insert({
            image_name,
            url,
            key,
            dweller_id
        })

        return res.json(image_id);
    },

    async list (req, res) {
        const images = await connection('images').select('*')

        return res.json(images)
    },

    async delete (req, res) {
        const {id} = req.params

        const image = await connection('images')
            .where('id', id)
            .delete()

        return res.status(204).send()
    }

}