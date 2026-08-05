import useAuth from '../../hooks/useAuth';
import '../../styles/forms.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="auth-page">
      <h1 className="brush-underline">My Profile</h1>
      <div className="form-field">
        <label>Full Name</label>
        <p>{user.name}</p>
      </div>
      <div className="form-field">
        <label>Email</label>
        <p>{user.email}</p>
      </div>
      <div className="form-field">
        <label>Account Type</label>
        <p style={{ textTransform: 'capitalize' }}>{user.role}</p>
      </div>
    </div>
  );
};

export default Profile;