import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { StudentModel } from "models/student/student.service";
import React, { useState } from "react";
import Layout from "components/Layout";
import Student from "components/Student";
import Challenge from "components/Challenge";

const student = new StudentModel();

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await student.allStudent();
  const paths = [];
  for (let i = 1; i <= 50; i++) {
    for (const d of data)
      paths.push({
        params: {
          id: d.id,
        },
      });
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}) => {
  console.log(params);
  const data = await student.findId(params.id);
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

export const StudentDetails = ({ data }): JSX.Element => {
  const [reviewer, setReviewer] = useState("");
  const studentData = [data.student];

  const getReviewer = async (): Promise<any> => {
    const { data } = await axios.get("/api/reviewer");
    setReviewer(data?.idReviewer);
  };
  getReviewer();
  return (
    <>
      <Layout>
        <h1 className="w-full text-center pt-7 text-3xl font-semibold">
          Student Details
        </h1>
        <Student data={studentData} idReviewer={reviewer} />
        <h1>Challenges</h1>
        <Challenge data={data.challenge} />
      </Layout>
    </>
  );
};

export default StudentDetails;
