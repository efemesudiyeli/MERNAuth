import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const { data } = await axios.get("/logout");
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        navigate("/login");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-screen h-16 mb-20 : flex flex-row justify-around items-center : bg-blue-700 : font-bold">
      <div>Logo</div>
      <ul className="flex gap-10">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div className="flex gap-2">
        {isLoggedIn && (
          <Link to="/dashboard" onClick={logoutUser}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}
