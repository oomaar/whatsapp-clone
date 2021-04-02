import HeadTag from "../HeadTag";
import styled from "styled-components";
import { Sidebar } from "../components";

export default function Home() {
  return (
    <HomeContainer>
      <HeadTag title="WhatsApp 2.0" />
      
      <Sidebar />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  
`;