import React from "react"
import './OrganiserDashboard.css';
import { Container, Tabs, Tab } from "react-bootstrap";
import EventsTabContent from "../../components/OrganiserDashboardComponents/EventsTabContent";
import ConfiguratoinTabContent from "../../components/OrganiserDashboardComponents/ConfigurationTabContent";
import Navbar from "../../components/Navbar";
import FooterEv from "../../components/FooterEv";


function OrganiserDashboard() { 

    return (

        <div className="dashboard-page">

            {/* <NavbarComponent activePage="dashboard" userRole="Admin"/>   */}
            <Navbar showLogout={true} />

            <Container expand="md" className='pt-5 mt-5 mb-5'>
                <Tabs
                    defaultActiveKey="events"
                    className="mb-3 ev-tabs"
                    fill
                >
                    <Tab eventKey="events" title="Events">
                        <EventsTabContent />
                    </Tab>
                    <Tab eventKey="reports-and-analytics" title="Reports & Analytics">
                        <ConfiguratoinTabContent />
                    </Tab>
                </Tabs>

            </Container>
            <FooterEv />

        </div>


    )
}

export default OrganiserDashboard;