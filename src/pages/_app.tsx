import type { AppProps } from "next/app";
import "../app/globals.css";
import SiteLayout from "../../components/SiteLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}
