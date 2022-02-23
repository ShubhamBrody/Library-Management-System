import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <Button
              onClick={(e) => {
                navigate("/", { replace: true });
              }}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PageNotFound;
