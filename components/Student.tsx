export const Student = (): JSX.Element => (
  <>
    <div className="grid gap-6 mb-8 mt-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex w-full items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="p-3 mr-4 bg-blue-400 text-white rounded-full">
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
            Kasful Kurniawan
          </p>
          <p className="text-xs font-normal text-gray-800">kasfulk@gmail.com</p>
        </div>
      </div>
    </div>
  </>
);

export default Student;
