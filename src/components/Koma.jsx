import { useEffect, useState } from 'react'
import { db } from './firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import SubContainer from './SubContainer'

function Koma(props) {
  // コマコンテンツ
  const [content, setContent] = useState(<p></p>)

  ////////////////////////////////////////////////////////////
  // コマ情報取得
  const fetchKoma = () => {
    let today = new Date()
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)

    const colRef = collection(db, props.account)
    const q = query(colRef, orderBy('resist'))
    return onSnapshot(q, async (snapshot) => {
      let slist = []
      await snapshot.forEach((document) => {
        const doc = document.data()
        doc.sid = document.id

        if (
          doc['koma' + props.komaNo] !== null &&
          doc['koma' + props.komaNo] !== undefined &&
          doc['koma' + props.komaNo].toDate().getTime() >= today.getTime()
        ) {
          slist.push(doc)
        }
      })
      setContent(
        <ul className="slist koma list-group list-group-horizontal clearfix">
          {slist.map((val) => {
            const memo = val.memo !== undefined && val.memo !== '' ? <div className="memo">{val.memo}</div> : null
            return (
              <li
                className="list-group-item d-flex align-items-end"
                onClick={() => selectStudent(val.sid)}
                key={val.sid}
              >
                <div>
                  <img alt="human" src={Number(val.sex) ? 'woman.png' : 'man.png'} />
                </div>
                <div>
                  <div className="kana">{val.kana}</div>
                  <div>{val.name}</div>
                  {memo}
                </div>
              </li>
            )
          })}
        </ul>
      )
    })
  }

  ////////////////////////////////////////////////////////////
  // 生徒選択
  const selectStudent = (sid) => {
    props.setPage('生徒選択')
    props.setSid(sid)
  }

  ////////////////////////////////////////////////////////////
  // 非同期通信
  useEffect(() => {
    let unsub
    if (props.account !== undefined) {
      // コマ情報取得
      unsub = fetchKoma()
    }

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.komaNo])

  return (
    <div>
      {content}
      <SubContainer textarea="" button={props.button} setPage={props.setPage} komaNo={props.komaNo} />
    </div>
  )
}

export default Koma
