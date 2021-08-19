import Layout from "components/Layout";
import axios from "axios";

export const Home = (): JSX.Element => {
  const generateData = async (): Promise<void> => {
    const { data } = await axios.get("/api/generate");
    return data;
  };
  return (
    <>
      <Layout>
        <h1 className="w-full text-center pt-7 text-3xl font-semibold">
          This is a playground project for Tomorrow's Education hiring process.
          you can fork this repository and continue with your assigment. If you
          need to do any backend stuff to complete your task check{" "}
          <a href="/api/hello">API example</a> for references to do the backend
          work in this repository.
          <br />
          <br />
          <br />
          This button can generate example data for this site.
        </h1>
        <div className="w-full text-center pt-7">
          <button
            type="button"
            onClick={() => generateData()}
            className="text-lg bg-blue-500 p-4 rounded-lg"
          >
            Generate Data
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Home;
