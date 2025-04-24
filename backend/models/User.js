import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  city: { type: String },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default: 'https://example.com/default-profile-image.jpg',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
