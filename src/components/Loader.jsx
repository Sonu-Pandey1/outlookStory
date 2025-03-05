import { CircularProgress } from "@mui/material";
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-relative">
        <CircularProgress size={50} thickness={3} />
        <div className="position-absolute top-50 start-50 translate-middle text-secondary fw-lighter">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;
