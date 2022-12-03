import {useState, FormEvent} from 'react';
import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';

import {setupApiClient} from '../../services/api';
import { toast } from 'react-toastify';

export default function Pagamento() {

    //const [codigo, setCodigo] = useState('');
    const [tipopagamento, setTipoPagamento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [nome, setNome] = useState('');


    //Cadastrar um novo pagamento
    async function registrar(event: FormEvent){
        event.preventDefault(); //Nao atualizar a pagina
    
     const apiClien =  setupApiClient();

     await apiClien.post('/create_pagamento',{
            codigo: Math.random().toString(36).slice(2, 10).toUpperCase(),
            nometipopagamento:tipopagamento,
            descricao:descricao,
            status:status,
            nomepessoacadastro:nome
        }).then(response => {

            toast.success('Cadastrado com sucesso!')
            
            //setCodigo('');
            setTipoPagamento('');
            setDescricao('');
            setStatus('');
            setNome('')
        }).
        catch(error => toast.error('Erro ao cadastrar pagamento', error))

    }
    return (
        <>
            <Head>
                <title>Novo Pagamento</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar  Pagamento</h1>

                    <form className={styles.form} onSubmit={registrar}>
                       {/* <input
                            type='text'
                            placeholder="Codigo do pagamento"
                            className={styles.input}
                            value={codigo}
                            onChange={(e) =>setCodigo(e.target.value)}
                       />*/}
                        <input
                            type='text'
                            placeholder="Tipo de pagamento"
                            className={styles.input}
                            value={tipopagamento}
                            onChange={(e) =>setTipoPagamento(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Descricao do pagamento"
                            className={styles.input}
                            value={descricao}
                            onChange={(e) =>setDescricao(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Status do pagamento"
                            className={styles.input}
                            value={status}
                            onChange={(e) =>setStatus(e.target.value)}
                        />

                        <input
                            type='text'
                            placeholder="Nome da pessoa que cadastrou"
                            className={styles.input}
                            value={nome}
                            onChange={(e) =>setNome(e.target.value)}
                        />

                        <button type="submit" className={styles.buttonAdd}>
                                Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}