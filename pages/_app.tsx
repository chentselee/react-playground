import "../styles/globals.css";

import { inspect } from "@xstate/inspect";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      inspect({ iframe: false });
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <Router>
          <Provider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Provider>
        </Router>
      )}
    </div>
  );
}

export default App;
