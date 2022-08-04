import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const error = null;
  const navigate = useNavigate();
  return (
    <div>
      <div>{error}</div>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}

export default ErrorComponent;