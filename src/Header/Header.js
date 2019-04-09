import React, { Component } from 'react';
import '../Styles/_Header.scss';
// import Nav from './Nav'


export default function Header(props) {
  return (
    <header className="pageHeader">
      {/* <Nav /> */}
      <section className="banner">
        <h1 className="coyoHeading">
          <div className="headingText co">CO</div>
          <div className="headingText yo">YO</div>
        </h1>
        <h2 className="fullNameHeading">colorado yoga collective</h2>
      </section>
      <section className="temp">
        

      </section>
    </header>
  )
}  