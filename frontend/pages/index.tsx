import type { NextPage } from 'next'
import styles from 'styles/scss/Main.module.scss'
import Login from './user/login'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideContainer}>
        <div>
          <h2>
            오늘의 기록, 온 : 다
            <br />
            온라인 다이어리 온 : 다 를 통해 오늘의 기록을 남기세요
          </h2>
          <br />
          <h3>
            내가 썼던 기록이 언제였는지 기억이 안날 때
            <br />
            여러 기록을 모아 한 눈에 보고싶을 때
          </h3>
        </div>
      </div>
      <div className={styles.sideContainer}>
        <Login />
      </div>
    </div>
  )
}

export default Home
