import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

// Compare hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

export default User
