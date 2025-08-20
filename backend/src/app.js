const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const config = require('./config');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: config.frontendUrl, credentials: true }));

mongoose.connect(config.mongoUri);

passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, cb) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
    });
    await user.save();
  }
  cb(null, user);
}));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => done(null, await User.findById(id)));

app.use(passport.initialize());

app.use('/auth', require('./routes/authRoutes'));
app.use('/files', require('./routes/fileRoutes'));

app.get('/', (req, res) => res.send('Cloud Drive API Running'));

app.listen(config.port, () => console.log(`Backend running on ${config.port}`));