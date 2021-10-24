import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import WarningList from '../data/WarningList';
// import { useSearchParams } from 'react-router-dom'
import Well from '../components/Well';
import Button from '../components/Button';

function Generate() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [isShowAll, setShowAll] = useState(false);
  const [isWarningChecked, setWarningChecked] = useState([]);
  const [applicableWarnings, setApplicableWarnings] = useState([]);
  const [displayMode, setDisplayMode] = useState('select');

  let search = window.location.search;
  let searchParams = new URLSearchParams(search);
  const id = searchParams.get('id')

  console.log(id)

  useEffect(() => {
    const newApplicableWarnings = [];
    for (let i = 0; i < WarningList.length; i++) {
      if (id & (1 << i)) {
        console.log(WarningList[i]);
        newApplicableWarnings.push(WarningList[i]);
      }

      isWarningChecked.push(false);
    }

    setApplicableWarnings(newApplicableWarnings);
  }, []);

  const toggleWarning = (i) => {
    const newIsWarningChecked = [...isWarningChecked];
    newIsWarningChecked[i] = !newIsWarningChecked[i];
    setWarningChecked(newIsWarningChecked);
  }

  const generateCode = (i) => {
    setDisplayMode('result');
  }

  const triggerCode = useMemo(() => {
    let code = 0;
    for (let i = WarningList.length - 1; i >= 0; i--) {
      code += isWarningChecked[i];
      code = code << 1;
    }
    return code >> 1;
  }, [isWarningChecked]);

  const codeUrl = useMemo(() => {
    return `${document.location.origin}/check/v1?id=${triggerCode}`;
  }, [triggerCode]);

  return <Container style={{ paddingBottom: 64, paddingTop: 32 }}>
    <Row>
      <Col>
        <h1 style={{ marginBottom: 0 }}>สร้างโค้ดตรวจสอบ Trigger Warning เพื่อผู้อ่านของคุณ</h1>
        <div style={{ marginBottom: 32 }}>BETA: ทดสอบระบบ</div>
        <hr />
        {displayMode === 'select' &&
          <>
            <h2 style={{marginBottom: 0}}>สื่อชิ้นนี้มีเนื้อหาดังต่อไปนี้</h2>
            <p>ถ้าไม่มีเนื้อหาเหล่านี้ กด "สร้างโค้ด" ได้เลย</p>
            {/* <Well> */}
            {WarningList.map((x, i) => (
              <div style={{ paddingBottom: 8, paddingTop: 8 }} key={`choice-${i}`}>
                <label style={{ display: 'flex' }}>
                  <input
                    name="warnings"
                    type="checkbox"
                    checked={isWarningChecked[i]}
                    style={{ display: 'inline-block', marginRight: 8 }}
                    onChange={() => { toggleWarning(i) }} />
                  <span style={{ flexGrow: 1 }}>{x}</span>
                </label>
              </div>
            ))}
            <Button onClick={generateCode} style={{ marginTop: 16, width: '100%' }}>
              สร้างโค้ด
            </Button>
            {/* </Well> */}
          </>
        }

        {displayMode === 'result' &&
          <>
            <h2>โค้ดของคุณคือ</h2>
            <Well>
              <a href={codeUrl} target="_blank">{codeUrl}</a>
            </Well>
            <Button onClick={() => setDisplayMode('select')} style={{ marginTop: 16, width: '100%' }}>ย้อนกลับ</Button>
          </>
        }
      </Col>
    </Row>
  </Container>
}

export default Generate;