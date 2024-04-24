import Head from 'next/head';
import Chart from '../components/Chart';

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
