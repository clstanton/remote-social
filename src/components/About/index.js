import React from 'react';
import { Form, Button } from 'react-bootstrap';
//import coverImage from "../../assets/cover/cover-image.jpg";

function About() {
  return (
    <section className="my-5 homepage">
        <div className="home-container">
          <p className="display-4 home-text">Keep Track of Movies Your Way.</p>
          <Form.Group>
              <Form.Control size="lg" type="text" placeholder="The Dark Knight" />
              <Button type="submit" size="lg" className="search-btn">Search</Button>
          </Form.Group>
        </div>
    </section>
  );
}

export default About;