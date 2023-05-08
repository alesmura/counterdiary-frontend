import axios from 'axios'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

class DeleteCounterTypeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counterTypeDetail: props.counterTypeDetail,
            closeDeleteHandler: props.closeDeleteHandler
        }
    }

    handleCancel() {
        this.state.closeDeleteHandler()
    }

    handleConfirm() {
        const ctd = this.state.counterTypeDetail
        axios.delete(`http://localhost:7889/counterDiary/api/counterType/delete/${ctd.id}`)
            .then(response => {
                console.log(`Delete counter type ${response.status}`)
                this.state.closeDeleteHandler()
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Modal show="true" onHide={this.state.closeDeleteHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to delete the counter?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={() => this.handleConfirm()}>Confirm</Button>
                    <Button className="btn btn-primary" onClick={() => this.handleCancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteCounterTypeModal