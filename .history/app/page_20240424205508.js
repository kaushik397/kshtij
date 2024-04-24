import Image from "next/image";
import styles from "./page.module.css";

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
