function Spinner(props) {
  return props.show === true ? (
    <div className="wrap-spinner">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  ) : null
}

export default Spinner
