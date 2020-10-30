import React from 'react';

export function Commands({ children }) {
  let leftChildren;
  let rightChildren;

  if (Array.isArray(children)) {
    leftChildren = children.filter(c => !c.props.isRight);
    rightChildren = children.filter(c => c.props.isRight);
  } else {
    leftChildren = [children];
    rightChildren = [];
  }

  return (
    <>
      <div className="field level">
        <div className="level-left">
          {React.Children.map(leftChildren, child => {
            if (child.classList) {
              child.classList.add('level-item');
            }
            console.log(child.type.name);
            return child;
          })}
        </div>

        <div className="level-right">
          {React.Children.map(rightChildren, child => {
            if (child.classList) {
              child.classList.add('level-item');
            }
            return child;
          })}
        </div>
      </div>
    </>
  );
}
