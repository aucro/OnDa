import Link from 'next/link'
import styles from 'component/common/header/Header.module.scss'
import { Router } from 'next/router'

const menus = [
  { name: '월별 모아보기', url: '/collection/month' },
  { name: '오늘의 다이어리', url: '/diary/2020-05-01' },
]

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
        {/* 토큰 여부 검사 후 선택적 렌더링 */}
        <div
          className={styles.menu}
          onClick={() => (document.location.href = '/user/login')}
        >
          로그인
        </div>
        <div
          className={styles.menu}
          onClick={() => {
            //로그아웃 로직 추가 필요
          }}
        >
          로그아웃
        </div>
      </div>
    </div>
  )
}

export default Header
