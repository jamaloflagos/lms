import { useStudent } from "../../hooks/useStudent";
const Header = () => {
  const { studentDetail } = useStudent();

  return (
    <header className="bg-white flex justify-between px-12">
      <h1>{studentDetail.first_name}</h1>
      <i className="fa-solid fa-bell"></i>
    </header>
  );
};
export default Header;
