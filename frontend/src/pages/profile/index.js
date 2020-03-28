import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';
import logoImage from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()
    const ngo_name = localStorage.getItem('ngo_name')
    const ngo_id = localStorage.getItem('ngo_id')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ngo_id
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ngo_id]) // quando as condições [] se realizarem, execute a função {}

    async function deleteIncidentHandler(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ngo_id
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function logoutHandler() {
        localStorage.clear()
        history.push('/')
    }

  return (
    <div className="profile-container">
        <header>
            <img src={logoImage} alt="Be The Hero" />
            <span>Bem-vinda, {ngo_name}!</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={logoutHandler} type="button">
                <FiPower size={18} color="#e02041" />
            </button>
        </header>

        <h1>Casos cadastrados</h1>
        <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => deleteIncidentHandler(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
            ))}
        </ul>
    </div>
  );
}