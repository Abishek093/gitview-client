import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GitHubUser } from '../../store/slices/userSlice';
import { api } from '../../services/api';
import { updateUserSuccess } from '../../store/slices/userSlice';
import './EditUserProfile.css';

interface EditUserProfileProps {
  user: GitHubUser;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    company: user.company || '',
    location: user.location || '',
    bio: user.bio || '',
    blog: user.blog || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/users/${user.login}`, formData);
      dispatch(updateUserSuccess(response.data));
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'An error occurred while updating the profile');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="blog">Blog/Website</label>
          <input
            type="text"
            id="blog"
            name="blog"
            value={formData.blog}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;