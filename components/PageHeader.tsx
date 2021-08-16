import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PageHeader: React.FC = () => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <header id="header">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-300 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
              <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                <Link href="/">Playground</Link>
              </div>
              <button
                className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
              >
                <span className="block relative w-6 h-px rounded-sm bg-white" />
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
              </button>
            </div>
            <div
              className="lg:flex flex-grow items-center"
              id="example-navbar-warning"
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <div
                    className={
                      router.pathname == "/student" ? `active` : `defaultLink`
                    }
                  >
                    <Link href="student">Student</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={
                      router.pathname == "/challenge" ? `active` : `defaultLink`
                    }
                  >
                    <Link href="challenge">Challenge</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={
                      router.pathname == "/settings" ? `active` : `defaultLink`
                    }
                  >
                    <Link href="settings">Settings</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <style jsx>
        {`
          .linkNavbar {
            @apply px-3 flex justify-center;
          }
          white {
            color: white;
          }
          bg-dark {
            background-color: black !important;
          }
          .navbar li {
            margin-right: 30px;
          }
        `}
      </style>
    </>
  );
};

export default PageHeader;
