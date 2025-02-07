import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import CustomAlert from "../components/ui/CustomAlert";
import { MainLayout } from "../components/layouts/MainLayout";
import "../i18n/i18n.config";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const client = new QueryClient();

  return (
    <PaperProvider>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <MainLayout />
        </QueryClientProvider>
        <CustomAlert />
      </Provider>
    </PaperProvider>
  );
}
