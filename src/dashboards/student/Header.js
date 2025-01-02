import useAuth from "../../hooks/useAuth"

const Header = () => {
  const { username } = useAuth()
  return (
    <div>
      <div>
        <h1>{username}</h1>
      </div>
      <div>
        <span>notification</span>
        <span>message</span>
        <span>{username.trim()[0]?.toUpperCase()}</span>
      </div>
    </div>
  )
}
export default Header