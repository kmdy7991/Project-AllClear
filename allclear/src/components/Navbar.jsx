import { useState } from "react";
import "../styles/Navbar.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../stores/atoms";

function Navbar() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const setIsLoggedIn = () => setIsLoggedInAtom((prev) => !prev);

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">LOGO</div>
        {!isLoggedIn ? (
          <div className="navbar">
            <div className="login-logout-button" onClick={setIsLoggedIn}>
              로그인
            </div>
          </div>
        ) : (
          <div className="navbar">
            <div style={{ fontWeight: 600 }}>Super Admin</div>
            <div className="login-logout-button" onClick={setIsLoggedIn}>
              로그아웃
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
