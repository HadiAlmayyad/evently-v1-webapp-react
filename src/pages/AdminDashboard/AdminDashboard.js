import React from "react"
import './AdminDashboard.css';
import { Container, Tabs, Tab } from "react-bootstrap";
import EventsTabContent from "../../components/AdminDashboardComponents/EventsTabContent";
import UsersTabContent from "../../components/AdminDashboardComponents/UsersTabContent";
import ConfiguratoinTabContent from "../../components/AdminDashboardComponents/ConfigurationTabContent";
import NavbarComponent from "../../components/AdminDashboardComponents/NavbarComponent";


function AdminDashboard() { 

    return (

        <div className="dashboard-page">

            <NavbarComponent activePage="dashboard" userRole="Admin"/>  
            
            <Container expand="md" className='mt-5'>
                <Tabs
                    defaultActiveKey="events"
                    className="mb-3 ev-tabs"
                    fill
                >
                    <Tab eventKey="events" title="Events">
                        <EventsTabContent />
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <UsersTabContent />
                    </Tab>
                    <Tab eventKey="configuration" title="Configuration">
                        <ConfiguratoinTabContent />
                    </Tab>

                </Tabs>
            </Container>

        </div>


    )
}

export default AdminDashboard;