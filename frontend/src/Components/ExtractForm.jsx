import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { errorHandler } from "../utils/error-utility";
import { useNavigate } from "react-router-dom";

function ExtractForm(props) {
  const [fileName, setFileName] = useState("");
  const pdf = props.pdf;
  const pages = props.pages;
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  async function formHandler(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${backendUrl}file/merge`,
        { pdf, pages, fileName },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      );
      navigate("/home");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div>
      <form onSubmit={formHandler} className="flex">
        <input
          type="text"
          name="fileName"
          placeholder="filename"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border-2 outline-none font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
        />
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ExtractForm;
