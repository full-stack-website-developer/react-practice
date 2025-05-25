import Toast from 'react-bootstrap/Toast';

function ToastExample({type}) {
  return (
    <>
      {[type].map((variant, idx) => (
        <Toast
          className="d-inline-block m-1"
          key={idx}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className={variant === 'Dark' && 'text-white'}>
            Hello, world! This is a toast message.
          </Toast.Body>
        </Toast>
      ))}
    </>
  );
}

export default ToastExample;