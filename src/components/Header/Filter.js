import {
  Container,
  ToggleButtonGroup,
  Button,
  Form,
  Collapse,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";

function Filter({ list, filterset, postsPerPage }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(["All"]);

  const filterchanger = () => {
    var strfilter = value.join("&");
    filterset(strfilter);
  };

  const handleChange = (val) => {
    setValue((prevval) => {
      if (prevval.includes("All") && val.includes("All") && val.length > 1)
        return val.filter(function (value, index, arr) {
          return value !== "All";
        });
      if (val.includes("All")) return ["All"];
      else return val;
    });
  };
  return (
    <Container style={{ margin: "2% auto" }}>
      <Button
        style={{ position: "relative", left: "35%", width: "30%" }}
        onClick={() => setOpen(!open)}
        aria-controls="collapse-text"
        aria-expanded={open}
      >
        Filter
      </Button>
      <Collapse in={open} style={{}}>
        <Row id="collapse-text" className="mt-3">
          <Col md>
            <br></br>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                filterchanger();
              }}
            >
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                onChange={handleChange}
                className="flex-wrap"
              >
                {" "}
                {list.map((item, idx) => {
                  var newid = "tbg-btn-" + idx;
                  return (
                    <ToggleButton
                      style={{ focus: { boxShadow: "none" } }}
                      id={newid}
                      variant="outline-primary"
                      value={item}
                    >
                      {item}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>

              <br></br>
              <br></br>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Form>
          </Col>
          <Col md>
            <br></br>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Books Per page</Form.Label>
              <Form.Select
                type="text"
                placeholder="Search"
                onChange={(e) => postsPerPage(Number(e.target.value))}
              >
                <option value="10">10/page</option>
                <option value="20">20/page</option>
                <option value="30">30/page</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Collapse>
    </Container>
  );
}

export default Filter;
