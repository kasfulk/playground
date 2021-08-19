import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { ChallengeModel } from "models/challenge/challenge.service";
import { StudentModel } from "models/student/student.service";
import React, { useState } from "react";
import Layout from "components/Layout";

const challenge = new ChallengeModel();
const student = new StudentModel();

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: any = await challenge.findAllId();
  console.log(data);
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
  const data = await challenge.findId(params.id);
  const studentData = await student.findId(data.studentId);
  const reviewer = await student.findId(data.reviewerId ? data.reviewerId : "");
  console.log(reviewer.student);
  const reviewerData = reviewer.student;
  return {
    props: {
      data,
      student: studentData.student,
      reviewer: reviewerData,
    },
  };
};

export const StudentDetails = ({ data, student, reviewer }): JSX.Element => {
  const [reviewerId, setReviewerId] = useState("");
  const [grade, setGrade] = useState(data.grade ? data.grade : 0);
  const [reviewerName, setReviewerName] = useState(reviewer?.name);
  const [gradingStatus, setGradingStatus] = useState(data.gradingStatus);
  const getReviewer = async (): Promise<any> => {
    const { data } = await axios.get("/api/reviewer");
    setReviewerId(data?.idReviewer);
  };
  getReviewer();

  const setGradeAPI = async (gradeValue): Promise<any> => {
    const response: any = await axios.put(`/api/challenge/${data.id}`, {
      grade: gradeValue,
      reviewer: reviewerId,
    });
    const { result } = response.data;
    if (result.interview) {
      const reviewerValue = await axios.get(
        `/api/student/${result.reviewerId})`
      );
      const reviewerData = reviewerValue.data.student;
      setReviewerName(reviewerData.name);
    }

    setGrade(result.grade);
    setGradingStatus(result.gradingStatus);
    return result;
  };

  return (
    <>
      <Layout>
        <div className="md:px-32 py-8 w-full">
          <div className="shadow overflow-hidden rounded border-b border-gray-800">
            <table className="min-w-full">
              <tbody className="text-gray-700">
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Challenge
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {data.name}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Student
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {student.name}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Google Drive Url
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {data.googleDriveFolder}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Grading Status
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {gradingStatus == "" || gradingStatus == null
                      ? "UNSUBMITTED"
                      : gradingStatus}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Grade
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {grade <= 4 && grade && (
                      <span className="p-1 bg-green-600">Grade Passed</span>
                    )}
                    {grade > 4 && (
                      <span className="p-1 bg-red-600">Grade Failed</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Reviewer
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    {reviewerName}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4 font-bold bg-gray-800 text-white">
                    Set Grade
                  </td>
                  <td className="w-2/3 text-left py-3 px-4 bg-white">
                    <select
                      id="cars"
                      name="cars"
                      className="p-1 rounded-sm"
                      onChange={(e) => setGradeAPI(Number(e.target.value))}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StudentDetails;
