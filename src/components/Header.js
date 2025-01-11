import useAuth from "../hooks/useAuth";

const Header = ({isSidebarOpen}) => {
  const { username } = useAuth();
  return (
    <header className={`${isSidebarOpen ? "col-start-2" : ""}`}>
      <div>
        <h1>{username.charAt(0).toUpperCase() + username.slice(1)}</h1>
      </div>
      <div>
        <span>notification</span>
        <span>message</span>
        <span>{username?.trim()[0]?.toUpperCase()}</span>
      </div>
    </header>
  );
};
export default Header;
