import tokenVerification from '../../tokenVerification.js';
import Admin from './Admin.js';

const URL = "http://192.168.147.147:3000"

function loginTokenCheck() {

  return (
    <div>
        {
            tokenVerification() ? (
              <Admin />
            ) : (
              window.location.href = `${URL}/login`
            )
        }
    </div>
  );

}

export default loginTokenCheck;
