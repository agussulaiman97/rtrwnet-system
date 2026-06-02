import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = 'RTRWNET_SECRET'

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'ADMIN',
  },
]

export const login = async (req, res) => {

  try {

    const { username, password } = req.body

    const user = users.find(
      (u) => u.username === username
    )

    if (!user) {

      return res.status(401).json({
        success: false,
        message: 'User not found',
      })

    }

    const validPassword = bcrypt.compareSync(
      password,
      user.password
    )

    if (!validPassword) {

      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      })

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: '1d',
      }
    )

    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

}