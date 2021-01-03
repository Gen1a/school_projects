import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Badge from 'react-bootstrap/Badge';

const Home = () => {
    return (
        <div>
            <Jumbotron>
                <Container fluid>
                    <h1>Welkom</h1>
                    <p>Project Webshop is een eindproject waarbij gebruikers de mogelijkheid krijgen om via een basic webshopapplicatie producten 
                        aan hun Winkelwagen of Verlanglijstje toe te voegen. Indien gewenst hebben ze ook de mogelijkheid om deze producten te bestellen,
                        zij het virtueel. De aanwezige producten zijn dan ook enkel ter illustratie en kunnen niet effectief aangekocht worden.
                    </p>
                    <hr/>
                </Container>
            </Jumbotron>
            <Container className="header">
                <h5>Gebruikte technologieën</h5>
                <p>Deze applicatie is volledig gebaseerd op de veelgebruikte MERN-stack. Voor styling werd gebruikt gemaakt van React Bootstrap
                </p>
                <ul className="technologies">
                    <li><Badge variant="success" pill>MongoDB</Badge></li>
                    <li><Badge variant="secondary" pill>Express</Badge></li>
                    <li><Badge variant="primary" pill>React</Badge></li>
                    <li><Badge variant="success" pill>NodeJS</Badge></li>
                    <li><Badge variant="info" pill>React Bootstrap</Badge></li>
                </ul>
                <hr/>
            </Container>
            <Container className="my-4">
                <h5>Github Repository</h5>
                <p>De Github repository voor dit project is {' '}
                    <a href="https://github.com/Gen1a/School_Projects/tree/project-webshop/Web/Project_Webshop" target="_blank" rel="noreferrer">hier</a>
                    {' '}terug te vinden.</p>
            </Container>
        </div>
    )
};

export default Home;