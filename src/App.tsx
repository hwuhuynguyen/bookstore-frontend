import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import "@mantine/core/styles.css";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider withCssVariables withGlobalClasses>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
