import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import Layout from "components/Layout";
import StudentCard from "components/Student";
import { StudentAll } from "models/student/student.interface";
import { StudentModel } from "models/student/student.service";

const student = new StudentModel();

// const url: string = process.env.API_URL;

interface PageRequest {
  page: number;
}

export const getStaticProps: GetStaticProps<StudentAll> = async () => {
  const { data } = await student.findAll(1);
  const page = await student.totalPage();
  return {
    props: {
      data,
      totalPage: page.totalPage,
    },
  };
};

export const StudentPage = ({ data, totalPage }): JSX.Element => {
  const [view, setView] = useState(data);
  const [reviewer, setReviewer] = useState("");
  const [page, setPage] = useState(1);

  const getReviewer = async (): Promise<any> => {
    const { data } = await axios.get("/api/reviewer");
    setReviewer(data?.idReviewer);
  };
  getReviewer();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const body: PageRequest = {
        page: page,
      };
      const { data } = await axios.post("/api/student", body);
      const reviewerApi = await axios.get("/api/reviewer");
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
        <div>
          <h1>Student Page</h1>
        </div>
        <div className="flex justify-content-between">
          <div className="w-10">
            {page != 1 && (
              <button
                className="mx-2"
                onClick={() => setPage(page - 1)}
                defaultValue={page}
              >
                {"<<"}
              </button>
            )}
          </div>
          <div>
            <input
              className="text-white w-5 bg-gray-600"
              value={page}
              disabled
            />{" "}
            /{" "}
            <input
              className="text-white w-5 bg-gray-600"
              defaultValue={totalPage}
              disabled
            />
          </div>
          <div className="w-10">
            {page != totalPage && (
              <button
                className="mx-2"
                onClick={() => setPage(page + 1)}
                defaultValue={page}
              >
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
