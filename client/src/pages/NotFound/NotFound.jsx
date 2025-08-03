import { useEffect } from "react";
import "./NotFound.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found | InStock";
  }, []);

  return (
    <div className="not-found">
      <h2 className="not-found__subheading">Uh-Oh...</h2>
      <p className="not-found__content">
        The page you are looking for may have been moved, deleted or possible
        never existed.
      </p>
      <h1 className="not-found__heading">404</h1>
    </div>
  );
};

export default NotFound;
