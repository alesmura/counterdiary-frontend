import React, { Component } from 'react';
import DiaryComponent from './DiaryComponent';
import CustomizeCountersComponents from './CustomizeCountersComponents';
import StatsComponents from './StatsComponents';
import { Button, Container, Nav } from 'react-bootstrap';

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
    }

    render() {
        const links = this.state.links
        const linkList = links.map(link => (
            <li className="nav-item" key={link.id}>
                <Button className={`nav-link btn btn-link ${link.id === this.state.activeLink ? 'active' : ''}`}
                    onClick={() => this.clickHandler(link.id)}>{link.linkName}</Button>
            </li >
        ))
        const component = links.filter(link => link.id === this.state.activeLink).map(link => link.component);
        return (
            <>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                    <Container>
                        <Button className="navbar-brand btn btn-link"
                            onClick={() => this.clickHandler(this.state.links[0].id)}>COUNTER DIARY</Button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {linkList}
                            </ul>
                        </div>
                    </Container>
                </Nav>
                <Container>
                    {component}
                </Container>
            </>
        );
    }
}

export default NavigationComponent;