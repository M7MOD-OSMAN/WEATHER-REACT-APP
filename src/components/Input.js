import './input.css'
import { FiSearch } from 'react-icons/fi'

const Input = ({ text, submit, func }) => {
  return (
    <form className='input' onSubmit={submit}>
      <input
        type={text}
        placeholder='Search country'
        className='input-value'
        onChange={text}
      />
      <span className='input-icon' onClick={func}>
        <FiSearch />
      </span>
    </form>
  )
}

export default Input
