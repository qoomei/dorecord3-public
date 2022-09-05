import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function AddStudent(props) {
  const [content, setContent] = useState(null)

  ////////////////////////////////////////////////////////////
  // 生徒情報編集クリック時
  const handleClick = () => {
    props.setUpdateEditStudent((prov) => prov + 1)
  }

  useEffect(() => {
    // 生徒追加ボタン
    if (props.page === 'ホーム') {
      setContent(
        <div className="fixed-bottom addStudent">
          <button
            type="button"
            id="sAddButton"
            className="btn btn-link"
            data-bs-toggle="modal"
            data-bs-target="#seditModal"
            onClick={handleClick}
          >
            <AiOutlinePlus size={60} color={'white'} />
          </button>
        </div>
      )
    } else {
      setContent(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.page])

  return <div>{content}</div>
}

export default AddStudent
