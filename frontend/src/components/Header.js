import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const user = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  const logout = () => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      localStorage.removeItem("userInfo");
      navigate("/");
    }
  };
  return (
    <div className="header">
      <Link to="/" title="home page">
        <img
          className="header__icon"
          src="http://assets.limetray.com/assets/loyalty/production/1648037756_1647263712VooshLogo1.png"
          alt="Voosh Logo"
        />
      </Link>

      <div className="innerSpan">
        {user ? (
          <>
            <span>
              <Link to="/updateUser" title="update_user">
                Update_user
              </Link>
            </span>
            <span onClick={() => logout()}> Logout </span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
