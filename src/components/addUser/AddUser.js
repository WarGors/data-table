import './AddUser.css'

const AddUser = props => {
  const {user: {id, firstName, lastName, phone, email}, setValue, addButton, valid} = props
  const validButton = Object.values(valid).includes(false)
  return(
    <div className='add-user'>
      <div>
        <input 
          type='number' 
          name='id' 
          value={id} 
          placeholder='Введите id...'
          onChange={setValue}
        />
        <span>{valid.id ? null : 'id может быть только целым числом'}</span>
      </div>

      <div>
        <input 
          type='text' 
          name='firstName' 
          value={firstName} 
          placeholder='Введите имя...'
          onChange={setValue}
        />
        <span>{valid.firstName ? null : 'Поле имя не может быть пустым'}</span>
      </div>

      <div>
        <input 
          type='text' 
          name='lastName'
          value={lastName}
          placeholder='Введите фамилию...'
          onChange={setValue}
        />
        <span>{valid.lastName ? null : 'Поле фамилия не может быть пустым'}</span>
      </div>

      <div>
        <input 
          type='text' 
          name='email'
          value={email}
          placeholder='Введите email...'
          onChange={setValue}
        />
        <span>{valid.email ? null : 'Введите корректный email'}</span>
      </div>

      <div>
        <input 
          type='number' 
          name='phone'
          value={phone}
          placeholder='Введите телефон...'
          onChange={setValue}
        />
        <span>{valid.phone ? null : 'Введите корректный номер телефона'}</span>
      </div>

      <button disabled={validButton} onClick={addButton}>Добавить</button>

    </div>
  )
}

export default AddUser