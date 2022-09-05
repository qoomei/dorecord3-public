import { db } from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

function RemoveStudent(props) {
  ////////////////////////////////////////////////////////////
  // 生徒削除
  const handleSubmit = (e) => {
    e.preventDefault()

    // 単一のドキュメントリファレンスを取得
    const docRef = doc(db, props.account, props.sid)
    // 削除
    deleteDoc(docRef)

    props.clearStudent()
    props.setPage('ホーム')
  }

  return (
    <div className="modal fade" id="sRemoveModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>
              <div className="modal-title" id="sRemoveModalLabel">
                {props.name}
              </div>
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <p>生徒を削除します。よろしいですか？</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                閉じる
              </button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                削除する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RemoveStudent
