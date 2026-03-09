import '../styles/Footer.css';

function Footer() {
  return (
    <div id="copyright">
      <div className="d-flex justify-content-center align-items-center text-xs">
        <span className="text-secondary">
          {' '}
          &copy; 2024{' '}
          <span className="text-dark">
            <b>Ternakku,</b>
          </span>{' '}
          Made With{' '}
        </span>
      </div>
    </div>
  );
}

export default Footer;
