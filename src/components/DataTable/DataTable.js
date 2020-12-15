import React from 'react'
import AddUser from '../addUser/AddUser'
import FilterData from '../filterData/FilterData'
import GetUserInfo from '../userInfo/UserInfo'
import './DataTable.css'

// const data = [
// 	{
// 		id: 101,
// 		firstName: 'Sue',
// 		lastName: 'Corson',
// 		email: 'DWhalley@in.gov',
// 		phone: '(612)211-6296',
// 		address: {
// 			streetAddress: '9792 Mattis Ct',
// 			city: 'Waukesha',
// 			state: 'WI',
// 			zip: '22178'
// 		},
// 		description: 'et lacus magna dolor...',
//   },
//   {
// 		id: 102,
// 		firstName: 'Aueq',
// 		lastName: 'Borson',
// 		email: 'AWhalley@in.gov',
// 		phone: '(412)211-6296',
// 		address: {
// 			streetAddress: '9792 Mattis Ct',
// 			city: 'Waukesha',
// 			state: 'WI',
// 			zip: '22178'
// 		},
// 		description: 'et lacus magna dolor...',
//   },
//   {
// 		id: 103,
// 		firstName: 'Yuew',
// 		lastName: 'Aorson',
// 		email: 'UWhalley@in.gov',
// 		phone: '(812)211-6296',
// 		address: {
// 			streetAddress: '9792 Mattis Ct',
// 			city: 'Waukesha',
// 			state: 'WI',
// 			zip: '22178'
// 		},
// 		description: 'et lacus magna dolor...',
//   },
//   {
// 		id: 104,
// 		firstName: 'Buee',
// 		lastName: 'Zorson',
// 		email: 'CWhalley@in.gov',
// 		phone: '(312)211-6296',
// 		address: {
// 			streetAddress: '9792 Mattis Ct',
// 			city: 'Waukesha',
// 			state: 'WI',
// 			zip: '22178'
// 		},
// 		description: 'et lacus magna dolor...',
//   },
//   {
// 		id: 105,
// 		firstName: 'Kuer',
// 		lastName: 'Xorson',
// 		email: 'BWhalley@in.gov',
// 		phone: '(012)211-6296',
// 		address: {
// 			streetAddress: '9792 Mattis Ct',
// 			city: 'Waukesha',
// 			state: 'WI',
// 			zip: '22178'
// 		},
// 		description: 'et lacus magna dolor...',
//   },
// ]

const defaultUser = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    streetAddress: 'default value',
    city: 'default value',
    state: 'default value',
    zip: 'default value'
  },
  description: 'default value'
}

const defaultValid = {
  id: false,
  firstName: false,
  lastName: false,
  email: false,
  phone: false
}

export default class DataTable extends React.Component {
  state = {
    data: [],
    filtredData: [],
    userInfo: null,
    filterInput: '',
    newUser: { ...defaultUser },
    valid: { ...defaultValid }
  }

  checkValid = (name, value) => {
    const valid = {...this.state.valid}
    valid[name] = true
    this.setState({valid})

    if (!value) {
      valid[name] = false
    }

    if (name === 'id') {
      valid[name] = Number.isInteger(+value) && value
    }
    
    if (name === 'phone') {
      valid[name] = Number.isInteger(+value) && value.length === 10
    }

    if (name === 'email') {
      valid[name] = value.includes('@')
    }

    this.setState({valid})
  }

  filterInputHandler = e => {
    this.setState({filterInput: e.target.value})
  }

  getUsers = async () => {
    const resp = await fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')

    if (resp.ok) {
      return resp.json()
    } else {
      console.log('something went wrong')
    }
  }

  sortTable = e => {
    const name = e.target.textContent
    const data = this.state.filtredData.length === 0 ? this.state.data : this.state.filtredData
    if (data.length < 2) return
    const sortedDate = [...data]

    sortedDate.sort((a, b) => a[name] > b[name] ? 1 : -1)
    this.setState({filtredData: sortedDate})
  }

  setUserInfo = id => {
    const userInfo = this.state.data.find(user => user.id === id)
    this.setState({userInfo})
  }

  getTable = arr => {
    return (
      <tbody>     
        {arr.map((user, index) => {
          const {id, firstName, lastName, email, phone} = user
          return (
            <tr key={index} onClick={() => this.setUserInfo(id)}>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{phone}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  componentDidMount = () => {
    this.getUsers()
      .then(data => this.setState({data}))
  }

  findHandler = () => {
    const {filterInput, data} = this.state
    const filtredData = filterInput === '' 
      ?  [...data]
      : data.filter(user => user.id.toString().startsWith(filterInput) 
        || user.firstName.toLowerCase().startsWith(filterInput)
        || user.lastName.toLowerCase().startsWith(filterInput)
        || user.email.toLowerCase().startsWith(filterInput)
        || user.phone.startsWith(filterInput)
    )

    if (filtredData.length === 0) filtredData.length = 1

    this.setState({filtredData})
  }

  addUserInputHandler = e => {
    const {name, value} = e.target
    this.checkValid(name, value)
    
    const newUser = {...this.state.newUser}
    newUser[name] = value

    this.setState({newUser})
  }

  addUserSubmitHandler = () => {
    const data = [...this.state.data]

    data.unshift(this.state.newUser)

    this.setState({
      valid: {...defaultValid}, 
      newUser: {...defaultUser},
      data
    })
  }

  render() {
    const data = this.state.filtredData.length === 0 ? this.state.data : this.state.filtredData
    return (
      <div className='container'>
        <FilterData 
          inputValue={this.filterInput}
          inputHandler={this.filterInputHandler}
          buttonHandler={this.findHandler}
        />
        <AddUser 
          user={this.state.newUser}
          setValue={this.addUserInputHandler}
          addButton={this.addUserSubmitHandler}
          valid={this.state.valid}
        />
        {JSON.stringify(this.state.valid)}
        <table>
          <thead>
            <tr>
              <td onClick={this.sortTable}>id</td>
              <td onClick={this.sortTable}>firstName</td>
              <td onClick={this.sortTable}>lastName</td>
              <td onClick={this.sortTable}>email</td>
              <td onClick={this.sortTable}>phone</td>
            </tr>
          </thead>
          { this.getTable(data) }
        </table>
        
        <GetUserInfo user={this.state.userInfo} />
      </div>
    )
  }
}