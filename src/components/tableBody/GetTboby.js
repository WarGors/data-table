import './GetTbody.css'

const GetTbody = props => {
  return (
    <tbody>     
      {props.users.map((user, index) => {
        if (!user) return null
        const {id, firstName, lastName, email, phone} = user
        return (
          <tr key={index} onClick={() => props.setUserInfo(id, email)}>
            <td style={{width: '55px'}}>{id}</td>
            <td style={{width: '115px'}}>{firstName}</td>
            <td style={{width: '150px'}}>{lastName}</td>
            <td style={{width: '225px'}}>{email}</td>
            <td style={{width: '130px'}}>{phone}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default GetTbody