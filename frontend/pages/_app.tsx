import '../styles/globals.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import { wrapper } from '../core/store'

import type { AppProps } from 'next/app'

import Header from 'component/common/header/Header'
import 'styles/css/font.css'
import 'styles/css/framer.css'
import Head from 'next/head'
import cookies from 'next-cookies'
import { getIsMember } from 'core/api/auth'

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return (
    <>
      <Head>
        <title>온 다: 온라인 다이어리</title>
      </Head>
      {pageProps.path !== '/' && <Header {...pageProps} />}
      {(pageProps.isMember &&
        pageProps.path != '/' &&
        pageProps.path != '/user/login') ||
      (!pageProps.isMember && pageProps.path == '/') ? (
        <Component {...pageProps} />
      ) : (
        ''
      )}
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const { ctx, Component, req } = context
  let props = {}
  if (Component.getInitialProps) {
    props = await Component.getInitialProps(ctx)
  }

  const t = cookies(context).member
  const token = t === undefined ? null : t
  const isMember =
    t === undefined ? false : await getIsMember(cookies(context).member)

  return {
    pageProps: {
      ...props,
      path: ctx.asPath,
      diaryDate: ctx.query.diaryDate,
      isMember: isMember,
      token: token,
    },
  }
}

export default wrapper.withRedux(MyApp)
