import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Register successfull. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center : ">
      <form
        onSubmit={registerUser}
        className="flex flex-col : w-96 p-5 : bg-white rounded border : gap-y-2 text-gray-500"
      >
        <label className="font-bold text-purple-700" htmlFor="">
          Username
        </label>
        <input
          type="text"
          placeholder=""
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-transparent border : p-1.5 ps-4 : focus:outline-none"
        />
        <label className="font-bold text-purple-700" htmlFor="">
          Email
        </label>
        <input
          type="email"
          placeholder=""
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="bg-transparent border : p-1.5 ps-4 : focus:outline-none"
        />
        <label className="font-bold text-purple-700" htmlFor="">
          Password
        </label>
        <input
          type="password"
          placeholder=""
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="bg-transparent border : p-1.5 ps-4 : focus:outline-none"
        />
        <button
          className="bg-purple-700 text-white p-2 rounded mt-4 hover:scale-105 transition-all"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
