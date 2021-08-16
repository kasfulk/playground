import Layout from "components/Layout";

export const Home = (): JSX.Element => (
  <>
    <Layout>
      <h1 className="w-full text-center pt-7 text-3xl font-semibold">
        This is a playground project for Tomorrow's Education hiring process.
        you can fork this repository and continue with your assigment. If you
        need to do any backend stuff to complete your task check{" "}
        <a href="/api/hello">API example</a> for references to do the backend
        work in this repository
      </h1>
    </Layout>
  </>
);

export default Home;
