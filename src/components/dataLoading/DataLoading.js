import './DataLoading.css'

const DataLoading = props => {
  return (
    <div className='data-loading'>
      <h1>Какой объем данных загрузить?</h1>
      <button onClick={props.getBigData}>Большой</button>
      <button onClick={props.getSmallData}>Маленький</button>
    </div>
  )
}

export default DataLoading