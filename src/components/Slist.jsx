import { useEffect } from 'react'
import { db } from './firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

function Slist(props) {
  ////////////////////////////////////////////////////////////
  // 生徒リスト取得
  const fetchSlist = () => {
    const colRef = collection(db, props.account)
    const q = query(colRef, orderBy('resist'))
    return onSnapshot(q, async (snapshot) => {
      let slist = []
      await snapshot.forEach((document) => {
        const doc = document.data()
        doc.sid = document.id
        slist.push(doc)
      })
      props.setSlist(slist)
    })
  }

  ////////////////////////////////////////////////////////////
  // 非同期通信
  useEffect(() => {
    let unsub
    if (props.account !== undefined) {
      unsub = fetchSlist()
    }

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default Slist
