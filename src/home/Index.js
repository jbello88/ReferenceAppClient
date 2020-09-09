import React from "react";

function Home() {
  return (
    <div className="m-4">
      <div className="container">
        <h1 className="mb-4  display-4">Reference App MERN-Stack</h1>
        <h3>A simple app to manage technical documentation.</h3>
        <div className="larger">
          <p>
            It is the purpose of this application to be used as a correct and
            well coded example of the implementation of a CRUD application with
            autherization and messaging system.
          </p>
          <p>
            If your are building an app you can always go to this app an find a
            good and working implementation of the basic functionality needed to
            build such an app.
          </p>
        </div>

        <h3>Functionality of the App</h3>
        <ul className="larger feature">
          <li>
            The documentation pages can be entered in the markdown syntax, which
            supports many formatting options including including pictures in the
            documents. Pictures can be uploaded and included into the
            documentation.
          </li>
          <li>
            The authorization includes login, sign-up, email verification,
            password reset, user-roles, user can edit their profile and an
            administrator can add, edit and delete all the users.
          </li>
          <li>
            The application is built on the Redux pattern and uses Easy-Peasy to
            implement it
          </li>
          <li>For each documentation page the users can leave comments.</li>
          <li>
            A User can view all the pages even when he is not logged in. A user
            must me logged in to leave a comment.
          </li>
          <li>
            A user can edit and/or delete his comments but can not edit or
            delete comments made by other users
          </li>
          <li>
            Pages can be added, edited and deleted only by users who belong to
            the admin group.
          </li>
          <li>
            Pages can be added, edited and deleted only by users who belong to
            the admin group.
          </li>
          <li>
            An administrator can edit and delete comments even if they were made
            by another user.
          </li>
          <li>
            The swagger documentation of the underlying api can be accessed via
            the menu.
          </li>
        </ul>
      </div>
    </div>
  );
}

export { Home };
