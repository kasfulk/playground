import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Student } from "types/student.interface";

const StudentCard: React.FC<{ data: Student[]; idReviewer: string }> = ({
  data,
  idReviewer,
}): JSX.Element => {
  const [reviewerId, setReviewerId] = useState(idReviewer);

  useEffect(() => {
    getReviewer();
  }, []);

  const getReviewer = async (): Promise<any> => {
    const { data } = await axios.get("http://localhost:3000/api/reviewer");
    setReviewerId(data.idReviewer);
  };

  const setReviewer = async (id: string): Promise<any> => {
    const body = {
      idReviewer: id,
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/reviewer",
      body
    );
    setReviewerId(data.idReviewer);
  };

  return (
    <>
      <div className="grid gap-6 mb-8 mt-5 md:grid-cols-4 h-1/2 w-full lg:grid-cols-3">
        {data.map((data) => {
          return (
            <div
              className="flex w-full h-full p-3 bg-white rounded-lg shadow-sm"
              key={data.id}
            >
              <div className="flex h-16 w-2/3 align-middle">
                <div className="p-3 mr-4 h-12 w-12 bg-blue-400 text-white rounded-full flex">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="mb-0 text-base font-medium text-gray-900">
                    {data.name}
                  </p>
                  <p className="text-xs font-normal text-gray-800">
                    {data.email}
                  </p>
                </div>
              </div>
              <div className="text-black justify-end text-xs h-full w-1/3 text-right">
                {data.id != reviewerId && (
                  <button
                    type="button"
                    onClick={() => {
                      setReviewer(data.id);
                    }}
                    className="bg-green-400 p-1 rounded-sm"
                  >
                    Set As Reviewer
                  </button>
                )}
                {data.id == reviewerId && (
                  <button type="button" className="bg-blue-400 p-1 rounded-sm">
                    This Is Reviewer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentCard;
