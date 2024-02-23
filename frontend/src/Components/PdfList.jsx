import axios from "axios";
import { backendUrl } from "../utils/constants";
import { useState, useEffect } from "react";
import { errorHandler } from "../utils/error-utility";

export default function PdfList() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("jwtToken");

  async function getPdfs() {
    try {
      const response = await axios.get(`${backendUrl}/file`, {
        headers: { "x-access-token": token },
      });
      setFiles(response.data.data);
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    getPdfs();
  }, []);

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-full max-w-md">
        {files.map((pdf) => (
          <div
            key={pdf.id}
            className="border rounded-lg p-2 hover:bg-gray-50 transition duration-300 mb-4 flex justify-between"
          >
            <div className="text-xl font-semibold mb-2 p-2">{pdf.fileName}</div>
            <div className="text-sm text-gray-600 p-2">{pdf.updatedAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
