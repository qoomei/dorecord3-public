import { BiEdit } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import { useEffect, useState } from 'react'

function Header(props) {
  const [title, setTitle] = useState()
  const [edit, setEdit] = useState(null)
  const [logout, setLogout] = useState(null)

  useEffect(() => {
    switch (props.page) {
      case 'ホーム':
        setTitle(`do Record 3 - ${props.account}`)
        break
      case '1コマ':
        setTitle(props.page)
        break
      case '2コマ':
        setTitle(props.page)
        break
      case '3コマ':
        setTitle(props.page)
        break
      case 'QR':
        setTitle(props.page)
        break
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.page])

  ////////////////////////////////////////////////////////////
  // 生徒情報編集クリック時
  const handleClick = () => {
    props.setUpdateEditStudent((prov) => prov + 1)
  }

  ////////////////////////////////////////////////////////////
  // 生徒名表示用
  useEffect(() => {
    if (props.page === '生徒選択' && props.pinfo.name) setTitle(props.pinfo.name)
  }, [props.page, props.pinfo])

  useEffect(() => {
    if (props.sid !== null) {
      setEdit(
        <button
          type="button"
          id="sEditButton"
          className="btn btn-link"
          data-bs-toggle="modal"
          data-bs-target="#seditModal"
          onClick={handleClick}
        >
          <BiEdit size={32} color={'white'} />
        </button>
      )
      setLogout(null)
    } else if (props.page === 'ホーム') {
      setEdit(null)
      setLogout(
        <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#googleLogout">
          <BiLogOut size={32} color={'white'} />
        </button>
      )
    } else {
      setEdit(null)
      setLogout(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sid, props.page])

  return (
    <div
      id="header"
      className={
        'container-fluid fixed-top d-flex align-items-center shadow' + (logout !== null && ' justify-content-between')
      }
    >
      {edit}
      <div className="d-flex align-items-end">
        <h1 className="h3 text-white pe-2 title">{title}</h1>
        {props.sid !== null ? <div className="memo h6">{props.pinfo.memo}</div> : null}
      </div>
      {logout}
    </div>
  )
}

export default Header
