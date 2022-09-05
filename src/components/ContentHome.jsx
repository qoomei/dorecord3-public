import { useEffect, useState } from 'react'

function ContentHome(props) {
  // 生徒リストコンテンツ
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (props.slist.length) {
      // コンテンツ作成(生徒リスト)
      setContent(
        props.slist.map((val) => {
          return (
            <li className="list-group-item d-flex align-items-end" onClick={() => selectStudent(val.sid)} key={val.sid}>
              <div>
                <img alt="human" src={Number(val.sex) ? 'woman.png' : 'man.png'} />
              </div>
              <div>
                <div className="kana">{val.kana}</div>
                <div>{val.name}</div>
              </div>
            </li>
          )
        })
      )
    } else {
      setContent(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.slist])

  ////////////////////////////////////////////////////////////
  // 生徒選択
  const selectStudent = (sid) => {
    props.setPage('生徒選択')
    props.setSid(sid)
  }

  return <ul className="slist list-group list-group-horizontal clearfix">{content}</ul>
}

export default ContentHome
