import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import TopBar from "../topbar/TopBar";

const DashboardLayout = ({ children }) => {
  const [enlargeMenu, setEnlargeMenu] = useState(true);
  return (
    <div id="body">
      <div className={`dark-sidebar`}>
        <TopBar setEnlargeMenu={setEnlargeMenu} enlargeMenu={enlargeMenu} />
        <Sidebar setEnlargeMenu={setEnlargeMenu} enlargeMenu={enlargeMenu} />
        <div className="page-wrapper w-100 ">
          <div
            className="page-content-tab"
            style={{
              marginTop: "75px",
              marginLeft: `${enlargeMenu ? "250px" : ""}`,
            }}
          >
            <div className="container-fluid py-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
