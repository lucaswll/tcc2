import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

export default function Dweller () {
    const history = useHistory()

    const [name, setName] = useState('')    
    const [whatsapp, setWhatsapp] = useState('')
    const [building, setBuilding] = useState('')
    const [ap, setAp] = useState('')
    
    const [scheduleItems, setScheduleItems] = useState([
        { space: 0}
    ])
    
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { space: 0}
        ])
    }

    function setScheduleItemValue(position, field, value){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return { ...scheduleItem, [field]:value }
            }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }


    async function handleCreateDweller(e){
        e.preventDefault()

        const datas = {
            name,
            building,
            ap,
            whatsapp,
        }

        try{
            if(!Number(whatsapp)){
                alert('Campo para WhatsApp aceita apenas números...')
            }
            if (name==='' || building==='' || ap==='' || whatsapp===''){
                alert('Existem dados em branco!!')            
            }
            else{
                const response = await api.post('dweller', datas)

                const id_dweller = response.data
                localStorage.setItem('dweller_id', id_dweller)
    
                alert(`ID_Condômino: ${id_dweller}. Dando prosseguimento ao cadastro...`)
                
                history.push('/posts')
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
                    <strong>Cadastro de Condôminos</strong>
                    Preencha o formulário abaixo
                </div>            
            </header>

            <main>
                <form onSubmit={handleCreateDweller}>
                    <fieldset>
                        <legend>Dados Pessoais</legend>

                        <div className="input-block">
                            <label htmlFor="name">Nome completo - *sem abreviações</label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => {setName(e.target.value)}}>
                            </input>
                        </div>

                        <div className="input-block">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input
                                type="text"
                                id="whatsapp"
                                onChange={(e) => {setWhatsapp(e.target.value)}}>
                            </input>
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>Condomínio</legend>         
                        
                        <div className="select-block">
                            <label htmlFor="building">Prédio</label>
                            <select
                                id="building"
                                onChange={e => {setBuilding(e.target.value)}}
                            >
                                <option value='' hidden disabled selected>Selecione o prédio</option>
                                
                                <option key='Búzios' value='Buzios'>Búzios </option>
                                <option key='Maragogi' value='Maragogi'>Maragogi </option>
                                <option key='Arpoador' value='Arpoador'>Arpoador </option>
                                <option key='Grumari' value='Grumari'>Grumari </option>
                                <option key='Itapuã' value='Itapuã'>Itapuã </option>
                            </select>
                        </div>

                        <div className="input-block">
                            <label htmlFor="ap">Nº Apartamento</label>
                            <input
                                type="text"
                                id="ap"
                                onChange={(e) => {setAp(e.target.value)}}>
                            </input>
                        </div>
                        
                    </fieldset>

                    <fieldset>
                        <legend>
                            Ambientes Permitidos
                            <button type='button' onClick={addNewScheduleItem}>
                                + Nova permissão
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, position) => {
                            return(
                                <div key={scheduleItem.space} className="select-block">
                                    <select
                                        name="week-day"
                                        label="Dia da semana"
                                        value={scheduleItem.space}
                                        onChange={e => setScheduleItemValue(position, 'space', e.target.value)}>
                                            <option key='0' value='0'>Piscina</option>
                                            <option key='1' value='1'>Andar 1</option>
                                            <option key='2' value='2'>Andar 5</option>
                                            <option key='3' value='3'>Andar 7</option>
                                            <option key='4' value='4'>Hall das Docas</option>
                                            <option key='5' value='5'>Portaria 1</option>
                                            <option key='6' value='6'>Portaria 2</option>
                                            <option key='7' value='7'>Academia</option>
                                    </select>

                                    
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"></img>
                            Importante! <br />
                            Preencha todos os dados!
                        </p>
                        <button type='submit'> 
                            Continuar
                        </button>
                    </footer>
                </form>                
            </main>
        </div>
    )
}