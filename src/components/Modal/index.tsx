import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';
import { PagamentoProps } from '../../pages'

interface ModalPagamentos {
    isOpen: boolean;
    onRequestClose: () => void;
    pagamento: PagamentoProps[];
}

export function ModalPagamento({ isOpen, onRequestClose, pagamento }: ModalPagamentos) {

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


                {pagamento.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span className={styles.description}><strong>ID</strong>: {item.id}</span>
                        <span className={styles.description}><strong>Codigo</strong>: {item.codigo}</span>
                        <span className={styles.description}><strong>Tipo pagamento</strong>: {item.nometipopagamento}</span>
                        <span className={styles.description}><strong>Descrição pagamento</strong>: {item.descricao}</span>
                        <span className={styles.description}><strong>Status</strong>: {item.status}</span>
                        <span className={styles.description}><strong>Pessoa que cadastrou</strong>: {item.nomepessoacadastro}</span>
                        <span className={styles.description}><strong>Data do cadastro</strong>: {item.created_at}</span>
                        <span className={styles.description}><strong>Ultima atualização</strong>: {item.update_at}</span>

                    </section>
                ))}
            </div>

        </Modal >
    )
}