import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  lastLogin?: Date;
  loginCount?: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  loginCount: { type: Number, default: 0 },
});

const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
