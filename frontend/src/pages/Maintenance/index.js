import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import warningIcon from '../../assets/images/icons/warning.svg'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'
import { FiPlus } from "react-icons/fi";

export default function Sec(){

    const [dwellers, setDwellers] = useState([
        { name: '', building: '', ap: '', whatsapp: '' }
    ])

    const history = useHistory() //reenviar para outra rota

    //const ongName = localStorage.getItem('ongName')
    //const ongId = localStorage.getItem('ongId')
    
    useEffect(() => { //pacote importado; serve para buscar/atualizar os dados de acordo com o id da ong (retorna os dados = 'data')
        api.get('dweller',
        ).then(response => {
            setDwellers(response.data)
        })
    })

    //console.log(dwellers.dweller)
    //console.log(dwellers.dweller_space)

    async function handlesDeleteDweller(id){
        try{
            await api.delete(`dweller/${id}`,{})  

            setDwellers(dwellers.filter(dweller => dweller.id !== id)) //para todos os incidents filtrados, listar apenas os que nao tem o id ali dentro
            //ou seja, serve para excluir a grid css lá da pagina, assim que clicar no botão de delete
        }catch(error){
            alert('Erro ao tentar deletar o morador. Tente novamente!')
        }
    }

    function handleLogOut(){
        localStorage.clear()

        history.push('/')
    }

    return(
        <div id="page-teacher-form" className="container">
            <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt='Voltar'></img>
                    </Link>
                    <img src={logoImg} alt='Proffy' className='imgProffy'></img>
                </div>

                <div className="header-content">
                    <strong>Manutenção dos Condôminos</strong>                
                </div>

                <div className="page-header2">
                    <Link to="/dweller">
                        <FiPlus size={25} color="#fff" />
                        Cadastrar novo morador
                    </Link>
                </div>
                
            </header>
    
            <main>                
                <h1>Condôminos Cadastrados</h1>

                <ul>
                    {dwellers.map((dweller) => {
                        return(
                            <li key={dweller.id}> 
                            <strong>CONDÔMINO:</strong>
                            <p>{dweller.name}</p>

                            <strong>PRÉDIO</strong>
                            <p>{dweller.building}</p>

                            <strong>APARTAMENTO</strong>
                            <p>{dweller.ap}</p>

                            <strong>WHATSAPP</strong>
                            <p>{dweller.whatsapp}</p>

                            <button onClick={() => handlesDeleteDweller(dweller.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                            </li>
                        )                    
                    })}
                </ul>
            </main>
        </div>
    )
}