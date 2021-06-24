import React, { Component } from "react"
import { useHistory } from 'react-router-dom'
import { uniqueId } from "lodash";
import filesize from "filesize"

import api from '../../services/api'

import GlobalStyle from '../../styles/global'
import { Container, Content } from '../../styles'

import Upload from '../../components/Upload'
import FileList from "../../components/FileList"

export default class Posts extends Component {

  state = {
    uploadedFiles: [],
    uploadedURLs: []
  }


  handleUpload = files => { //percorro as imagens pra pegar todos os dados, msm que dê erro
    const uploadedFiles = files.map(file => ({ //pra retornar algo
      file, //o arquivo em si, que será enviado para a api
      id: uniqueId(), //gerador de ids para cada imagem ter id unico  
      name: file.name,
      readableSize: filesize(file.size), //da bib.  fileSize pra mostrar certo o tamanho (kB, MB..)
      preview: URL.createObjectURL(file), 
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles) 
      //concat pra uploadedFiles conter todos as props das imagens, e não sobrepor 1 quando inserir outra
    })

    uploadedFiles.forEach(this.processUpload); //conexão com a API (BACKEND) - função feita abaixo
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    })
  }

  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name); //'file' pq é o nome que usei no multer no backend
    //ai ele manda o file e o nome dele. Logo, o data ja contem esses dados

    api
      .post("posts", data, { // e eu os envio na rota posts da api
        onUploadProgress: e => { //essa função é basicamente pra conseguir coletar as infos de progesso pra barra de progesso
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          })
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        })
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };


  handleDelete = async id => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  handleTakeDwellerId = () => {
    return (localStorage.get('dweller_id'))
  }
  
  render() {
    const { uploadedFiles } = this.state

    return (
        <div>
            <Container>
              <Content>
                  <Upload onUpload={this.handleUpload} />
                  {!!uploadedFiles.length && ( //se tiver algum arquivo já uploaded
                  <FileList files={uploadedFiles} onDelete={this.handleDelete}/> //ai retorna a lista dos files
                  //ele chama essa função files que ta dentro do FileList (index.js)           
                  )}
              </Content>
            <GlobalStyle />
            </Container>
        </div>
        
    )
  }
}