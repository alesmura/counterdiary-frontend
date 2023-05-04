import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

class CounterTypeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counterTypeDetail: props.counterTypeDetail,
            closeHandler: props.closeHandler
        }
        this.inputRef = React.createRef()
    }

    handleNameChange = event => {
        let ctd = this.state.counterTypeDetail
        ctd.name = event.target.value;
        this.setState({ counterTypeDetail: ctd })
    }

    handleDescriptionChange = event => {
        let ctd = this.state.counterTypeDetail
        ctd.description = event.target.value;
        this.setState({ counterTypeDetail: ctd })
    }

    handleSubmit = event => {
        const ctd = this.state.counterTypeDetail
        axios.post('http://localhost:7889/counterDiary/api/counterType/post', ctd)
            .then(response => {
                console.log(`Post counter type ${response.status}`)
                this.state.closeHandler()
            })
            .catch(error => console.log(error))

        event.preventDefault()
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    render() {
        const ctd = this.state.counterTypeDetail
        const closeHandler = this.state.closeHandler;
        let mexHeader = "Create counter"
        if (ctd.id > 0)
            mexHeader = `Edit counter ${ctd.id}`
        return (
            <Modal show="true" onHide={closeHandler}>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mexHeader} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Name</label>
                            <input type='text' value={ctd.name} onChange={this.handleNameChange} ref={this.inputRef} />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type='text' value={ctd.description} onChange={this.handleDescriptionChange} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className="btn btn-primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default CounterTypeModal