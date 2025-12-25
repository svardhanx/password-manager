"use client";

import {
  createTheme,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { Provider } from "react-redux";
import store from "@/store/store";
import ApplicationLayout from "./ApplicationLayout";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: MantineThemeOverride = createTheme({
    colors: {
      primary: [
        "#f2f1ff",
        "#e3e1ff",
        "#c5c1ff",
        "#a8a3ff",
        "#8a84ff",
        "#6f68f5",
        "#615ae7",
        "#4f49c9",
        "#3f3aa3",
        "#312e7d",
        "#241f57",
        "#181332",
      ],
    },
    primaryColor: "primary",
    primaryShade: 6,
  });

  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ApplicationLayout>{children}</ApplicationLayout>
        <Toaster />
        {/* {children} */}
      </MantineProvider>
    </Provider>
  );
}
