import Head from "next/head";
import PageHeader from "./PageHeader";

export const Layout = ({ children }): JSX.Element => (
  <>
    <Head>
      <title>Playground</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageHeader />
    <main>
      <div className="container px-10 mx-auto flex flex-wrap items-center justify-between">
        {children}
      </div>
    </main>
  </>
);

export default Layout;
