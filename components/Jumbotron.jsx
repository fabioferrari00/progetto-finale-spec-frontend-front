import React from "react";

const Jumbotron = () => {
  return (
    <>
      <div className="jumbo-bg">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <img className="jumbo-img" src="../src/assets/logo.png" alt="" />
            </div>
            <div className="col-6 bg-jumbo-title">
              <h2 className="jumbo-title">Cerca il corso giusto per te.</h2>
              <h2 className="jumbo-title2">Confrontali tra loro e valuta quale fa al caso tuo!</h2> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
};


export default Jumbotron;