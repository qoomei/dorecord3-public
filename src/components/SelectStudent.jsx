import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { db } from './firebaseConfig'
import { collection, onSnapshot, query, orderBy, addDoc, limit } from 'firebase/firestore'
import { useKey } from 'react-use'
import SubContainer from './SubContainer'
import { Modal } from 'bootstrap'
import { useLongPress } from 'react-use'

function SelectStudent(props) {
  // 記録コンテンツ
  const [content, setContent] = useState(null)
  // 記録文章
  const [message, setMessage] = useState('')
  // 記録データ
  const [recordData, setRecordData] = useState([])
  // テキストエリア
  const inputRef = useRef()

  // リストの最後にスクロールするため
  const scrollBottomRef = useRef(null)
  const [doScroll, setDoScroll] = useState(false)

  ////////////////////////////////////////////////////////////
  // 記録
  const doRedord = () => {
    // 空文字判定
    if (!message) return

    const colRef = collection(db, props.account, props.sid, 'record')
    const data = {
      message: String(message),
      resist: new Date(),
    }
    addDoc(colRef, data)

    // フォームクリアー
    inputRef.current.value = ''
    setMessage('')

    // フォーカスをテキストエリアへ
    inputRef.current.focus()
  }

  ////////////////////////////////////////////////////////////
  // Alt+Enter取得
  const predicate = (event) => event.altKey && event.key === 'Enter'
  useKey(predicate, doRedord, { event: 'keyup' })

  ////////////////////////////////////////////////////////////
  // 記録取得
  const fetchRecord = () => {
    const colRef = collection(db, props.account, props.sid, 'record')
    const q = query(colRef, orderBy('resist', 'desc'), limit(1000))
    return onSnapshot(q, async (snapshot) => {
      let rlist = []
      await snapshot.forEach((document) => {
        const doc = document.data()
        doc.rid = document.id
        doc.resist = doc.resist.toDate()
        rlist.unshift(doc)
      })
      setDoScroll(true)

      setTimeout(() => {
        // doScrollがtrueになるまで遅延させるタイマー
        setRecordData(rlist)
      }, 300)
    })
  }

  ////////////////////////////////////////////////////////////
  // 記録押下
  const onSubmit = (e) => {
    e.preventDefault()

    // 記録
    doRedord()
  }

  ////////////////////////////////////////////////////////////
  // 記録コンテンツ
  useEffect(() => {
    // 日付毎に配列をまとめる
    let newData = []
    if (recordData.length) {
      let date
      let byDate
      for (const val of recordData) {
        let ymd = changeYMD(val.resist)
        if (date !== ymd) {
          if (byDate && byDate.length) newData.push(byDate)
          date = ymd
          byDate = []
        }
        // byDate.push(val)
        byDate.push({ date: date, rid: val.rid, message: val.message, tap: val.tap })
      }
      if (byDate && byDate.length) newData.push(byDate)
    }

    setContent(
      <div>
        {newData.map((val) => {
          let date
          if (changeYMD(new Date()) === val[0].date) {
            date = '今日'
          } else {
            date = val[0].date
          }

          return (
            <ul className="rlist list-group text-center" key={date}>
              <span>{date}</span>
              {val.map((val) => {
                const str = val.message.split(/\r?\n/g)
                let i = 0
                const html = str.map((val) => {
                  return <div key={i++}>{val}</div>
                })

                // クリックされたら
                const tap = 'list-group-item clipboardcopy' + (val.tap ? ' tap' : '')
                return (
                  <li
                    className={tap}
                    onClick={(e) => handleCopy(e, val.rid)}
                    {...longPressEvent}
                    data-clipboard-text={val.message}
                    data-rid={val.rid}
                    key={val.rid}
                  >
                    {html}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordData])

  ////////////////////////////////////////////////////////////
  // 非同期通信
  useEffect(() => {
    let unsub
    if (props.account !== undefined) {
      // 記録取得
      unsub = fetchRecord()
    }

    return () => {
      unsub()

      // 生徒選択解除
      props.clearStudent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 記録文章更新
  const doChangeMessage = (e) => {
    // console.log(e.target.value)
    setMessage(e.target.value)
  }

  ////////////////////////////////////////////////////////////
  // メッセージがクリックされたら
  const handleCopy = (e, rid) => {
    e.preventDefault()

    setRecordData((prev) =>
      prev.map((val) => {
        if (val.rid === rid) return { rid: val.rid, message: val.message, resist: val.resist, tap: 'tap' }
        else return { rid: val.rid, message: val.message, resist: val.resist }
      })
    )

    setTimeout(() => {
      setRecordData((prev) =>
        prev.map((val) => {
          return { rid: val.rid, message: val.message, resist: val.resist }
        })
      )
    }, 100)
  }

  ////////////////////////////////////////////////////////////
  // ロングタップ
  const onLongPress = (e) => {
    props.setRid(e.target.parentElement.dataset.rid)

    const modal = document.getElementById('removeRecordModal')
    const modalObj = new Modal(modal)
    modalObj.show()
  }
  const defaultOptions = {
    isPreventDefault: true,
    delay: 500,
  }
  const longPressEvent = useLongPress(onLongPress, defaultOptions)

  ////////////////////////////////////////////////////////////
  // YMD形式に変換
  const changeYMD = (date) => {
    const dt = new Date(date)
    let format = 'YYYY-MM-DD'

    // フォーマット文字列内のキーワードを日付に置換する
    format = format.replace(/YYYY/g, dt.getFullYear())
    format = format.replace(/MM/g, ('0' + (dt.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + dt.getDate()).slice(-2))

    return format
  }

  ////////////////////////////////////////////////////////////
  // リストの最後にスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef && scrollBottomRef.current && doScroll === true) {
      setDoScroll(false)
      scrollBottomRef.current.scrollIntoView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  return (
    <div>
      <form onSubmit={onSubmit}>
        {content}
        <div ref={scrollBottomRef} />
        <SubContainer
          textarea="show"
          inputRef={inputRef}
          onChange={doChangeMessage}
          button={props.button}
          setPage={props.setPage}
          komaNo={props.komaNo}
        />
      </form>
    </div>
  )
}

export default SelectStudent
