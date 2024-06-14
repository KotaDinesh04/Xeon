import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Mobile = ({user}) => {
  return (

<Sidebar>
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/home" />}> Home</MenuItem>
    <MenuItem component={<Link to="/mybank" />}> My Banks</MenuItem>
    <MenuItem component={<Link to="/transaction" />}> Transaction History</MenuItem>
  </Menu>
</Sidebar>
  )
}

export default Mobile