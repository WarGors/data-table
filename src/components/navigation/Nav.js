import './Nav.css'

const Nav = props => {
  const arr = new Array(Math.ceil(props.lists / 50)).fill(null)
  if (arr.length === 1) return null
  
  return(
    <ul className='nav'>
      {arr.map((_, index) => (
        <li 
          key={index} 
          style={props.active === index + 1 ? {fontWeight: 'bold'} : null}
          onClick={() => props.changeList(index + 1)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  )
}

export default Nav