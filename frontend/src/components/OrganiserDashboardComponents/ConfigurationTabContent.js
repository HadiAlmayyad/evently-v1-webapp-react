import React from 'react';
import { Form, Button, Tabs, Tab, Container } from 'react-bootstrap';

export default function ConfigurationTabContent() {
  // Print Report Handlers
  const generateReport = () => {
    console.log("Generating report...");
    // Here, you can generate a PDF, download it, or simply show a preview.
  };

  return (
    <Container>
        <Tabs defaultActiveKey="reports" id="organiser-settings-tabs" className="mb-3 ev-tabs">
                {/* Reports Section */}
        <Tab eventKey="reports" title="Reports">
            <Form className="mt-4">
            {/* Generate Report */}
            <Button variant="success" onClick={generateReport} size="lg">
                Print Report
            </Button>
            </Form>
        </Tab>
        </Tabs>
    </Container>
  );
}