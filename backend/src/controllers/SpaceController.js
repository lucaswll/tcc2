const connection = require('../database/connection')

module.exports = {

    async create (req, res) {
        const { space_name } = req.body

        const [space_id] = await connection('spaces').insert({
            space_name
        })

        return res.json(space_id);
    },

    async list (req, res) {
        const space = await connection('spaces').select('*')

        return res.json(space)
    },

    async list_space_for_dweller (req, res){
        const { id } = req.params

        const items = await connection('dwellers')
            .join('dweller_space', 'dwellers.id', '=', 'dweller_space.dweller_id')
            .where('dweller_space.dweller_id', id)
            .select('space_id') //tenho os id's dos espaços que estão disponíveis para o dweller (id inserido no req.params)
                    
        console.log(items)
        return res.json({items})
    },

    async list_space_data (req, res){
        const { id } = req.params

        const space_names = await connection('spaces')
            .join('dweller_space', 'spaces.id', '=', 'dweller_space.space_id')
            .where('spaces.id', id) //tentar listar os nomes dos espaços que vem do ITEMS (ao inves de colocar 1)
            .select('space_name')
            
        return res.json(space_names)
    },

    async delete (req, res) {
        const {id} = req.params

        const space = await connection('spaces')
            .where('id', id)
            .delete()

        return res.status(204).send()
    }

}