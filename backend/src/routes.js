const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("./config/multer")
const Post = require("./models/Post")

const DwellerController = require('./controllers/DwellerController')
const SpaceController = require('./controllers/SpaceController')
const ImageController = require('./controllers/ImageController')
const connection = require('./database/connection')

//ROTAS - CONDÔMINOS [BD-SQLITE]
routes.post('/dweller', DwellerController.create)
routes.get('/dweller', DwellerController.list)
routes.delete('/dweller/:id', DwellerController.delete)

//ROTAS - SPAÇOS [BD-SQLITE]
routes.post('/space', SpaceController.create)
routes.get('/space', SpaceController.list)
routes.get('/list_space_for_dweller/:id', SpaceController.list_space_for_dweller)
routes.get('/list_space_data/:id', SpaceController.list_space_data)
routes.delete('/space/:id', SpaceController.delete)

//ROTAS - IMAGENS [BD] (EXCETO O CREATE)
routes.post('/image', ImageController.create)
routes.get('/image', ImageController.list)
routes.delete('/image/:id', ImageController.delete)

//ROTAS - IMAGENS NO S3 + CREATE DA IMAGEM [BD]
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file

  const post = await Post.create({
    name,
    size,
    key,
    url
  })

  return res.json(post)
})

routes.get("/posts", async (req, res) => {
  const posts = await Post.find()

  return res.json(posts)
})

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)

  await post.remove()

  return res.send()
})

module.exports = routes
