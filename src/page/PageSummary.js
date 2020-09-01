import React from "react";
import { useHistory } from "react-router-dom";

export default function PageSummary({ page }) {
  const history = useHistory();
  console.log(page);

  return (
    <div className="m-4" onClick={() => history.push("/topic/" + page.slug)}>
      <h3>{page.title}</h3>
      <p>{page.subtitle}</p>
    </div>
  );
}
