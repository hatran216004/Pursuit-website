function Spinner({ inner = true }) {
  return <div className={`spinner ${inner ? 'inner' : ''}`}></div>;
}

export default Spinner;
