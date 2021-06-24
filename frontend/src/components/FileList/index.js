import React, { useState }  from "react"
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from "react-icons/md"

import { Container, FileInfo, Preview } from "./styles"

function FileList (props) {

  const history = useHistory()
  const count = 0

  async function handleCreatePhoto(e){
    e.preventDefault()
    
    const dweller_id = localStorage.getItem('dweller_id')

    const dados = [{
      image_name: '',
      url: '',
      key: '',
      dweller_id: dweller_id
    }]
    
    props.files.map(uploadedFile => {
      dados.push({
        image_name: uploadedFile.name,
        url: uploadedFile.url,
        key: uploadedFile.id,
        dweller_id,
      })
    })

    try{
      dados.shift() //pra limpar os dados inicialmente em branco
      console.log(dados[0])
      for(let i = 0; i < dados.length; i++){
        const response = await api.post('image', dados[i])
      }
      

      alert(`Cadastro finalizado!`)
      history.push('/')
    }catch(error){
        alert('Erro no cadastro! Tente novamente.')
    }
  }

  return(
    <form onSubmit={handleCreatePhoto}>
      <Container>
        {props.files.map(uploadedFile => (
          <li key={uploadedFile.id}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{" "}
                  {uploadedFile.url && (
                    <button onClick={() => props.onDelete(uploadedFile.id)}>
                      Excluir
                    </button>
                  )}
                </span>
              </div>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded && //se ainda nao terminou upload + nao teve erro
                !uploadedFile.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 24 },
                      path: { stroke: "#7159c1" }
                    }}
                    strokeWidth={10}
                    percentage={uploadedFile.progress}
                  />
                )}

              {uploadedFile.url && ( //se o file tiver já a url (do link da imagem)
                <a                  // eu mostro o link
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />} 
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
        <button type='submit'>Finalizar Cadastro</button>
      </Container>
    </form>
  )
   
}

export default FileList