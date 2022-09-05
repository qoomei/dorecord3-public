import { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'
import ContentHome from './ContentHome'
import Koma from './Koma'
import EditKoma from './EditKoma'
import SelectStudent from './SelectStudent'
import EditStudent from './EditStudent'
import AddStudent from './AddStudent'
import Slist from './Slist'
import GoogleLogout from './GoogleLogout'
import RemoveStudent from './RemoveStudent'
import RemoveRecord from './RemoveRecord'

function Content(props) {
  const [page, setPage] = useState('ホーム')
  const [sid, setSid] = useState(null)
  const [komaNo, setKomaNo] = useState(0)
  const [content, setContent] = useState(null)
  const [pinfo, setPinfo] = useState({})
  const [rid, setRid] = useState(null)
  const [updateEditStudent, setUpdateEditStudent] = useState(0)

  // 生徒リスト
  const [slist, setSlist] = useState([])

  ////////////////////////////////////////////////////////////
  // 生徒選択解除
  const clearStudent = () => {
    setSid(null)
    setPinfo({})
  }

  useEffect(() => {
    switch (page) {
      case 'ホーム':
        setKomaNo(0)
        setContent(<ContentHome slist={slist} setPage={setPage} setSid={setSid} />)
        break
      case '1コマ':
      case '2コマ':
      case '3コマ':
        const res = page.match(/[0-9]/)
        const no = parseInt(res[0])
        setKomaNo(no)
        setContent(<Koma account={props.account} button="setting" setPage={setPage} setSid={setSid} komaNo={no} />)
        break
      case 'QR':
        setKomaNo(-1)
        setContent(
          <div className="qr-container">
            <img alt="qr" src="qr20220804115648956.png" />
          </div>
        )
        break
      case 'コマ設定':
        setContent(<EditKoma account={props.account} button="resist" setPage={setPage} komaNo={komaNo} />)
        break
      case '生徒選択':
        setContent(
          <SelectStudent
            account={props.account}
            button="record"
            setPage={setPage}
            sid={sid}
            setRid={setRid}
            clearStudent={clearStudent}
          />
        )
        break
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slist])

  ////////////////////////////////////////////////////////////
  // 生徒情報
  useEffect(() => {
    if (sid !== null) {
      const list = slist.filter((array) => array.sid === sid)
      if (list.length) {
        // console.log(pinfo);
        setPinfo(list[0])
      }
    }
  }, [sid, slist])

  return (
    <div className="show-sub">
      <Slist account={props.account} setSlist={setSlist} />
      {/* <p onClick={zzz} style={{marginTop: 100}}>XXX</p> */}
      <Header account={props.account} page={page} sid={sid} pinfo={pinfo} setUpdateEditStudent={setUpdateEditStudent} />
      <main className="container p-0">{content}</main>
      <AddStudent page={page} setUpdateEditStudent={setUpdateEditStudent} />
      <Footer page={page} komaNo={komaNo} onClick={setPage} />
      <EditStudent
        account={props.account}
        sid={sid}
        params={pinfo}
        setPinfo={setPinfo}
        setSlist={setSlist}
        updateEditStudent={updateEditStudent}
      />
      <RemoveStudent
        account={props.account}
        sid={sid}
        name={pinfo.name}
        setPage={setPage}
        clearStudent={clearStudent}
      />
      <RemoveRecord account={props.account} sid={sid} rid={rid} />
      <GoogleLogout account={props.account} setAccount={props.setAccount} />
    </div>
  )
}

export default Content
