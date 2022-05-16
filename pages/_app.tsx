import "bootstrap/dist/css/bootstrap.min.css";
import "styles/main.scss";
import SSRProvider from "react-bootstrap/SSRProvider";
import type { AppProps } from "next/app";
import { EventWrapper } from "contexts/EventContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <noscript>This App require JavaScript</noscript>
      <SSRProvider>
        <EventWrapper>
          <Component {...pageProps} />
        </EventWrapper>
      </SSRProvider>
    </>
  );
}

export default MyApp;
