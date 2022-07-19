import background from 'assets/img/background_auth.png';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <div
      className="h-screen "
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Login />
    </div>
  );
}
