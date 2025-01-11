const Footer = ({isSidebarOpen}) => {
  return (
    <footer className={`${isSidebarOpen ? "col-start-2" : ""}`}>Footer</footer>
  )
}
export default Footer