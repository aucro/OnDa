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

function isMember(props) {
  return false
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>온 다: 온라인 다이어리</title>
      </Head>
      {pageProps.path !== '/' && <Header />}
      {isMember(pageProps) ? <Component {...pageProps} /> : alert('접근제한')}
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const { ctx, Component, req } = context
  let pageProps = {}
  if (Component.getInitialProps) {
    // Component의 context로 ctx를 넣어주자
    pageProps = await Component.getInitialProps(ctx)
  }

  // return한 값은 해당 컴포넌트의 props로 들어가게 됩니다.
  return {
    pageProps: {
      ...pageProps,
      path: ctx.asPath,
      diaryDate: ctx.query.diaryDate,
    },
  }
}

export default wrapper.withRedux(MyApp)
