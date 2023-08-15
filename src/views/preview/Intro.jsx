import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import ConditionalRender from '@/components/ConditionalRender'
import IconText from '@/components/IconText'
import { useFormData } from './FormDataContext'
import { FormContext } from './PDFDocument'

const styles = StyleSheet.create({
  name: {
    fontFamily: 'RobotoSlab',
    fontStyle: 'bold',
    fontSize: 25
  },
  subtitle: {
    fontFamily: 'Lato',
    fontStyle: 'bold',
    fontSize: 12
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  }
})

const Intro = () => {
  const data = useFormData()
  return (
    <View>
      <Text style={styles.name}>
        {data.firstName} {data.lastName}
      </Text>
      <Text style={styles.subtitle}>{data.position}</Text>
      <View style={styles.list}>
        <ConditionalRender condition={data.email}>
          <IconText icon='@' text={data.email} />
        </ConditionalRender>
        <ConditionalRender condition={data.phone}>
          <IconText icon='phone-flip' text={data.phone} />
        </ConditionalRender>
        <ConditionalRender condition={data.city}>
          <IconText icon='location-pin' text={data.city} />
        </ConditionalRender>
        <ConditionalRender condition={data.linkedin}>
          <IconText icon='linkedin' text={data.linkedin} fontStyle='brand' />
        </ConditionalRender>
        <ConditionalRender condition={data.github}>
          <IconText icon='github' text={data.github} fontStyle='brand' />
        </ConditionalRender>
      </View>
    </View>
  )
}

export default Intro
