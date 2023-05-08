import React, { Component } from 'react'
import axios from 'axios'
import { format, addDays } from 'date-fns'
import './DiaryComponent.css'

class DiaryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date(new Date().toDateString()),
            counterList: [],
        }
    }

    componentDidMount() {
        this.readData(this.state.currentDate)
    }

    readData(dt) {
        let formatDt = format(dt, 'yyyy-MM-dd')
        console.log(`Date read ${formatDt}`)
        axios.get(`http://localhost:7889/counterDiary/api/counter/get/${formatDt}`)
            .then(response => {
                this.setState({ currentDate: dt, counterList: response.data })
                console.log(`Read counter ${response.status}`)
            })
            .catch(error => console.log(error))
    }

    nextDayHandler() {
        let dt = this.state.currentDate
        let setDt = addDays(dt, 1)
        this.readData(setDt)
    }

    prevDayHandler() {
        let dt = this.state.currentDate
        let setDt = addDays(dt, -1)
        this.readData(setDt)
    }

    incrementCountHandler(index) {
        const cDTO = this.state.counterList[index];
        this.postCounter(index, cDTO.counter + 1)
    }

    decrementCountHandler(index) {
        const cDTO = this.state.counterList[index];
        this.postCounter(index, cDTO.counter - 1)
    }

    postCounter(index, counter) {
        const arrayCopy = [...this.state.counterList]
        const cDTO = arrayCopy[index]
        cDTO.counter = counter
        axios.post('http://localhost:7889/counterDiary/api/counter/post', cDTO)
            .then(response => {
                console.log(`Post counter type ${response.status}`)
                this.setState({ counterList: arrayCopy })
            })
            .catch(error => console.log(error))
    }

    render() {
        let displayDate = format(this.state.currentDate, 'dd/MM/yy')
        let disabledNextDay = false
        let patternCompare = "yyyyMMdd"
        if (format(this.state.currentDate, patternCompare) >= format(new Date(), patternCompare))
            disabledNextDay = true
        const counterList = this.state.counterList
        return (
            <div className='container'>
                <div className="mb-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary d-inline" onClick={() => this.prevDayHandler()}>Prev.</button>
                    <h2 className='m-3 d-inline'>{displayDate}</h2>
                    <button type="button" className="btn btn-primary d-inline"
                        disabled={`${disabledNextDay ? "true" : ""}`}
                        onClick={() => this.nextDayHandler()}>Next</button>
                </div>
                <div className='row'>
                    {counterList.map((c, index) => {
                        let descr = c.counterTypeDTO.description === '' ? c.counterTypeDTO.name : c.counterTypeDTO.description
                        return (
                            <div className="customCard col card m-2" key={c.id}>
                                <div class="card-body">
                                    <h5 class="card-title">{c.counterTypeDTO.name}</h5>
                                    <p class="card-text">{descr}</p>
                                    <button type="button" className="btn btn-primary d-inline"
                                        disabled={`${c.counter > 0 ? "" : "true"}`}
                                        onClick={() => this.decrementCountHandler(index)}>-</button>
                                    <p class="card-text d-inline m-3">{c.counter}</p>
                                    <button type="button" className="btn btn-primary d-inline" onClick={() => this.incrementCountHandler(index)}>+</button>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div >
        )
    }
}

export default DiaryComponent