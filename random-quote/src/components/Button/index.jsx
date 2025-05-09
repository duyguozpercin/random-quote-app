import './styles.css'

export const Button = ({label, handleOnclick}) => {
  return <button className="bg-pink-400 text-white py-3 px-6 m-2.5 rounded-lg cursor-pointer text-base" onClick= {handleOnclick}>{label}</button>;
}