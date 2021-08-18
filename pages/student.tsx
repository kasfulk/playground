import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import Layout from "components/Layout";
import StudentCard from "components/Student";
import { StudentAll } from "models/student/student.interface";

// const url: string = process.env.API_URL;

interface PageRequest {
  page: number;
}

export const getStaticProps: GetStaticProps<StudentAll> = async () => {
  const { data } = await axios.get("http://localhost:3000/api/student");
  const reviewer = await axios.get("http://localhost:3000/api/reviewer");
  const page = await axios.get("http://localhost:3000/api/student/total-page");
  return {
    props: {
      data,
      idReviewer: reviewer.data.idReviewer ? reviewer.data.idReviewer : "",
      totalPage: page.data.totalPage,
    },
  };
};

export const StudentPage = ({ data, idReviewer, totalPage }): JSX.Element => {
  const [view, setView] = useState(data);
  const [reviewer, setReviewer] = useState(idReviewer);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const body: PageRequest = {
        page: page,
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/student",
        body
      );
      const reviewerApi = await axios.get("http://localhost:3000/api/reviewer");
      const reviewerData = reviewerApi.data.idReviewer
        ? reviewerApi.data.idReviewer
        : "";
      setReviewer(reviewerData);
      setView(data);
    };
    getData();
  }, [page]);

  return (
    <>
      <Layout>
        <div className="flex justify-content-between">
          <div className="w-10">
            {page != 1 && (
              <button className="mx-2" onClick={() => setPage(page - 1)}>
                {"<<"}
              </button>
            )}
          </div>
          <div>
            <input className="text-white w-5 bg-gray-600" value={page} /> /{" "}
            <input
              className="text-white w-5 bg-gray-600"
              value={totalPage}
              disabled
            />
          </div>
          <div className="w-10">
            {page != totalPage && (
              <button className="mx-2" onClick={() => setPage(page + 1)}>
                {">>"}
              </button>
            )}
          </div>
        </div>
        <StudentCard data={view} idReviewer={reviewer} />
      </Layout>
    </>
  );
};

export default StudentPage;
