import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <meta name="description" content="AI数字货币趋势预测工具" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{background:'#f5f8ff'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}