import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Well from '../components/Well';

function Home() {
  return <Container>
    <Row>
      <Col>
        <Well style={{textAlign: 'center', marginTop: 32, marginBottom: 32, paddingBottom: 32}}>
          <h1 style={{marginBottom: 0}}>ติด Trigger Warning แบบให้สปอยล์น้อยที่สุด!</h1>
          <div style={{ marginBottom: 32 }}>BETA: ทดสอบระบบ</div>
        <Button as={Link} to="/generate">สร้างโค้ดตรวจสอบ Trigger Warning</Button>
        </Well>
      </Col>
    </Row>
    <Row>
      <Col><h2 style={{ textAlign: 'center' }}>ระบบนี้ทำงานยังไง?</h2></Col>
    </Row>
    <Row>
      <Col>
        <h3>สำหรับผู้ผลิตสื่อ</h3>
        <ol>
          <li>ผู้ผลิตสื่อระบุ Trigger Warning ในงานของตัวเองบนเว็บไซต์นี้</li>
          <li>ได้โค้ดสำหรับให้ผู้ชมตรวจสอบ Trigger Warning</li>
          <li>นำโค้ดไปติดบนสื่อชิ้นนั้น</li>
        </ol>
      </Col>
      <Col>
        <h3>สำหรับผู้ชม/ผู้อ่าน</h3>
        <ol>
          <li>ผู้อ่าน/ผู้ชมสแกนโค้ดบนสื่อที่ต้องการอ่าน</li>
          <li>เลือกตรวจสอบเฉพาะ Trigger Warning ที่สนใจได้โดยไม่โดนสปอยล์ส่วนอื่นๆ</li>
          {/* <li></li> */}
        </ol>
      </Col>
    </Row>
  </Container>
}

export default Home;