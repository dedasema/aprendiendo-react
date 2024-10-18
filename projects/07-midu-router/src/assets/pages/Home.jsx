import { Link } from "../../Link"


function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Este es el componente de Home</p>
      <Link to='/about'>About</Link>
    </>
  );
}

export default HomePage