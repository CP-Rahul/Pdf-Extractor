import axios from "axios";
import { useState } from "react"
import { backendUrl } from "../utils/constants";
import { errorHandler } from "../utils/error-utility";
import { saveToken } from "../utils/token";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();
        try {
            const token = await axios.post(`${backendUrl}/user/signin`, {
                email: email,
                password: password
            });
            saveToken(token.data.data);
            navigate('/home')
        } catch (error) {
            errorHandler(error);
        }
    }
    return(
        <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={loginHandler}
          className="flex flex-col w-full max-w-sm gap-4 md:max-w-md"
        >
          <input
            className="outline-none w-full p-4 border border-slate-400"
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="outline-none w-full p-4 border border-slate-400"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border p-2 bg-blue-500 text-white rounded-lg"
            type="submit"
          >
            Login
          </button>
          <div className="text-center">
          <Link to="/register">
            <p>Don't have an account?</p>
          </Link>
        </div>
        </form>
      </div>
    )
}