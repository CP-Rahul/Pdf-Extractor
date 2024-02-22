import axios from "axios";
import { useState } from "react"
import { backendUrl } from "../utils/constants";
import { errorHandler } from "../utils/error-utility";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerHandler(e) {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}/user/signup`, {
                email: email,
                password: password
            });
        } catch (error) {
            errorHandler(error)
        }
    }
    return(
        <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={registerHandler}
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
            Register
          </button>
        </form>
      </div>
    )
}