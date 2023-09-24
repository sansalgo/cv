import ErrorContainer from '@/components/ErrorContainer'

export default function Custom500() {
  return <ErrorContainer>500 - Internal Server Error</ErrorContainer>
}

Custom500.getLayout = page => page
