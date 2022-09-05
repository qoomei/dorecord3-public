import { useEffect, useState } from 'react'
import { db } from './firebaseConfig'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'

function EditStudent(props) {
  // 名前
  const [name, setName] = useState('')
  // ふりがな
  const [kana, setKana] = useState('')
  // 性別
  const [sex, setSex] = useState(0)
  // メモ
  const [memo, setMemo] = useState('')

  // フッター
  const [footer, setFooter] = useState(null)

  // タイトル
  const title = props.sid !== null ? '生徒編集' : '生徒追加'
  // ボタン
  const button = props.sid !== null ? '保存' : '追加'

  // 入力チェック
  const [validated, setValidated] = useState('')

  ////////////////////////////////////////////////////////////
  // 初期化
  useEffect(() => {
    // 入力チェック
    setValidated('')

    if (props.sid !== null) {
      // 修正

      // 名前
      setName(props.params.name)
      // ふりがな
      setKana(props.params.kana)
      // 性別
      setSex(parseInt(props.params.sex))
      // メモ
      setMemo(props.params.memo)

      // フッター
      setFooter(
        <div className="modal-footer between">
          <button
            type="button"
            className="btn btn-warning"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#sRemoveModal"
          >
            生徒を削除
          </button>
          <div className="left-box">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              閉じる
            </button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
              {button}
            </button>
          </div>
        </div>
      )
    } else {
      // 追加

      // 名前
      setName('')
      // ふりがな
      setKana('')
      // 性別
      setSex(0)
      // メモ
      setMemo('')

      // フッター
      setFooter(
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            閉じる
          </button>
          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
            {button}
          </button>
        </div>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.params, props.updateEditStudent])

  ////////////////////////////////////////////////////////////
  // 追加・保存
  const handleSubmit = (e) => {
    const sid = props.sid

    // 入力チェック
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()

      setTimeout(() => {
        let target
        if (sid !== null) {
          target = document.getElementById('sEditButton')
        } else {
          target = document.getElementById('sAddButton')
        }
        target.dispatchEvent(new Event('click'))

        // 入力チェック
        setValidated('was-validated')
      }, 400)

      return
    }

    e.preventDefault()
    const pinfo = {
      name: name,
      kana: kana,
      sex: sex,
      memo: memo,
      koma1: props.params.koma1 !== undefined ? props.params.koma1 : new Date('2000/1/1'),
      koma2: props.params.koma2 !== undefined ? props.params.koma2 : new Date('2000/1/1'),
      koma3: props.params.koma3 !== undefined ? props.params.koma3 : new Date('2000/1/1'),
      resist: props.params.resist !== undefined ? props.params.resist : new Date(),
    }

    // フォームクリアー
    // 名前
    setName('')
    // ふりがな
    setKana('')
    // 性別
    setSex(0)
    // メモ
    setMemo('')

    if (sid !== null) {
      // 変更
      const docRef = doc(db, props.account, sid)
      setDoc(docRef, pinfo)
    } else {
      // 追加
      const colRef = collection(db, props.account)
      addDoc(colRef, pinfo)
    }
  }

  ////////////////////////////////////////////////////////////
  // フォームの各項目変更時
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeKana = (e) => {
    setKana(e.target.value)
  }
  const onChangeSex = (e) => {
    setSex(parseInt(e.target.value))
  }
  const onChangeMemo = (e) => {
    setMemo(e.target.value)
  }

  return (
    <div className="modal fade" id="seditModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>
              <div className="modal-title">{title}</div>
            </h4>
          </div>
          <form className={validated} onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="sname" className="form-label">
                  名前
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="名前を入力"
                  value={name}
                  onChange={onChangeName}
                  required
                />
                <div className="invalid-feedback">名前を入力して下さい</div>
              </div>
              <div className="mb-3">
                <label htmlFor="skana" className="form-label">
                  ふりがな
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ふりがなを入力"
                  value={kana}
                  onChange={onChangeKana}
                  required
                />
                <div className="invalid-feedback">ふりがなを入力して下さい</div>
              </div>
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="ssex1"
                    value="0"
                    onChange={onChangeSex}
                    checked={sex === 0}
                  />
                  <label className="form-check-label" htmlFor="ssex1">
                    男
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="ssex2"
                    value="1"
                    onChange={onChangeSex}
                    checked={sex === 1}
                  />
                  <label className="form-check-label" htmlFor="ssex2">
                    女
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="smemo" className="form-label">
                  メモ
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="メモを記入"
                  value={memo}
                  onChange={onChangeMemo}
                />
              </div>
            </div>
            {footer}
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditStudent
