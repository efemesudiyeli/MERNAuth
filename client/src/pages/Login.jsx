import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
export default function Login() {
  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={loginUser}
        className="flex flex-col : w-96 p-5 : bg-white rounded border : gap-y-2 text-gray-500"
      >
        <label className="font-bold text-purple-700" htmlFor="">
          Email
        </label>
        <input
          type="email"
          placeholder="enter email..."
          autoComplete="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="bg-transparent border : p-1.5 ps-4 : focus:outline-none"
        />
        <label className="font-bold text-purple-700" htmlFor="">
          Password
        </label>
        <input
          type="password"
          placeholder="enter password..."
          autoComplete="current-password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="bg-transparent border : p-1.5 ps-4 : focus:outline-none"
        />
        <button
          className="bg-purple-700 text-white p-2 rounded mt-4 hover:scale-105 transition-all"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
