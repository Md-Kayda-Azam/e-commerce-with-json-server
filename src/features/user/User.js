import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from './userSlice';

function User() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
export default User;
