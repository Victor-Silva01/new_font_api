import Head from "next/head";
import { Header } from '../components/Header';
import styles from '../../styles/home.module.scss';
import { FiRefreshCcw, FiDelete, FiEdit } from 'react-icons/fi';
import { useState, useEffect } from "react";

import { setupApiClient } from '../../src/services/api';

import { ModalPagamento } from '../components/Modal';
import { ModalPagamentoUpdate } from '../components/Modal/modal_update';

import Modal from 'react-modal';

export type PagamentoProps = {
  id: string,
  codigo: string,
  nomepessoacadastro: string,
  descricao: string,
  status: string,
  nometipopagamento: string,
  created_at: string,
  update_at: string,

}

interface HomeProps {
  pagamentos: PagamentoProps[];
}

export default function Home({ pagamentos }: HomeProps) {

  const [pagamentoList, setPagamentosList] = useState(pagamentos || [])
  const [modalItem, setModalItem] = useState<PagamentoProps[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);


  useEffect(() => {
    //Listagem dos Pagamentos
    async function getPagamentoList() {

      const apiClient = setupApiClient();

      const response = await apiClient.get('/all_pagamentos');

      return {
        props: {
          pagamentos: setPagamentosList(response.data)
        }
      }
    }
    getPagamentoList();
  }, []);

  //Fechamento do Modal
  function closeModal() {
    setModalVisible(false);
  }
  //Fechamento do Modal
  function closeModal1() {
    setModalVisible1(false);
  }
  //Listagem dos detalhe do pagamento
  async function listOpenModalView(id: string) {
    const apiClient = setupApiClient();
    const response = await apiClient.get('/pagamentos/id', {
      params: {
        id: id
      }
    })
    setModalItem(response.data);
    setModalVisible(true);
  }
  //Listagem para atualizar as iformacoes do pagamento
  async function listOpenModalViewUp(id: string) {
    const apiClient = setupApiClient();
    const response = await apiClient.get('/pagamentos/id', {
      params: {
        id: id
      }
    })
    setModalItem(response.data);
    setModalVisible1(true);
  }


  //Refresh dos pagamentos no botao com o icone de refresh
  async function refreshPagamento() {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/all_pagamentos');
    setPagamentosList(response.data);
  }


  //Deletar pagamento
  async function deletePagamento(id: string) {

    const apiClient = setupApiClient();

    const response = await apiClient.delete('/pagamento/remove', {
      params: {
        id: id
      }
    });
    refreshPagamento()
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Listagem de pagamentos</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Pagamentos</h1>
            <button onClick={refreshPagamento}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listPagamento}>
            {pagamentoList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pagamento foi encontrado...
              </span>
            )}
            {pagamentoList.map(item => (
              <section key={item.id} className={styles.orderPagamento}>
                <button onClick={() => listOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span><strong>Codigo</strong>: {item.codigo} | <b>Descrição</b>: {item.descricao}</span>

                </button>
                <div className={styles.containerButton}>

                  <button className={styles.btnremove} onClick={() => deletePagamento(item.id)}>
                    <FiDelete size={25} color="#ff3f4b" />
                  </button>

                  <button className={styles.btnupdate} onClick={() => listOpenModalViewUp(item.id)}>
                    <FiEdit size={25} color="#3fffa3" />
                  </button>
                </div>
              </section>
            ))}

          </article>

        </main>

        {modalVisible && (
          <ModalPagamento
            isOpen={modalVisible}
            onRequestClose={closeModal}
            pagamento={modalItem}
          />
        )}

        {modalVisible1 && (
          <ModalPagamentoUpdate
            isOpen={modalVisible1}
            onRequestClose={closeModal1}
            pagamento={modalItem}
          />
        )}
      </div>
    </>
  )
}

