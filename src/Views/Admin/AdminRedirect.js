import tokenVerification from '../../tokenVerification.js';
import Admin from './Admin.js';

function loginTokenCheck() {

  return (
    <div>
        {
            tokenVerification() ? (
              <Admin />
            ) : (
              window.location.href = `${process.env.REACT_APP_URL}/login`
            )
        }
    </div>
  );

}

export default loginTokenCheck;
