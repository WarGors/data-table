import './FilterData.css'

const FilterData = props => {
  const { inputValue, inputHandler, buttonHandler } = props
  return (
    
    <div className='filter'>
      Фильтровать по содержимому
      <input 
        placeholder='Введите значение...' 
        value={inputValue} 
        onChange={inputHandler}
      />
      <button onClick={buttonHandler}>найти</button>
    </div>
  )
}

export default FilterData