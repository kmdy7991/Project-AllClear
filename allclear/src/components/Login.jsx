import { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../stores/atoms";
import { useNavigate } from "react-router-dom";
import allclear from "../assets/allclear.png";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const setIsLoggedIn = () => setIsLoggedInAtom((prev) => !prev);
  const navigate = useNavigate();

  const login = (e) => {
    setIsLoggedIn();
    navigate("/dashboard");
    e.preventDefault();
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo src={allclear} />
        <InputForm onSubmit={login}>
          <IdInput
            type="text"
            value={id}
            onChange={handleIdChange}
            placeholder="아이디"
          />
          <PasswordInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <LoginButton>로그인</LoginButton>
        </InputForm>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 35%;
  background-color: #384351;
  border-radius: 10px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 80%;
  object-fit: contain;
  margin: 10px 0;
`;

const IdInput = styled.input`
  width: 80%;
  height: 35px;
  border: 0;
  border-radius: 5px;
  outline: none;
  margin: 10px 0;
  padding-left: 8px;
  font-size: 14px;
  color: #121212;
`;

const PasswordInput = styled.input`
  width: 80%;
  height: 35px;
  border: 0;
  border-radius: 5px;
  outline: none;
  margin: 10px 0;
  padding-left: 8px;
  font-size: 14px;
  color: #121212;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  width: 22%;
  height: 35px;
  background-color: #20ade4;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export default Login;
