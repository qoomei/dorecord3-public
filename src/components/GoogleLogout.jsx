import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

function GoogleLogout(props) {
  ////////////////////////////////////////////////////////////
  // ログアウト
  const handleSubmit = (e) => {
    e.preventDefault()

    signOut(auth)
    props.setAccount(null)
  }

  return (
    <div className="modal fade" id="googleLogout" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>
              <div className="modal-title">ログアウトしますか？</div>
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                閉じる
              </button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                ログアウト
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GoogleLogout
