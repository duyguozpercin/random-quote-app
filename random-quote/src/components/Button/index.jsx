import './styles.css'

export const Button = ({label, handleOnclick}) => {
  return <button className="btn" onClick= {handleOnclick}>{label}</button>;
}