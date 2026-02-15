class DomainError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function createUserService(userRepo) {
  return {
    async register(input) {
      if (!input.email || !input.email.includes('@')) {
        throw new DomainError('invalid email', 'INVALID_EMAIL');
      }
      const existing = await userRepo.findByEmail(input.email);
      if (existing) throw new DomainError('email already exists', 'EMAIL_EXISTS');
      return userRepo.create(input);
    }
  };
}

module.exports = { DomainError, createUserService };
