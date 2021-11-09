import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className='centered'>
      <p>No quotes found</p>
      <Link className='btn' to='/new-quote'>
        Add a Quote
      </Link>
    </div>
  );
}

export default NotFound;
