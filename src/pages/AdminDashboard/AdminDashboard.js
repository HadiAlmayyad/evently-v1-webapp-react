import React from "react"
import './AdminDashboard.css';
import { Container, Tabs, Tab } from "react-bootstrap";
import EventsTabContent from "../../components/AdminDashboardComponents/EventsTabContent";
import UsersTabContent from "../../components/AdminDashboardComponents/UsersTabContent";
import SettingsTabContent from "../../components/AdminDashboardComponents/SettingsTabContent";
import NavbarComponent from "../../components/AdminDashboardComponents/NavbarComponent";


function AdminDashboard() { 

    return (

        <div className="dashboard-page">

            <NavbarComponent activePage="dashboard" userRole="Admin"/>  
            
            <Container expand="md" className='mt-5'>
                <Tabs
                    defaultActiveKey="events"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="events" title="Events">
                        <EventsTabContent />
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <UsersTabContent />
                    </Tab>
                    <Tab eventKey="settings" title="Settings">
                        <SettingsTabContent />
                    </Tab>

                </Tabs>
            </Container>

        </div>


    )
}

export default AdminDashboard;