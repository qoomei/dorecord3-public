import { useEffect, useState } from 'react'
import { db } from './firebaseConfig'
import { collection, onSnapshot, query, orderBy, writeBatch, doc } from 'firebase/firestore'
import SubContainer from './SubContainer'

function EditKoma(props) {
  // 生徒設定リストコンテンツ
  const [content, setContent] = useState(<p>loading...</p>)
  // コマ情報
  const [komaData, setKomaData] = useState([])

  ////////////////////////////////////////////////////////////
  // 生徒設定情報全取得
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

        const koma = doc['koma' + props.komaNo]
        if (koma !== null && koma !== undefined && koma.toDate().getTime() >= today.getTime()) {
          doc.checked = true
        } else {
          doc.checked = false
        }

        slist.push(doc)
      })
      setKomaData(slist)
    })
  }

  ////////////////////////////////////////////////////////////
  // 生徒設定情報
  useEffect(() => {
    let unsub
    if (props.account !== undefined) {
      // 生徒設定情報全取得
      unsub = fetchKoma()
    }

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // コンテンツ作成(生徒設定リスト)
    setContent(
      <ul className="edit-koma-list list-group">
        {komaData.map((val) => {
          return (
            <li className="list-group-item" key={val.sid}>
              <label className="d-flex align-items-center">
                <input type="checkbox" checked={val.checked} value={val.sid} onChange={handleChange}></input>
                <div className="d-flex align-items-end">
                  <div>
                    <img alt="human" src={Number(val.sex) ? 'woman.png' : 'man.png'} />
                  </div>
                  <div>
                    <div className="kana">{val.kana}</div>
                    <div>{val.name}</div>
                  </div>
                </div>
              </label>
            </li>
          )
        })}
      </ul>
    )
  }, [komaData])

  ////////////////////////////////////////////////////////////
  // 適用押下
  const onSubmit = (e) => {
    // console.log('checked', checked)
    e.preventDefault()

    // // 絞り込み
    // const list = komaData.filter((array) => array.checked)

    // // 配列作り替え
    // const list2 = list.map(val => val.sid)

    const batch = writeBatch(db)

    const list = komaData.map((val) => {
      const obj = {
        name: val.name,
        kana: val.kana,
        sex: val.sex,
        memo: val.memo,
        resist: val.resist,
        koma1: val.koma1,
        koma2: val.koma2,
        koma3: val.koma3,
      }
      if (val.checked === true) {
        // obj['koma' + props.komaNo] = serverTimestamp()
        obj['koma' + props.komaNo] = new Date()
      } else {
        obj['koma' + props.komaNo] = new Date('2000/1/1')
      }

      // val.sid = val.sid
      val.obj = obj
      return val
    })

    for (const val of list) {
      batch.set(doc(db, props.account, val.sid), val.obj)
    }

    // Commit the batch
    batch.commit()

    props.setPage(props.komaNo + 'コマ')
  }

  // チェック状態取得
  const handleChange = (e) => {
    // console.log(e)

    setKomaData((prev) => {
      return prev.map((value) => {
        if (e.target.value === value.sid) {
          const new_value = { ...value, checked: e.target.checked }
          return new_value
        } else {
          return value
        }
      })
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {content}
        <SubContainer textarea="" button={props.button} setPage={props.setPage} komaNo={props.komaNo} />
      </form>
    </div>
  )
}

export default EditKoma
