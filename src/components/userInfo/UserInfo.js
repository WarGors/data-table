import './UserInfo.css'

const GetUserInfo = props => {
  if (!props.user) return null
  const { address, firstName, lastName, description } = props.user
  return (
    <div className='user-info'>
      Выбран пользователь <b>{`${firstName} ${lastName}`}</b> <br />
      Описание: <br /> 
      <textarea readOnly value={description} /> <br />
      Адрес проживания: <b>{address.streetAddress}</b> <br />
      Город: <b>{address.city}</b> <br />
      Провинция/штат: <b>{address.state}</b> <br />
      Индекс: <b>{address.zip}</b>
    </div>
  )
}

export default GetUserInfo