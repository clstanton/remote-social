import React from 'react';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';

function About() {
  return (
    <section className="my-5 homepage">
        <div className="home-container">

          <p className="display-4 home-text">Keep Track of Movies Your Way.</p>

          <div className="home-input">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="The Dark Knight"
                aria-label="Movie Search Button"
                aria-describedby="basic-addon2"
              />
            </InputGroup>

            <InputGroup>
                <Button variant="outline-danger" className="search-btn">Search</Button>
            </InputGroup>
          </div>
        </div>
    </section>
  );
}

export default About;