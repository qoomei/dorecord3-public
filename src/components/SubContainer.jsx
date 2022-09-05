import { useEffect, useState } from 'react'

function SubContainer(props) {
  const [content, setContent] = useState()

  const styleShow = {
    visibility: 'unset',
  }
  const styleHide = {
    visibility: 'hidden',
  }

  useEffect(() => {
    if (props.button === 'setting') {
      setContent(
        <div id="sub-container" className="container-fluid fixed-bottom justify-content-between">
          <textarea style={props.textarea === 'show' ? styleShow : styleHide}></textarea>
          <button onClick={() => props.setPage('コマ設定')}>設定</button>
        </div>
      )
    } else if (props.button === 'resist') {
      setContent(
        <div id="sub-container" className="container-fluid fixed-bottom justify-content-between">
          <textarea style={props.textarea === 'show' ? styleShow : styleHide}></textarea>
          <button type="submit">適用</button>
        </div>
      )
    } else if (props.button === 'record') {
      setContent(
        <div id="sub-container" className="container-fluid fixed-bottom justify-content-between">
          <textarea
            ref={props.inputRef}
            style={props.textarea === 'show' ? styleShow : styleHide}
            // autoFocus={true}
            placeholder="Alt(option) + Enterで記録"
            onChange={props.onChange}
          ></textarea>
          <button type="submit">記録</button>
        </div>
      )
    } else {
      setContent('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.button])

  return <div>{content}</div>
}

export default SubContainer
