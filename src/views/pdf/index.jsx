import palette from '@/theme/palette'
import { Document, Font, Page, StyleSheet, View } from '@react-pdf/renderer'
import FontAwesomeBrandsRegular from '../../../public/fonts/font-awesome/Font-Awesome-6-Brands-Regular-400.otf'
import FontAwesomeSolid from '../../../public/fonts/font-awesome/Font-Awesome-6-Free-Solid-900.otf'
import LatoBold from '../../../public/fonts/lato/Lato-Bold.ttf'
import LatoItalic from '../../../public/fonts/lato/Lato-Italic.ttf'
import LatoRegular from '../../../public/fonts/lato/Lato-Regular.ttf'
import RobotoSlabBold from '../../../public/fonts/roboto-slab/RobotoSlab-Bold.ttf'
import Achievement from './Achievement'
import Education from './Education'
import EmploymentHistory from './EmploymentHistory'
import Extras from './Extras'
import Languages from './Languages'
import ProfileSummary from './ProfileSummary'
import Projects from './Projects'
import Skills from './Skills'
import { PDFDataProvider } from './PDFDataContext'
import Intro from './Intro'

Font.register({
  family: 'RobotoSlab',
  fonts: [{ src: RobotoSlabBold, fontStyle: 'bold' }]
})

Font.register({
  family: 'Lato',
  fonts: [
    { src: LatoRegular, fontStyle: 'normal' },
    { src: LatoBold, fontStyle: 'bold' },
    { src: LatoItalic, fontStyle: 'italic' }
  ]
})

Font.register({
  family: 'FontAwesome',
  fonts: [
    { src: FontAwesomeSolid, fontStyle: 'solid' },
    { src: FontAwesomeBrandsRegular, fontStyle: 'brand' }
  ]
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    color: palette.gray.dark,
    backgroundColor: palette.background.default
  },
  container: {
    flexDirection: 'row',
    color: palette.gray.main
  },
  columnLeft: {
    flexDirection: 'column',
    width: '30%',
    paddingRight: 15
  },
  columnRight: {
    width: '70%',
    flexDirection: 'column'
  }
})

const PDF = record => (
  <PDFDataProvider data={record}>
    <Document>
      <Page size='A4' style={styles.page}>
        <Intro />
        <View style={styles.container}>
          <View style={styles.columnLeft}>
            <Skills />
            <Projects />
            <Languages />
            <Achievement />
          </View>
          <View style={styles.columnRight}>
            <ProfileSummary />
            <EmploymentHistory />
            <Education />
            <Extras />
          </View>
        </View>
      </Page>
    </Document>
  </PDFDataProvider>
)

export default PDF
