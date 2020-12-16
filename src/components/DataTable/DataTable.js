import React from 'react'
import AddUser from '../addUser/AddUser'
import DataLoading from '../dataLoading/DataLoading'
import FilterData from '../filterData/FilterData'
import Loader from '../loader/Loader'
import Nav from '../navigation/Nav'
import GetTbody from '../tableBody/GetTboby'
import GetThead from '../tableHead/GetThead'
import GetUserInfo from '../userInfo/UserInfo'
import './DataTable.css'

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
    valid: { ...defaultValid },
    activeList: 1,
    sortedName: null,
    sortedStyle: 'up',
    addIsVisible: false,
    isLoaded: false,
    dataChosen: false
  }

  toggleVisibleHandler = () => {
    this.setState(prev => ({addIsVisible: !prev.addIsVisible}))
  }

  checkValid = (name, value) => {
    const valid = {...this.state.valid}
    valid[name] = true
    this.setState({valid})

    if (!value) {
      valid[name] = false
    }

    if (name === 'id') {
      valid[name] = Number.isInteger(+value) && (+value >= 0)
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
    this.setState({ filterInput: e.target.value })
  }

  getUsers = async (size) => {
    const urls = {
      big: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    }

    this.setState({dataChosen: true})

    const resp = await fetch(urls[size])

    if (resp.ok) {
      return resp.json()
    } else {
      alert('Что-то пошло не так, попробуйте перезапустить страницу')
    }
  }

  sortTable = e => {
    const name = e.target.textContent
    const data = this.state.filtredData.length === 0 ? this.state.data : this.state.filtredData
    if (data.length < 2) return
    const sortedDate = [...data]

    if (name === this.state.sortedName && this.state.sortedStyle === 'up') {
      sortedDate.sort((a, b) => {
        if (typeof a[name] === 'number') {
          return b[name] - a[name]
        }
        return a[name].toLowerCase() > b[name].toLowerCase() ? -1 : 1
      })
      this.setState({
        filtredData: sortedDate, 
        sortedStyle: 'down'
      })
    } else {
      sortedDate.sort((a, b) => {
        if (typeof a[name] === 'number') {
          return a[name] - b[name]
        }
        return a[name].toLowerCase() > b[name].toLowerCase() ? 1 : -1
      })
      this.setState({
        filtredData: sortedDate, 
        sortedName: name,
        sortedStyle: 'up'
      })
    }
  }

  setUserInfo = (id, email) => {
    const userInfo = this.state.data.find(user => user.id === id && user.email === email)
    this.setState({userInfo})
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

    this.setState({
      filtredData, 
      activeList: 1,
      sortedName: null,
      sortedStyle: 'up'
    })
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
    const newUser = {...this.state.newUser}
    const val = newUser.phone.toString()
    newUser.phone = `(${val.slice(0, 3)})${val.slice(3, 6)}-${val.slice(6)}`

    data.unshift(newUser)

    this.setState({
      valid: {...defaultValid}, 
      newUser: {...defaultUser},
      sortedName: null,
      sortedStyle: 'up',
      data
    })
  }

  changeActiveList = index => {
    this.setState({activeList: index})
  }

  changeListHandler = (index, data) => {
    return [ ...data ].slice((index - 1) * 50, index * 50)
  }

  getSortName = name => {
    this.setState({sortedName: name})
  }

  render() {
    const { filtredData, dataChosen, isLoaded } = this.state

    if (!dataChosen) {
      return (
        <DataLoading 
          getBigData={() => this.getUsers('big').then(data => this.setState({data, isLoaded: true}))}
          getSmallData={() => this.getUsers('small').then(data => this.setState({data, isLoaded: true}))}
        />
      )
    }
    const data = filtredData.length === 0 ? this.state.data : filtredData

    const dataToLists = this.changeListHandler(this.state.activeList, data)

    return (
      <div className='container'>
        {!isLoaded ? <Loader /> : <>
          <FilterData 
            inputValue={this.state.filterInput}
            inputHandler={this.filterInputHandler}
            buttonHandler={this.findHandler}
          />

          <AddUser 
            valid={this.state.valid}
            user={this.state.newUser}
            isVisible={this.state.addIsVisible}
            setValue={this.addUserInputHandler}
            addButton={this.addUserSubmitHandler}
            toggleVisible={this.toggleVisibleHandler}
          />
          
          <table>
            <GetThead 
              dataNum={dataToLists}
              style={this.state.sortedStyle}
              name={this.state.sortedName}
              head={['id', 'firstName', 'lastName', 'email', 'phone']} 
              sortTable={this.sortTable}
              getName={this.getSortName}
            />
            <GetTbody 
              users={dataToLists} 
              setUserInfo={this.setUserInfo}
            />
          </table>

          <Nav
            lists={data.length}
            active={this.state.activeList}
            changeList={this.changeActiveList}
          />

          <GetUserInfo user={this.state.userInfo} />
        </>}
      </div>
    )
  }
}