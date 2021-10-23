import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import WarningList from '../data/WarningList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'


const Well = styled.div`
  background-color: #eee;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

function Check() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [isShowAll, setShowAll] = useState(false);
  const [isWarningChecked, setWarningChecked] = useState([]);
  const [applicableWarnings, setApplicableWarnings] = useState([]);
  const [displayMode, setDisplayMode] = useState('select');

  let search = window.location.search;
  let searchParams = new URLSearchParams(search);
  const id = searchParams.get('id')

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

  return <Container>
    <Row>
      <Col>
        <h1>ตรวจสอบ Trigger Warning แบบให้สปอยล์น้อยที่สุด!</h1>
        {displayMode === 'select' &&
          <>
            <h2>เลือก Trigger Warning ที่ต้องการตรวจสอบ</h2>
            <Well>
              <ul>
                {WarningList.map((x, i) => (
                  <li>
                    <label>
                      <input
                        name="warnings"
                        type="checkbox"
                        checked={isWarningChecked[i]}
                        onChange={() => { toggleWarning(i) }} />
                      {x}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={checkWarning}>ตรวจสอบ</button>
            </Well>

            <h2>Trigger Warning ทั้งหมดของสื่อชิ้นนี้</h2>
            <Well>
              <button onClick={() => setShowAll(!isShowAll)}>show/hide</button>
              {isShowAll &&
                <ul>
                  {applicableWarnings.map(x => (
                    <li>{x}</li>
                  ))}
                </ul>
              }
            </Well>
          </>
        }

        {displayMode === 'result' &&
          <>
            <Well>
              <h2>Checking Result</h2>
              {WarningList.map((x, i) => (
                <>{
                  isWarningChecked[i]
                  &&
                  <li>
                    <b>{isWarningChecked[i] && applicableWarnings.includes(x) ? 'YES' : 'NO'}</b>
                    {' '}{x}
                  </li>
                }</>
              ))}
            </Well>
            <button onClick={() => setDisplayMode('select')}>ย้อนกลับ</button>
          </>
        }
      </Col>
    </Row>
  </Container>
}

export default Check;