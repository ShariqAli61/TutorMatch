// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   // You can add more fields if needed, like role, avatar, etc.
// }, {
//   timestamps: true,
// });

// // Hash password before saving to database
// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare entered password with hashed password
// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);

// export default User;
