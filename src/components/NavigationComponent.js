import React, { Component } from 'react';
import DiaryComponent from './DiaryComponent';
import CustomizeCountersComponents from './CustomizeCountersComponents';
import StatsComponents from './StatsComponents';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

class NavigationComponent extends Component {

    constructor() {
        super();
        this.state = {
            activeLink: 1,
            links: [
                {
                    id: 1,
                    linkName: 'Diary',
                    component: <DiaryComponent />
                },
                {
                    id: 2,
                    linkName: 'Customize counters',
                    component: <CustomizeCountersComponents />
                },
                {
                    id: 3,
                    linkName: 'Stats',
                    component: <StatsComponents />
                },
            ]
        };
    }

    clickHandler(idLink) {
        this.setState({ activeLink: idLink })
        let obj = document.getElementById("idToggler");
        if (obj.className.indexOf("collapsed") === -1)
            obj.click()
    }

    render() {
        const links = this.state.links
        const linkList = links.map(link => (
            <NavDropdown.Item key={link.id} className={`nav-item nav-link btn btn-link ${link.id === this.state.activeLink ? 'active' : ''}`}
                onClick={() => this.clickHandler(link.id)}>
                {link.linkName}
            </NavDropdown.Item>
        ))
        const component = links.filter(link => link.id === this.state.activeLink).map(link => link.component);
        return (
            <>
                <Navbar className="navbar-dark bg-primary mb-5" expand="lg">
                    <Container>
                        <Navbar.Brand onClick={() => this.clickHandler(this.state.links[0].id)}>COUNTER DIARY</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" id="idToggler" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {linkList}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    {component}
                </Container>
            </>
        );
    }
}

export default NavigationComponent;