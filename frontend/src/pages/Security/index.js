import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

export default function Space () {
    const history = useHistory()

    const [name, setName] = useState('')

    async function handleCreateSpace(e){
        e.preventDefault()

        const data = {
            space_name: name
        }

        try{
            if(name===''){
                alert('O nome do ambiente não pode estar em branco!!')            
            }
            else{
                const response = await api.post('space', data)

                const id_space = response.data
    
                alert(`Cadastro do ambiente: ${id_space} | ${name} finalizado.`)
                
                history.push('/')
            }
            
        }catch(error){
            alert('Erro no cadastro! Tente novamente.')
        }
    }
    
    return (
        <div id="page-teacher-form" className="container">
            <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt='Voltar'></img>
                    </Link>
                    <img src={logoImg} alt='Proffy' className='imgProffy'></img>
                </div>

                <div className="header-content">
                    <strong>Administração e Segurança do Condomínio</strong>
                </div>            
            </header>

            <main>
                <form onSubmit={handleCreateSpace}>
                    <fieldset>
                        <div className="input-block">
                            <label htmlFor="name">Nome do espaço - *sem abreviações</label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => {setName(e.target.value)}}>
                            </input>
                        </div>
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"></img>
                            Importante! <br />
                            Preencha o(s) dado(s) requerido(s)!
                        </p>
                        <button type='submit'> 
                            Cadastrar 
                        </button>
                    </footer>
                </form>                
            </main>
        </div>
    )
}