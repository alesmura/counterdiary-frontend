import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import CounterTypeModal from './CounterTypeModal'

class CustomizeCountersComponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counterTypeList: [],
            counterTypeDetail: null,
            showModal: false
        }
    }

    componentDidMount() {
        this.readData()
    }

    readData() {
        axios.get('http://localhost:7889/counterDiary/api/counterType/get')
            .then(response => {
                this.setState({ counterTypeList: response.data })
                console.log(`Read counter type ${response.status}`)
            })
            .catch(error => console.log(error))
    }

    addHandler() {
        let maxSeq = Math.max.apply(Math, this.state.counterTypeList.map(function (ct) { return ct.seq }))
        if (maxSeq < 0)
            maxSeq = 0;
        const ctDTO = { seq: maxSeq + 1, name: "", description: "" }
        this.setState({ counterTypeDetail: ctDTO, showModal: true })
    }

    editHandler(idx) {
        const ctDTO = this.state.counterTypeList[idx]
        this.setState({ counterTypeDetail: ctDTO, showModal: true })
    }

    closeHandler() {
        this.setState({ counterTypeDetail: null, showModal: false })
        this.readData()
    }

    deleteHandler(idx) {
        const ctDTO = this.state.counterTypeList[idx]
        axios.delete(`http://localhost:7889/counterDiary/api/counterType/delete/${ctDTO.id}`)
            .then(response => {
                console.log(`Delete counter type ${response.status}`)
                this.readData()
            })
            .catch(error => console.log(error))
    }

    render() {
        const counterTypeList = this.state.counterTypeList
        return (
            <div>
                {this.state.showModal && <CounterTypeModal closeHandler={() => this.closeHandler()} counterTypeDetail={this.state.counterTypeDetail} />}
                <Table striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th />
                            <th>Sequence</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ctModal"
                                    onClick={() => this.addHandler()}>Add</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {counterTypeList.map((ct, index) =>
                        (
                            <tr key={ct.id}>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={() => this.deleteHandler(index)}>Delete</button>
                                </td>
                                <td>{ct.seq}</td>
                                <td>{ct.name}</td>
                                <td>{ct.description}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ctModal"
                                        onClick={() => this.editHandler(index)}>Edit</button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default CustomizeCountersComponents