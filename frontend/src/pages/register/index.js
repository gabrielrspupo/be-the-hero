import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImage from "../../assets/logo.svg";

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const history = useHistory()

    async function registerHandler(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        }

        try {
            const response = await api.post('ngos', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }
    }
    return (
    <div className="register-container">
        <div className="content">
            <section>
                <img src={logoImage} alt="Be The Hero" />

                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#e02041" />
                    Voltar à página inicial
                </Link>

            </section>
            <form onSubmit={registerHandler}>
                <input
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
                <div className="input-group">
                    <input
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <input
                        placeholder="UF"
                        style={{ width: 80 }}
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
  );
}
