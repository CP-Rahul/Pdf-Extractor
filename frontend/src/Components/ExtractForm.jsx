import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { errorHandler } from "../utils/error-utility";

function ExtractForm(props) {
  const [fileName, setFileName] = useState("");
  const pdf = props.pdf;
  const pages = props.pages;
  const token = localStorage.getItem("jwtToken");

  async function formHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("pages", pages);
    formData.append("fileName", fileName);
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
      console.log("Upload successful:", result);
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="fileName"
          placeholder="filename"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExtractForm;
