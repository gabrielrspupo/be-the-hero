import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function logonHandler(e) {
    e.preventDefault()
    
    try{
      const response = await api.post('sessions', {id})
      localStorage.setItem('ngo_id', id)
      localStorage.setItem('ngo_name', response.data.name)

      history.push('/profile')
    } catch (err) {
      alert('Falha no logon. Tente novamente.')
    }
  }

  return (
    <div className="logon-container">
        <section className="form">
            <img src={logoImage} alt="Be the Hero" />
            <form onSubmit={logonHandler}>
                <h1>Faça seu logon</h1>
                <input
                  placeholder="Sua ID"
                  value={id}
                  onChange={e => setId(e.target.value)}
                />
                <button type="submit" className="button">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#e02041" />
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
