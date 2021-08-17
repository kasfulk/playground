import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import Layout from "components/Layout";
import StudentCard from "components/Student";
import { StudentAll } from "models/student/student.interface";

const url: string = process.env.API_URL;

interface PageRequest {
  page: number;
}

export const getStaticProps: GetStaticProps<StudentAll> = async () => {
  const { data } = await axios.get(url + "api/student");
  const reviewer = await axios.get(url + "api/reviewer");
  const page = await axios.get(url + "api/student/total-page");
  console.log(data);
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

  const nextPage = async (): Promise<void> => {
    setPage(page + 1);
    const body: PageRequest = {
      page: page + 1,
    };
    const { data } = await axios.post(url + "api/student", body);
    const reviewerApi = await axios.get(url + "api/reviewer");
    const reviewerData = reviewerApi.data.idReviewer
      ? reviewerApi.data.idReviewer
      : "";
    setReviewer(reviewerData);
    setView(data);
    console.log(data);
  };

  const prevPage = async (): Promise<void> => {
    setPage(page - 1);
    const body: PageRequest = {
      page: page - 1,
    };
    const { data } = await axios.post(url + "api/student", body);
    const reviewerApi = await axios.get(url + "api/reviewer");
    const reviewerData = reviewerApi.data.idReviewer
      ? reviewerApi.data.idReviewer
      : "";
    setReviewer(reviewerData);
    setView(data);
    console.log(data);
  };

  return (
    <>
      <Layout>
        <div className="flex justify-content-between">
          <div className="w-10">
            {page != 1 && (
              <button className="mx-2" onClick={() => prevPage()}>
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
              <button className="mx-2" onClick={() => nextPage()}>
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
