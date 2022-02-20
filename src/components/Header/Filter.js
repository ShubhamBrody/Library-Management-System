import {
  Container,
  ToggleButtonGroup,
  Button,
  Form,
  Collapse,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";

function Filter({ list, filterset }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(["All"]);

  const filterchanger = () => {
    var strfilter = value.join("&");
    filterset(strfilter);
  }

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
      <Collapse in={open}>
        <div id="collapse-text">
          <br></br>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              filterchanger();
            }}
          >
            {window.innerWidth >= 768 ? (
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                onChange={handleChange}
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
            ) : (
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                onChange={handleChange}
                vertical
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
            )}
            <br></br>
            <br></br>
            <Button variant="success" type="submit">
              Search
            </Button>
          </Form>
        </div>
      </Collapse>
    </Container>
  );
}

export default Filter;
