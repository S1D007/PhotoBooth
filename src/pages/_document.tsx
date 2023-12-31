import { Html, Head, Main, NextScript } from "next/document";
import { NextUIProvider } from "@nextui-org/react";

export default function Document() {
  return (
    <Html lang="en" className="">
      <Head />
      <body>
        <NextUIProvider>
          <Main />
          <NextScript />
        </NextUIProvider>
      </body>
    </Html>
  );
}
