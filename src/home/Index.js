import React from 'react';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';

function Home() {
  const apiDocPath = `${process.env.REACT_APP_API_URL}/api/api-docs`;
  return (
    <div className="section">
      <section className="hero is-primary is-meduim">
        <div className="hero-body ">
          <div className="container">
            <h1 className="title">Reference App MERN-Stack</h1>
            <h2 className="subtitle">A simple app to manage technical documentation.</h2>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="columns">
          <div className="column my-6">
            <div className="block mt-4">
              It is the purpose of this application to be used as a correct and well coded example of the implementation
              of a CRUD application based on the MERN-stack including authorization.
            </div>
            <div className="block">
              This CRUD application allows you to manage documentation of the system itself. The documentation can be
              entered as markdown and users can leave comments for each document.
            </div>
            <div className="block">
              It is the purpose of this application to be used as a correct and well coded example of the implementation
              of a CRUD application based on the MERN-stack including authorization.
            </div>

            <div className="block">
              This CRUD application allows you to manage documentation of the system itself. The documentation can be
              entered as markdown and users can leave comments for each document.
            </div>
            <div className="block">
              In addition of the basic CRUD functionality the app contains the following extra elements:
            </div>
            <div className="block">
              <ul>
                <li>Authorization</li>
                <li>Handling of Markdown</li>
                <li>File-upload for pictures (used in Markdown) and storage of those pictures in MongoDb</li>
                <li>Redux pattern implemented with easy-peasy</li>
                <li>An efficent way to display messages to the user,</li>
              </ul>
            </div>
          </div>

          <div className="column">
            <figure className="image p-6">
              <img src="./images/mernstack.png" alt="Mern-Stack" />
            </figure>
          </div>
        </div>
      </div>
      <h3 className="subtitle">
        The Swagger specification of the api can be found here :
        <a className="nav-item nav-link d-inline" href={apiDocPath}>
          API-Documentation{' '}
        </a>
      </h3>
    </div>
  );
}

export { Home };
