import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { errorHandler } from "../utils/error-utility";

function PdfUploadForm() {
  const [path, setPath] = useState(null);
  const [userId, setUserId] = useState("");
  const [fileName, setFileName] = useState("");

  async function uploadHandler(e) {
    e.preventDefault();
    if(!userId || !path || !fileName) {
      alert("Please fill all fields");
    }
    if(path.type != 'application/pdf') {
      alert("You can only upload pdf");
    }
    const formData = new FormData();
    formData.append("file", path);
    formData.append("userId", userId);
    formData.append("fileName", fileName);

    try {
      await axios.post(`${backendUrl}file`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={uploadHandler}
        className="flex flex-col w-full max-w-sm gap-4 md:max-w-md"
      >
        <input
          className="outline-none w-full p-4 border border-slate-400"
          type="text"
          placeholder="User Id"
          name="userID"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          className="outline-none w-full p-4 border border-slate-400"
          type="text"
          placeholder="File Name"
          name="fileName"
          required
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <input
          className="outline-none w-full p-4 border border-slate-400"
          type="file"
          accept="application/pdf"
          name="file"
          required
          onChange={(e) => setPath(e.target.files[0])}
        ></input>
        <button
          className="border p-2 bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PdfUploadForm;
