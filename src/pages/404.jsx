import ErrorContainer from '@/components/ErrorContainer'

export default function Custom404() {
  return <ErrorContainer>404 - Not Found</ErrorContainer>
}

Custom404.getLayout = page => page
