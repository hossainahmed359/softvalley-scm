import React from "react";
import "./Sidebar.css";
// import profileAvatar from "../../assets/images/icons/person.svg";

export const profileAvatar = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6ZM8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z"
      fill="white"
    />
    <path
      d="M12 11C12 12 11 12 11 12H1C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11ZM11 10.9965C10.9986 10.7497 10.8462 10.0104 10.1679 9.33211C9.51563 8.67985 8.2891 8 5.99999 8C3.71088 8 2.48435 8.67985 1.8321 9.33211C1.15375 10.0104 1.00142 10.7497 1 10.9965H11Z"
      fill="white"
    />
  </svg>
);

const Sidebar = ({ setEnlargeMenu, enlargeMenu }) => {
  return (
    <div
      className={`sidebar ${!enlargeMenu ? "d-none" : "d-block"}`}
      style={{
        position: "fixed",
        top: "0",
        left: 0,
        width: "250px",
        height: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #eceff5",
      }}
    >
      <div className="d-flex flex-column">
        <div
          className=""
          style={{ height: "77px", borderBottom: "1px solid #eceff5" }}
        >
          <h4 className="pt-4 ps-3 font-roboto text-primary" style={{letterSpacing: '1px'}}>
            <i>SOFTVALLEY SCM</i>
          </h4>
        </div>
        <ul className="list-unstyled">
          <li className="bg-primary ps-3 d-flex align-items-center gap-2" style={{height: '50px'}}>
            <span className="pb-1">{profileAvatar}</span>
            <a
              href="#"
              style={{
                fontSize: "16px",
                textDecoration: "none",
                fontWeight: "500",
                color: "#fff",

              }}
            >
              Leads
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
