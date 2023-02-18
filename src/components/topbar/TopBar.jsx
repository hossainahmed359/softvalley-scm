import React, { useState } from "react";
import "./TopBar.css";
import UserProfileSettings from "./dropdown/UserProfileSettings";
import listIcon from "../../assets/images/icons/list.svg";

const initialState = {
  language: false,
  emails: false,
  notifications: false,
  userProfile: false,
};

const TopBar = ({ enlargeMenu, setEnlargeMenu }) => {
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (itemKey) => {
    isClicked[itemKey]
      ? setIsClicked({ ...initialState, [itemKey]: false })
      : setIsClicked({ ...initialState, [itemKey]: true });
  };

  return (
    <div className="topbar">
      {/* Navbar */}
      <nav
        style={{ marginLeft: `${enlargeMenu ? "250px" : "0"}` }}
        className="navbar-custom"
        id="navbar-custom"
      >
        <ul className="list-unstyled topbar-nav mb-0 mx-3 mt-2">
          <li>
            <button
              onClick={() => setEnlargeMenu((prev) => !prev)}
              style={{ background: "rgba(0, 0, 0, 0.05)" }}
              className=" btn p-2 rounded-circle nav-link button-menu-mobile nav-icon d-flex justify-content-center align-items-center"
              id="togglemenu"
            >
              <img height={20} src={listIcon} />
            </button>
          </li>
        </ul>
        <ul className="list-unstyled topbar-nav">
          <UserProfileSettings
            id={"userProfile"}
            isClicked={isClicked}
            handleClick={handleClick}
          />
        </ul>
        {/*end topbar-nav*/}
      </nav>
      {/* end navbar*/}
    </div>
  );
};

export default TopBar;
