import User from '../models/User.js'

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-Password');
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log('trying to update user data')
    console.log(req.params.id,req.body)
    console.log('now trying to update db because data received it correct')
    const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true ,runValidators: true});
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

