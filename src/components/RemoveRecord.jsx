import { db } from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

function RemoveRecord(props) {
  ////////////////////////////////////////////////////////////
  // 記録削除
  const handleSubmit = (e) => {
    e.preventDefault()

    // 単一のドキュメントリファレンスを取得
    const docRef = doc(db, props.account, props.sid, 'record', props.rid)
    // 削除
    deleteDoc(docRef)
  }

  return (
    <div className="modal fade" id="removeRecordModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <p>記録を削除します。よろしいですか？</p>
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

export default RemoveRecord
