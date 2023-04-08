import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          A&nbsp;
          <code className={styles.code}>freelancer</code>&nbsp; who codes and design.
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logomhm.svg"
              alt="MHM Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
      <Image
          className={styles.logo}
          src="/mhm.svg"
          alt="MHM Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <p className="text-3xl font-bold">
          yu
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="#"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            A Designer <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            a designer by day.
          </p>
        </a>

        <a
          href="#"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            A coder <span>-&gt;</span>
          </h2>
          <p className={inter.className}>A coder by night, sometime by day.</p>
        </a>

        <a
          href="#"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            A freelancer <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            A freelancer everyday.
          </p>
        </a>
      </div>
    </main>
  )
}
