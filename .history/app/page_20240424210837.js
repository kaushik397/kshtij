import Head from 'next/head';
import Chart from '../pages/chart';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nifty Price Action Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Chart />
      </main>
    </div>
  );
}
