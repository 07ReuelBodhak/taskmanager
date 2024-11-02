import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface Iuser extends Document {
  username: String;
  email: String;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<Iuser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

userSchema.pre("save", async function (next) {
  const user = await User.findOne({ username: this.username });
  if (user) {
    return next(new Error("user already exits"));
  }
  if (this.isModified()) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User: Model<Iuser> = mongoose.model<Iuser>("User", userSchema);

export default User;
