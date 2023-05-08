import React, { Component } from 'react'
import axios from 'axios'
import { Button, Table } from 'react-bootstrap'
import CounterTypeModal from './CounterTypeModal'
import DeleteCounterTypeModal from './DeleteCounterTypeModal'
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';


class CustomizeCountersComponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counterTypeList: [],
            counterTypeDetail: null,
            showModalAdd: false,
            showModalDelete: false
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
        this.setState({ counterTypeDetail: ctDTO, showModalAdd: true })
    }

    editHandler(idx) {
        const ctDTO = this.state.counterTypeList[idx]
        this.setState({ counterTypeDetail: ctDTO, showModalAdd: true })
    }

    closeHandler() {
        this.setState({ counterTypeDetail: null, showModalAdd: false })
        this.readData()
    }

    askConfirmHandler(idx) {
        const ctDTO = this.state.counterTypeList[idx]
        this.setState({ counterTypeDetail: ctDTO, showModalDelete: true })
    }

    closeDeleteHandler() {
        this.setState({ counterTypeDetail: null, showModalDelete: false })
        this.readData()
    }

    render() {
        const counterTypeList = this.state.counterTypeList
        return (
            <div>
                {
                    this.state.showModalAdd &&
                    <CounterTypeModal closeHandler={() => this.closeHandler()} counterTypeDetail={this.state.counterTypeDetail} />
                }
                {
                    this.state.showModalDelete &&
                    <DeleteCounterTypeModal closeDeleteHandler={() => this.closeDeleteHandler()} counterTypeDetail={this.state.counterTypeDetail} />
                }
                <Table striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th />
                            <th>Seq</th>
                            <th>Name</th>
                            <th>Descr</th>
                            <th className="text-center">
                                <Button className="btn btn-primary" data-toggle="modal" data-target="#ctModal"
                                    onClick={() => this.addHandler()}>
                                    <Plus />
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {counterTypeList.map((ct, index) =>
                        (
                            <tr key={ct.id}>
                                <td className="text-center">
                                    <Button className="btn btn-primary" onClick={() => this.askConfirmHandler(index)}>
                                        <Trash />
                                    </Button>
                                </td>
                                <td>{ct.seq}</td>
                                <td>{ct.name}</td>
                                <td>{ct.description}</td>
                                <td className="text-center">
                                    <Button className="btn btn-primary" data-toggle="modal" data-target="#ctModal"
                                        onClick={() => this.editHandler(index)}>
                                        <Pencil />
                                    </Button>
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