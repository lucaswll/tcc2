import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

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
            await api.delete(`dweller/${id}`, {//pq nesse formato? Porque é como coloquei pra estar na rota do delete, no backend
               
            })  

            setDwellers(dwellers.filter(incident => incident.id !== id)) //para todos os incidents filtrados, listar apenas os que nao tem o id ali dentro
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
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Hero"></img>

                <Link to="/dweller" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogOut} type="button">
                    <FiPower size={18} color="#e02041" />                
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {dwellers.map((dweller) => {
                    return(
                        <li key={dweller.id}> 
                        <strong>Morador:</strong>
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
        </div>
    )
}