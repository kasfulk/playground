import * as React from "react";
import Link from "next/link";
import { Challenge } from "types/challenge.interface";

// const url: string = process.env.API_URL;

const ChallengeCard: React.FC<{ data: Challenge[] }> = ({
  data,
}): JSX.Element => {
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
                <div className="grid grid-cols-1 gap-2 place-content-between w-full">
                  <p className="mb-0 text-xs font-bold text-gray-900">
                    <Link href={"/challenge/" + data.id}>{data.name}</Link>
                  </p>
                  <p className="text-xs font-normal text-gray-800">
                    {!data.grade && !data.gradingStatus && (
                      <h1 className="bg-gray-500 text-white w-2/4 text-center p-1 rounded-sm">
                        Not Rated
                      </h1>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChallengeCard;
