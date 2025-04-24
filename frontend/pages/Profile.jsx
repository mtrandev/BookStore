import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5555/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setNewName(data.username);
        setNewEmail(data.email);
      } catch (err) {
        console.error('Error loading profile', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5555/users/me', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting account:', errorData);
        throw new Error('Failed to delete account');
      }

      alert('Your account has been successfully deleted.');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account. Please try again.');
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5555/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: newName,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData);
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while saving your profile. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const isSaveDisabled =
    newName === '' ||
    newEmail === '' ||
    (newName === user?.username && newEmail === user?.email);

  if (!user) return <div className="text-center text-lg mt-10">Loading...</div>;

  return (
    <div className="p-8 bg-[#f0e6d2] min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#3e2a47] mb-8">Your Profile</h1>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl flex flex-col items-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#6b5f47] mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-[#6b5f47] mb-4 flex items-center justify-center text-[#6b5f47] bg-[#f0e6d2]">
            <span>No Image</span>
          </div>
        )}

        <div className="w-full text-center mb-6">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-2 w-full max-w-sm p-2 rounded-lg mb-2"
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border-2 w-full max-w-sm p-2 rounded-lg"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[#3e2a47]">{user.username}</h2>
              <p className="text-gray-700 text-lg">{user.email}</p>
            </>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              disabled={isSaveDisabled}
              className={`py-2 px-4 rounded-lg text-white transition ${
                isSaveDisabled
                  ? 'bg-[#2ecc71] opacity-50 cursor-not-allowed'
                  : 'bg-[#2ecc71] hover:bg-[#27ae60]'
              }`}
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-[#f39c12] text-white py-2 px-4 rounded-lg hover:bg-[#e67e22] transition"
            >
              <FiEdit className="inline mr-2" />
              Edit Profile
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-[#e74c3c] text-white py-2 px-4 rounded-lg hover:bg-[#c0392b] transition"
          >
            <FiDelete className="inline mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
