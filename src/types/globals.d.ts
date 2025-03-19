export {}

// Tipo para os papéis de usuário
export type Roles = 'admin' | 'member'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}