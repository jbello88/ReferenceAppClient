import React from "react";

function Home() {
  const apiDocPath = `${process.env.REACT_APP_API_URL}/api/api-docs`;
  return (
    <div className="m-4">
      <div className="container">
        <h1 className="mb-4  display-4">Reference App MERN-Stack</h1>
        <h3>A simple app to manage technical documentation.</h3>
        <div className="larger">
          <p>
            It is the purpose of this application to be used as a correct and
            well coded example of the implementation of a CRUD application based
            on the MERN-stack including authorization.
          </p>
          <img
            src="./images/mernstack.png"
            alt="Mern-Stack"
            className="img-fluid mb-4"
          />
          <p>
            This CRUD application allows you to manage documentation of the
            system itself. The documentation can be entered as markdown and
            users can leave comments for each document.
          </p>

          <p>
            In addition of the basic CRUD functionality the app contains the
            following extra elements:
          </p>
          <ul className="larger feature">
            <li>Authorization</li>
            <li>Handling of Markdown</li>
            <li>
              File-upload for pictures (used in Markdown) and storage of those
              pictures in MongoDb
            </li>
            <li>Redux pattern implemented with easy-peasy</li>
            <li>An efficent way to display messages to the user,</li>
          </ul>
        </div>
        <h3 className="mt-5">
          The Swagger specification of the api can be found here :
          <a className="nav-item nav-link d-inline" href={apiDocPath}>
            API-Documentation{" "}
          </a>
        </h3>
      </div>
    </div>
  );
}

export { Home };
