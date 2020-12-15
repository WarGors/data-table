const AddUser = props => {
  const {user: {id, firstName, lastName, phone, email}, setValue, addButton} = props
  return(
    <div>
      <div>
        <input 
          type='number' 
          name='id' 
          value={id} 
          placeholder='Введите id...'
          onChange={setValue}
        />
      </div>

      <div>
        <input 
          type='text' 
          name='firstName' 
          value={firstName} 
          placeholder='Введите имя...'
          onChange={setValue}
        />
      </div>

      <div>
        <input 
          type='text' 
          name='lastName'
          value={lastName}
          placeholder='Введите фамилию...'
          onChange={setValue}
        />
      </div>

      <div>
        <input 
          type='text' 
          name='email'
          value={email}
          placeholder='Введите email...'
          onChange={setValue}
        />
      </div>

      <div>
        <input 
          type='number' 
          name='phone'
          value={phone}
          placeholder='Введите телефон...'
          onChange={setValue}
        />
      </div>

      <button onClick={addButton}>Добавить</button>

    </div>
  )
}

export default AddUser