const connection = require('../database/connection')

module.exports = {

    async create (req, res) {
        const { name, building, ap, whatsapp, allowed_spaces } = req.body

        const [dweller_id] = await connection('dwellers').insert({
            name,
            building,
            ap,
            whatsapp            
        })

        const spaces = allowed_spaces.map((item) => {
            return{
                dweller_id,
                space_id: item.space
            }
        })

        await connection('dweller_space').insert(spaces)

        return res.json(dweller_id);
    },

    async list (req, res) {
        const dweller = await connection('dwellers').select('*')
        const dweller_space = await connection('dweller_space').select('*')

        return res.json({dweller, dweller_space})
    },

    async delete (req, res) {
        const {id} = req.params

        const dweller = await connection('dwellers')
            .where('id', id)
            .delete()

        return res.status(204).send()
    }

}