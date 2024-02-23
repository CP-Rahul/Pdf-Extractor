import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
import ExtractForm from "./ExtractForm";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const params = useParams();

  useEffect(() => {
    setPdfUrl(`http://localhost:3000/public/temp/${params.id}`);
  }, [params.id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  };

  const handleCheckboxChange = () => {
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(pageNumber)) {
        return prevSelectedPages.filter(
          (selectedPage) => selectedPage !== pageNumber
        );
      } else {
        return [...prevSelectedPages, pageNumber];
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen my-5">
      <div
        className="border border-gray-300 overflow-y-scroll no-scrollbar"
        style={{ height: "600px", minWidth: "600px" }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-3 mt-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedPages.includes(pageNumber)}
            onChange={handleCheckboxChange}
          />
          Page {pageNumber}
        </label>
      </div>
      <div className="flex justify-center gap-x-14 w-1/2 my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            pageNumber <= 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <ExtractForm pdf={params.id} pages={selectedPages} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            pageNumber >= numPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
}
