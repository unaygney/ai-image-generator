import 'server-only'

const SECURED_PATHS = ['/', '/collection', '/feed', '/history']

export const securedPages = (pathname: string): boolean => {
  return SECURED_PATHS.some((page) => pathname.startsWith(page))
}
