import {useState, FormEvent} from 'react';

import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';
import { PagamentoProps } from '../../pages';

import {setupApiClient} from '../../services/api';
import { toast } from 'react-toastify';

interface ModalPagamentosUP {
    isOpen: boolean;
    onRequestClose: () => void;
    pagamento: PagamentoProps[];
}

export function ModalPagamentoUpdate({ isOpen, onRequestClose, pagamento }: ModalPagamentosUP) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }
    
    const [tipopagamento, setTipoPagamento] = useState(pagamento[0].nometipopagamento);
    const [descricao, setDescricao] = useState(pagamento[0].descricao);
    const [status, setStatus] = useState(pagamento[0].status);
    const [nome, setNome] = useState(pagamento[0].nomepessoacadastro);


    //Atualizar pagamento
    async function updatePagamento(event: FormEvent){
        event.preventDefault(); //Nao atualizar a pagina
    
     const apiClien =  setupApiClient();

     await apiClien.put('/pagamento/update',{
            id: pagamento[0].id,
            nometipopagamento:tipopagamento,
            descricao:descricao,
            status:status,
            nomepessoacadastro:nome
        }).then(response => {

            toast.success('Cadastrado atualizado!')
            
            //setCodigo('');
            setTipoPagamento('');
            setDescricao('');
            setStatus('');
            setNome('')
        }).
        catch(error => toast.error('Erro ao cadastrar pagamento', error))

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}>
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>
                <h2>Detalhes do Pagamento</h2>
                
               
                    <form className={styles.containerItem} onSubmit={updatePagamento}>
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
                                Atualizar
                        </button>
                    </form>
               
            </div>

        </Modal >
    )
}