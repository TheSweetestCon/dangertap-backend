import bcrypt from 'bcrypt'

const saltRounds = 10

export async function hashPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}

export async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash)
}
