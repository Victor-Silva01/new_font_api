import styles from './styles.module.scss';
import Link from 'next/link';


export function Header(){


    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <Link href="/">
                    <h2>Sistema de Pagamentos</h2>
                </Link>

                <nav className={styles.menuNav}>
                    
                  <Link href="/pagamento">
                        <p>Cadastrar pagamento</p>
                  </Link>
                  <Link href="/">
                        <p>Listagem de pagamento</p>
                  </Link>

                </nav>
            </div>
        </header>
    )
}