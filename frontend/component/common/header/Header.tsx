import Link from 'next/link'
import styles from 'component/common/header/Header.module.scss'
import { Router } from 'next/router'

const menus = [
  { name: '월별 모아보기', url: '/collection/month' },
  { name: '오늘의 다이어리', url: '/diary/2020-05-01' },
]

const loginMenu = { name: '로그인', url: '/user/login' }
const logout = { name: '로그아웃', url: '/user/logout' }

const Header = () => {
  return (
    <div className={styles.naviWrapper}>
      <div className={styles.menuContainer}>
        {menus.map((m) => (
          <div
            className={styles.menu}
            onClick={() => (document.location.href = m.url)}
          >
            {m.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
