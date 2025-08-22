import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import profile from "../../assets/imgs/profile.png";
import { BsBalloonHeart } from "react-icons/bs";
export default function MyNavbar() {

  const { token, setToken, UserData, setUserData } = useContext(Auth)
  console.log(token)
  console.log(UserData)

  const navigate = useNavigate()

  function signout() {
  localStorage.removeItem("token");
  setToken(null);
  localStorage.removeItem("user");
  setUserData(null);
  navigate("/login");
}

  return (
    <Navbar fluid>
      <NavbarBrand as={Link} to="/posts">
      <BsBalloonHeart className="text-white text-4xl" />  <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Gatherly</span>
      </NavbarBrand>
      {token && <NavbarToggle />}
      {token && <NavbarCollapse>
        
        <NavbarLink as={Link} to="/posts">
          home
        </NavbarLink>
        <NavbarLink as={Link} to="/posts">
          posts
        </NavbarLink>

      </NavbarCollapse>}
<div className="flex justify-center items-center gap-5 rounded-4xl">
     <img src={UserData ? UserData.photo : profile} alt="" className="w-[50px] block " />
 <Dropdown label={UserData ? UserData.name : "user" }  >

        {token ? <>
    <DropdownItem >{UserData ? UserData.email : "user@example.com"}</DropdownItem>

          <DropdownItem as={Link} to="/profile">profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={signout}>signout</DropdownItem></> :
          <>
            <DropdownItem as={Link} to="/login">login</DropdownItem>
            <DropdownItem as={Link} to="/register">register</DropdownItem>
          </>}


      </Dropdown>
</div>
     
    </Navbar>
  );
}
