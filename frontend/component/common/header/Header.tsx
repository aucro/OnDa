import Link from 'next/link'
import styles from 'component/common/header/Header.module.scss'

const menus = [
  { name: '월별 모아보기', url: '/collection/month' },
  { name: '오늘의 다이어리', url: '/diary/' },
]

const loginMenu = { name: '로그인', url: '/user/login' }
const logout = { name: '로그아웃', url: '/user/login' }

const Header = () => {
  return (
    <div className={styles.naviWrapper}>
      <div className={styles.menuContainer}>
        {menus.map((m) => (
          <div className={styles.menu}>
            <Link href={m.url}>{m.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
