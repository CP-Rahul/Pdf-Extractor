import PdfList from "./PdfList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="m-4 p-4 flex justify-end">
        <Link to="/upload">
          <button className="text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
            New Pdf
          </button>
        </Link>
      </div>
      <PdfList />
    </div>
  );
}
