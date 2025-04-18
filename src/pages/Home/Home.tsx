import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Home.css';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '../../store/slices/userSlice';
import { api } from '../../services/api';
import { RootState } from '../../store'; 

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .matches(/^\S*$/, 'Username should not contain spaces')
      .trim()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(fetchUserStart());
      try {
        const { data } = await api.get(`/users/${values.username}`);
        dispatch(fetchUserSuccess(data));
        navigate(`/user/${values.username}`);
      } catch (error: any) {
        // Check if it's a 404 error or any other error
        const errorMessage = error.response?.status === 404 
          ? `User "${values.username}" not found` 
          : 'Failed to fetch user';
        dispatch(fetchUserFailure(errorMessage));
      }
    }
  });

  const handleExploreUsers = () => {
    navigate('/explore-users');
  };

  return (
    <div className="home-container">
      <div className="search-card">
        <h1 className="title">GitView</h1>
        <p className="subtitle">Search for any GitHub user to explore their repositories</p>
        
        <form onSubmit={formik.handleSubmit} className="search-section">
          <div className="search-box">
            <input 
              type="text" 
              id="username"
              name="username"
              placeholder="Enter GitHub username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`search-input ${formik.touched.username && formik.errors.username ? 'input-error' : ''}`}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading || !formik.isValid || formik.values.username === ''}
            >
              {loading ? 'Searching...' : 'Search User'}
            </button>
          </div>
          {formik.touched.username && formik.errors.username && (
            <div className="error-message">{formik.errors.username}</div>
          )}
          {/* Display error from Redux state if present */}
          {error && (
            <div className="error-message">{error}</div>
          )}
          {/* Display loading indicator */}
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Loading user data...</span>
            </div>
          )}
        </form>
        
        <div className="separator">
          <span>OR</span>
        </div>
        
        <div className="explore-section">
          <button 
            onClick={handleExploreUsers}
            className="explore-button"
            disabled={loading}
          >
            Browse Search History
          </button>
        </div>

        <div className="github-icon">
          <svg height="64" viewBox="0 0 16 16" width="64">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;