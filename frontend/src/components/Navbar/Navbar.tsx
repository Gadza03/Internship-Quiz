import c from "./navbar.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts";
import { paths } from "@/router/paths";
import { AvatarMenu } from "./AvatarMenu";

export const Navbar = () => {
  const [searchParam, setSearchParam] = useState<string>("");
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(paths.login);
  };

  const handleRegisterClick = () => {
    navigate(paths.register);
  };

  const handleReset = () => {
    setSearchParam("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/?search=${searchParam}`);
  };

  return (
    <nav className={c.navigation}>
      <div className={c.logo} onClick={() => navigate(paths.home)}>
        <h3>Dump Quiz</h3>
      </div>
      <div className={`${c.searchAndAvatar} ${user?.role ? c.loggedIn : ""}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchParam}
            onChange={handleChange}
            placeholder="Search quizzes"
            className={c.searchInput}
          />
          <button type="submit" className={c.searchBtn}>
            Search
          </button>
          <button className={c.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </form>
        {user ? (
          <AvatarMenu />
        ) : (
          <div className={c.authBtns}>
            <button className={c.loginBtn} onClick={handleLoginClick}>
              Log in
            </button>
            <button className={c.registerBtn} onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
