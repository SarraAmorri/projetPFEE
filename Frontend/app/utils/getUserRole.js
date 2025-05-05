export async function getUserRole() {
  // Simulation - remplacer par un vrai appel API en production
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ role: 'admin' })
    }, 500)
  })
}