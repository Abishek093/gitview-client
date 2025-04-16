import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './ExploreUsers.css';

interface User {
  login: string;
  name?: string;
  avatar_url: string;
  _id: string;
}

const ExploreUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`);
  };

  const openDeleteModal = (user: User, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to user details
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      await api.delete(`/users/${selectedUser.login}`);
      // Remove the user from the list without refreshing
      setUsers(users.filter(user => user.login !== selectedUser.login));
      closeModal();
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore GitHub Users</h1>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div 
              key={user._id} 
              className="user-card" 
              onClick={() => handleUserClick(user.login)}
            >
              <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="user-avatar" />
              <div className="user-info">
                <h3>{user.login}</h3>
                {user.name && <p>{user.name}</p>}
              </div>
              <button 
                className="delete-button"
                onClick={(e) => openDeleteModal(user, e)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="no-users">No users found</div>
        )}
      </div>

      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete user <strong>{selectedUser.login}</strong>?</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="confirm-button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreUsers;