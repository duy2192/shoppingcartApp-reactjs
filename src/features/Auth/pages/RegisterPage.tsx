import background from 'assets/img/background_auth.png';
import Register from '../components/Register';

export default function RegisterPage() {
  return (
    <div
      className="h-[calc(100vh_-_120px)] "
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Register />
    </div>
  );
}
