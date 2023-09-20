import { Box, Stack } from "@mui/material";
// import Header from "../shared/header";
import Footer from "../shared/Footer";
import dynamic from "next/dynamic";
import ScrollToButton from "../scrollToButton/ScrollToButton";

const Header = dynamic(() => import("../shared/header"), { ssr: false });
export function Layout({ children }) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Box component="main" flexGrow={1}>
        {children}
      </Box>

      <Footer />
      <ScrollToButton />
    </Stack>
  );
}
