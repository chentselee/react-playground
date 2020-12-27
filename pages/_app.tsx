import "../styles/globals.css";

import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
