// import { StyleSheet, View, Text } from '@react-pdf/renderer'
// import { Fragment } from 'react'
// import PointText from '@/components/PointText'
// import Section from '@/components/Section'
// import SectionTitle from '@/components/SectionTitle'
// import { useFormData } from './FormDataContext'
// import SSContainer from '@/components/SSContainer'
// import ConditionalRender from '@/components/ConditionalRender'

// const styles = StyleSheet.create({})

// const Achievement = () => {
//   const data = useFormData()
//   return (
//     <Section>
//       <SectionTitle title='ACHIEVEMENT' />
//       <SSContainer>
//         <ConditionalRender value={data.achievement}>
//           {data.achievement.map((value, index) => (
//             <Fragment key={index}>{value.value && <PointText>{value.value}</PointText>}</Fragment>
//           ))}
//         </ConditionalRender>
//       </SSContainer>
//     </Section>
//   )
// }

// export default Achievement
