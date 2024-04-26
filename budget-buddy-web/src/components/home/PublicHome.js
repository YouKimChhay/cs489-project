import sampleDashboard from '../../assets/images/sample-dashboard.png';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function PublicHome() {

    return (
        <div style={{padding: 30}}>
            <h1>Welcome to Budget Buddy!</h1>
            <p>Your buddy for managing your budget!</p>
            <hr/>
            <div className={'d-flex flex-wrap justify-content-around align-items-center'}>
                <div id={'hero'}>
                    <p>
                        Your <span style={{fontWeight: 'bold'}}>centralized financial</span> tracking system that
                        offers an intuitive <span style={{fontWeight: 'bold'}}>insight dashboard</span> consolidating
                        key financial metrics to <span style={{fontWeight: 'bold'}}> empower you</span> to
                        optimize your financial health and <span style={{fontWeight: 'bold'}}>achieve your goals</span>.
                    </p>
                </div>
                <img src={sampleDashboard} style={{height: '400px'}}/>
            </div>
            <hr/>
            <h3 style={{padding: '0.2em 45%'}}>Pricing</h3>
            <div className={'d-flex flex-wrap justify-content-center'}>
                <Card style={{width: '250px', margin: '1em 0'}}>
                    <Card.Header as={'h5'}>Free</Card.Header>
                    <Card.Body>
                        <Card.Title>$0/month</Card.Title>
                        <Card.Text>
                            &#10004; Income tracking<br/>
                            &#10004; Expense management
                        </Card.Text>
                        <Button variant="primary" href={'/register'}>Register</Button>
                    </Card.Body>
                </Card>
                <Card style={{width: '250px', margin: '1em'}}>
                    <Card.Header as={'h4'}>Standard</Card.Header>
                    <Card.Body>
                        <Card.Title>$9.99/month</Card.Title>
                        <Card.Text>
                            &#10004; Basic features<br/>
                            &#10004; Bill management<br/>
                            &#10004; Saving goals creation<br/>
                            &#10004; Basic analytics
                        </Card.Text>
                        <Button variant="success" href={'/register'}>Buy Now</Button>
                    </Card.Body>
                </Card>
                <Card style={{width: '250px', margin: '1em 0'}}>
                    <Card.Header as={'h5'}>Pro</Card.Header>
                    <Card.Body>
                        <Card.Title>$99/year</Card.Title>
                        <Card.Text>
                            &#10004; Standard features<br/>
                            &#10004; Insightful analytics
                        </Card.Text>
                        <Button variant="danger" href="mailto:youkim.chhay@outlook.com">Contact Us</Button>
                    </Card.Body>
                </Card>
            </div>
            <hr/>
            <footer className={"text-center"}>
                <p>&copy; 2024 Budget Buddy</p>
            </footer>
        </div>
    );
}