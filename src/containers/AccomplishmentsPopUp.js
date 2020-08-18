import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AddAccomplishmentForm from '../components/AddAccomplishmentForm';

class AccomplishmentsPopUp extends React.Component {

    render(){
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
                    <Tab eventKey="add" title="Add New">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add an Accomplishment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddAccomplishmentForm goals={this.props.goals} habits={this.props.habits}/>
                        </Modal.Body>
                    </Tab>
                    <Tab eventKey="view" title="View Progress">
                        <h2>Hello</h2>
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        <h3>Testing</h3>
                    </Tab>
                </Tabs>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AccomplishmentsPopUp