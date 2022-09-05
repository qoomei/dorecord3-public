function Footer(props) {
  const styleNonactive = {
    height: '50px',
  }
  const styleActive = {
    height: '50px',
    backgroundColor: '#dddddd',
  }

  const menu = ['ホーム', '1コマ', '2コマ', '3コマ', 'QR']
  const content = menu.map((val) => {
    let style

    // カレントページを設定
    if (val === props.page) {
      style = styleActive
    } else {
      style = styleNonactive
    }

    // ホームで生徒選択の場合
    if (props.komaNo === 0 && val === 'ホーム' && props.page === '生徒選択') {
      style = styleActive
    }

    // コマ設定・生徒選択ページの場合
    if (props.page === 'コマ設定' || props.page === '生徒選択') {
      if (val === String(props.komaNo) + 'コマ') {
        style = styleActive
      }
    }

    return (
      <div className="menu" style={style} onClick={() => props.onClick(val)} key={val}>
        {val}
      </div>
    )
  })

  return (
    <div id="footer" className="container-fluid fixed-bottom text-black">
      {content}
    </div>
  )
}

export default Footer
