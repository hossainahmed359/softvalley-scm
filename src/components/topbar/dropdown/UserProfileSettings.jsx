import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import user_avatar from "../../../assets/images/users/user-1.webp";
import { LOGIN_PATH } from "../../../constants/routes";
import useAuth from "../../../hooks/useAuth";
import "./userProfileSettings.css";
// import { useOutsideClickAlerter } from '../../../hooks/useOutsideClickAlerter';

const UserProfileSettings = ({ id, isClicked, handleClick }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut();
    navigate(LOGIN_PATH);
  };
  const dropdownRef = useRef();
  // useOutsideClickAlerter(dropdownRef, () => handleClick(id), []);

  return (
    <li className="dropdown">
      <span
        className="nav-link dropdown-toggle nav-user d-flex justify-content-center align-items-center mx-lg-4"
        href="#"
        role="button"
        onClick={() => handleClick(id)}
      >
        <div className="d-flex justify-content-center align-items-center py-2 ">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={user_avatar}
              alt="profile-user"
              className="rounded-circle"
              style={{
                border: "1px solid rgba(0, 0,0 , 0.5)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="ms-2 ">
            <small className="d-none d-md-block " style={{fontSize: '12px'}}>Admin</small>
            <p className="pb-0 mb-0" style={{fontSize: '13px'}}>User Name</p>
          </div>
        </div>
      </span>
      <div
        onClick={(e) => e.stopPropagation()}
        ref={dropdownRef}
        className={`dropdown-menu dropdown-menu-end ${
          isClicked[id] ? "show" : ""
        }`}
      >
        <a className="dropdown-item" href="#profile">
          <i className="ti ti-user font-16 me-1 align-text-bottom" /> Profile
        </a>
        <a className="dropdown-item" href="#settings">
          <i className="ti ti-settings font-16 me-1 align-text-bottom" />{" "}
          Settings
        </a>
        <div className="dropdown-divider mb-0" />
        <button
          type="button"
          onClick={handleLogOut}
          className="dropdown-item"
          href="#logout"
        >
          <i className="ti ti-power font-16 me-1 align-text-bottom" /> Logout
        </button>
      </div>
    </li>
  );
};

export default UserProfileSettings;
