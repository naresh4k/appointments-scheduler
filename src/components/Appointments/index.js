import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'
import StarredButton from './styledElements'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    if (titleInput && dateInput) {
      const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

      const newAppointment = {
        id: v4(),
        title: titleInput,
        date: formattedDate,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div>
          <div className="add-appointment-container">
            <form onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={e => this.setState({titleInput: e.target.value})}
                placeholder="Title"
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={e => this.setState({dateInput: e.target.value})}
              />
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <h1>Appointments</h1>
            <StarredButton
              type="button"
              isClicked={isFilterActive}
              onClick={() => this.setState({isFilterActive: !isFilterActive})}
            >
              Starred
            </StarredButton>
          </div>
          <ul>
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
