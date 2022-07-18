import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import background from 'assets/img/background_auth.png';
import Login from '../components/Login';

const useStyles = makeStyles(() => ({
  root: {
    background: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    height: 'calc(100vh - 144px)',
  },
}));
export default function LoginPage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Login />
    </Box>
  );
}
