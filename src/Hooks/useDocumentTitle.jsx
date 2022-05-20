import { useEffect } from "react";

const useDocumentTitle = (title = "Not Found", deps = []) => {
  useEffect(() => (document.title = `${title} | Noted.io`), [...deps]);
};

export default useDocumentTitle;
