import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useLogout from "../../utils/useLogout";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/auth";

const NavContainer = styled.nav`
  background-color: #77c977;
  color: #ffffff;
  padding: 20px 2%;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const NavItem = styled.li`
  margin-right: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #28a745;
    cursor: pointer;
  }
`;
interface IUser {
  email: string;
  id: string;
}

const Navbar: React.FC = () => {
  const { logoutHandler } = useLogout();
  const [data, setData] = useState<IUser>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        setData(data);
      } catch (error) {}
    };
    fetchUser();
  }, []);

  return (
    <NavContainer>
      <NavList>
        <NavItem>
          {<NavLink>{`Hi, ${data?.email ? data?.email : ""}`}</NavLink>}
          <NavLink
            onClick={() => {
              logoutHandler();
              navigate("/login");
            }}
          >
            Logout
          </NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
