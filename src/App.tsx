import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

function App() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider withCssVariables withGlobalClasses>
      <Notifications position="top-right" zIndex={2077} />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
