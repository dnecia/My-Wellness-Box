import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="row index-row">
        <div className="col-md-6 index-bg-col"></div>
        <div className="col-md-6">
          <div className="index-col2-sub-div">
            <h1>SELF-CARE ISN'T JUST A LUXURY; IT'S A NECESSITY</h1>
            <div className="btn-index-div">
              <Link to="/signup" className="index-btn">
                <button className="btn btn-default ">SIGN UP</button>
              </Link>
              <Link to="/login" className="index-btn">
                <button className="btn btn-default">LOGIN</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
