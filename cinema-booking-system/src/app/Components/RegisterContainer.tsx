import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const RegisterContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col md = {6}>
            {children}
            </Col>
        </Row>
        </Container>
    );
}

export default RegisterContainer;