export async function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(this.result)
    }
    reader.onerror = function() {
      reject(this.error?.message)
    }
    reader.readAsDataURL(file)
  })
}

export function generateKey(): string {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 1000000)}`
}

export function getTypeByPath(path: string): string {
  return path.split('.').pop() || ''
}