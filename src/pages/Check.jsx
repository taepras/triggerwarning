import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import WarningList from '../data/WarningList';

const Well = styled.div`
  background-color: #eee;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

function Check() {
  return <Container>
    <Row>
      <Col>
        <h1>ตรวจสอบ Trigger Warning แบบให้สปอยล์น้อยที่สุด!</h1>

        <h2>เลือก Trigger Warning ที่ต้องการตรวจสอบ</h2>

        <Well>
          <ul>
            {WarningList.map(x => (
              <li>{x}</li>
            ))}
          </ul>
        </Well>
      </Col>
    </Row>
  </Container>
}

export default Check;