import './GetThead.css'

const GetThead = props => {
  if (!props.dataNum[0]) {
    return (
      <thead>
        <tr>
          <td className='not-found'>
            Поиск не дал результатов
          </td>
        </tr>
      </thead>
    )
  }

  return(
    <thead>
      <tr>
        {props.head.map(name => {
          return(
            <td 
              key={name} 
              onClick={e => {
                props.sortTable(e)
                props.getName(name)
              }} 
              className={props.name === name ? `sort ${props.style}` : null}
            >
              {name}
            </td>
          )
        })}
      </tr>
    </thead>
  )
}

export default GetThead