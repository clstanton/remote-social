import React from 'react';

function Nav() {

  return (
    <header>
        <h2>
            <a href="/">Remote Social</a>
        </h2>
        <nav>
            <ul className="flex-row">
                <li className="mx-2">
                    <a href="#about">About</a>
                </li>
                <li className="mx-2">
                    <a href="#contact">Contact</a>  
                </li>
            </ul>
        </nav>
    </header>
  );
}

export default Nav;