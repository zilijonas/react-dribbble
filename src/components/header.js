import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DropDown from './nav/dropDown'

// BEM CSS Styling

class Header extends Component {

  // styled components
  onEnter () {
    styles.style_link = {
      color: '#F5F5F5',
      fontSize: 15,
    }
  }

  // styled components
  onLeave () {
    styles.style_link = {
      color: '#999',
      fontSize: 15,
    }
  }

  renderLinks() {
    if (this.props.authenticated){
      return <li className="nav-item">
          <Link className="nav-link" to="/signout"><p style={styles.style_link}>Sign Out</p></Link>
        </li>
    } else {
      return [
        <li className="nav-item" key={1}> // key should be something more unique
          <Link className="nav-link" to="/signin"><p style={styles.style_link} onMouseEnter={ this.onEnter } onMouseLeave = { this.onLeave }>Sign In</p></Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup"><p style={styles.style_link}>Sign Up</p></Link>
        </li>
      ];
    }
  }

  render() {
    const links = ['Shots', 'Designers', 'Blog', 'Podcast', 'Meetups', 'Jobs', '...']; // do it in a seperate file of json maybe
    const listItems = links.map((link_name) =>
      <li className="nav-item" key={link_name} style={{ position: 'relative' }}>
        <div className="nav-link" style={{ position: 'relative' }}><DropDown style={{ position: 'relative' }} name={link_name} /></div>
      </li>
    );
    return (
      <nav style={{ backgroundColor: '#333333' }}> // styled components
        <div>
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img alt="dribbble" style={styles.logo} className="logo" src={"http://www.underconsideration.com/brandnew/archives/dribbble_logo_detail.png"} /> // change url to file
            </Link>
          <ul className="nav navbar-nav style_l" style={styles.style_l}> 
            {listItems}
          </ul>
        </div>
          <ul className="nav navbar-nav style_r" style={styles.style_r}>
            {this.renderLinks()}
            <li className="nav-item" key={10}>
              <input className="search" type="search" ref="city" placeholder="Search"/>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);

const styles = {
  style_r: { // styled component
    top: 10,
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  style_link: { // styled component
    color: '#999',
    fontSize: 15,
  },
  style_l: { // styled component
    top: 10,
    bottom: 20,
    position: 'relative',
  },
  logo: { // styled component
    position: 'relative',
    top: 5,
    width: 100,
    height: 42,
  }
};
