import { Container, Row, Col } from 'react-grid-system';
import WarningList from '../data/WarningList';
import { useEffect, useMemo, useState } from 'react';
// import { useSearchParams } from 'react-router-dom'
import Well from '../components/Well';
import Button from '../components/Button';

function Check() {
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

  const checkWarning = (i) => {
    setDisplayMode('result');
  }

  return <Container style={{paddingBottom: 64, paddingTop: 32}}>
    <Row>
      <Col>
        <h1>ตรวจสอบ Trigger Warning แบบให้สปอยล์น้อยที่สุด!</h1>
        <hr/>
        {displayMode === 'select' &&
          <>
            <h2>เลือก Trigger Warning ที่ต้องการตรวจสอบในสื่อชิ้นนี้</h2>
            <Well>
                {WarningList.map((x, i) => (
                  <div style={{paddingBottom: 8, paddingTop: 8}} key={`choice-${i}`}>
                    <label style={{display: 'flex'}}>
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
            <Button onClick={checkWarning}>ตรวจสอบ</Button>
            </Well>

            <h2>หรือดู Trigger Warning ทั้งหมดของสื่อชิ้นนี้</h2>
            <Well>
            <Button onClick={() => setShowAll(!isShowAll)}>show/hide</Button>
              {isShowAll &&
                <ul>
                  {applicableWarnings.map((x, i) => (
                    <li key={`filtered-${i}`}>{x}</li>
                  ))}
                </ul>
              }
            </Well>
          </>
        }

        {displayMode === 'result' &&
          <>
            <Well>
              <h2>สื่อชิ้นนี้มีเนื้อหาเหล่านี้หรือไม่...</h2>
              {WarningList.map((x, i) => (
                <>{
                  isWarningChecked[i]
                  &&
                  <li
                    key={`all-${i}`}
                    style={{
                      color: isWarningChecked[i] && applicableWarnings.includes(x) ? 'black' : '#aaa',
                      marginBottom: 8
                    }}
                  >
                    <b>{isWarningChecked[i] && applicableWarnings.includes(x) ? 'YES ⚠️' : 'NO'}</b>
                    {' '}{x}
                  </li>
                }</>
              ))}
            </Well>
            <Button onClick={() => setDisplayMode('select')}>ย้อนกลับ</Button>
          </>
        }
        <hr />
        <p>
          สร้างโค้ดสำหรับให้ผู้ชมตรวจสอบ Trigger Warning ในงานของคุณได้<a href="/generate" target="_blank">ที่นี่</a>
        </p>
      </Col>
    </Row>
  </Container>
}

export default Check;