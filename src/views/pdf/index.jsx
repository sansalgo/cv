import Intro from '@/views/pdf/intro'
import ProfileSummary from '@/views/pdf/profileSummary'
import Achievement from '@/views/pdf/achievement'
import Education from '@/views/pdf/education'
import EmploymentHistory from '@/views/pdf/employmentHistory'
import Extras from '@/views/pdf/extras'
import Languages from '@/views/pdf/languages'
import Projects from '@/views/pdf/projects'
import Skills from '@/views/pdf/skills'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setRecord } from '@/store/record'

const PDF = () => {
  // const dispatch = useDispatch()
  // //   const state = useSelector((state) => state.cv.record[0])
  // useEffect(() => {
  //   // dispatch(setRecord(JSON.parse(localStorage.getItem('record'))))
  //   // console.log('testing...')
  //   console.log(localStorage.getItem('record'))
  // }, [])

  const data = {
    _id: {
      $oid: '63bc38db029df9aa85f97aa2'
    },
    user: {
      $oid: '639c8c3b2e42efeeb225caee'
    },
    intro: {
      firstName: 'RAJKUMAR',
      lastName: '',
      position: 'MERN/MEAN STACK DEVELOPER',
      email: 'rajkumarpandiaraj@gmail.com',
      phone: '8610111861',
      city: 'Tiruppur, Tamilnadu',
      linkedin: 'https://www.linkedin.com/in/rajkumar-pandiaraj-0b55931a7',
      github: 'https://github.com/rajkumarpandiaraj',
      _id: {
        $oid: '63bc38db029df9aa85f97aa3'
      }
    },
    profileSummary:
      'I am a self taught MERN/MEAN stack developer with two years of hands-on experience and one year of industrial experience of designing, development and implementing applications and solutions using a range of technologies and programming languages',
    employmentHistory: [
      {
        position: 'MEAN/MERN Stack Developer',
        companyName: 'Phicode',
        startDate: ' Nov 2021',
        endDate: 'Present',
        location: 'Coimbatore, Tamilnadu',
        description: 'Marriot - Web App to find and analyse the defects in towers and buildings',
        _id: {
          $oid: '63bc38db029df9aa85f97aa4'
        }
      },
      {
        position: 'MEAN/MERN Stack developer',
        companyName: 'IonStar',
        startDate: 'Mar 2021',
        endDate: 'Nov 2022',
        location: 'Tiruppur, Tamilnadu',
        description:
          'GARMENTX - Web App to maintain the whole garments process. FOX-DO - Web App to maintain the personal tasks and share the tasks with team',
        _id: {
          $oid: '63bc38db029df9aa85f97aa4'
        }
      }
    ],
    education: [
      {
        course: 'B.Sc(Mathematics)',
        institution: 'Park’s College',
        startDate: 'Jun 2019',
        endDate: 'Present',
        location: 'Tiruppur, Tamilnadu',
        percentage: '80',
        _id: {
          $oid: '63bc38db029df9aa85f97aa5'
        }
      },
      {
        course: 'BE(CSE)',
        institution: 'Karpagam College of Engineering',
        startDate: 'Aug 2016',
        endDate: 'Jan 2017',
        location: 'Coimbatore, Tamilnadu',
        percentage: '80',
        _id: {
          $oid: '63bc38db029df9aa85f97aa5'
        }
      },
      {
        course: 'HSC',
        institution: 'Sasurie vidhya bhavan matriculation higher secondary school',
        startDate: 'Jun 2015',
        endDate: 'Mar 2016',
        location: 'Tiruppur, Tamilnadu',
        percentage: '90',
        _id: {
          $oid: '63bc38db029df9aa85f97aa5'
        }
      },
      {
        course: 'SSLC',
        institution: 'Chinna swamy ammal municipal higher secondary school',
        startDate: 'Jun 2015',
        endDate: 'Mar 2016',
        location: 'Tiruppur, Tamilnadu',
        percentage: '90',
        _id: {
          $oid: '63bc38db029df9aa85f97aa5'
        }
      }
    ],
    extras: ['smart working', 'Team management', 'Team work', 'self confidence', 'soft skills'],
    skills: [
      'HTML5',
      'CSS',
      'REACTJS',
      'TYPESCRIPT',
      'JAVASCRIPT',
      'ANGULAR2+',
      'FIREBASE',
      'NODEJS',
      'EXPRESSJS',
      'basics of Photoshop cs3',
      'MONGODB'
    ],
    projects: [
      'IssueTracker using react, redux, bootstrap and firebase',
      'GoogleTasks clone using react and redux',
      'CovidTracker using react, redux, axios and chart.js',
      'E-commerce website using react, contextApi',
      'kindly check my above mentioned github for more projects and code structure'
    ],
    languages: ['Tamil', 'English'],
    achievement: ['school first SSLC', 'Won first prizes in school level speech competitions'],
    createdAt: {
      $date: {
        $numberLong: '1673279708007'
      }
    },
    updatedAt: {
      $date: {
        $numberLong: '1673279708007'
      }
    },
    __v: 0
  }

  useEffect(() => {
    // dispatch(setRecord(JSON.parse(localStorage.getItem('record'))))
    // console.log('testing...')
    data['test'] = localStorage.getItem('record')
  }, [])

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <Container maxWidth='lg'>
      <Grid container columnSpacing={3} rowSpacing={1.5}>
        <Grid item xs={12}>
          <Intro data={data} />
        </Grid>
        <Grid item xs={4}>
          <Skills data={data} />
          <Projects data={data} />
          <Languages data={data} />
          <Achievement data={data} />
        </Grid>
        <Grid item xs={8}>
          <ProfileSummary data={data} />

          <EmploymentHistory data={data} />

          <Education data={data} />

          <Extras data={data} />
        </Grid>
      </Grid>

      {/* <div className="col-md-4 order-md-1 order-2">
            <Skills data={state} />
            <Projects data={state} />
            <Languages data={state} />
            <Achievement data={state} />
          </div>
          <div className="col-md-8 order-md-2 order-1">
            <ProfileSummary data={state} />
            <EmploymentHistory data={state} />
            <Education data={state} />
            <Extras data={state} />
          </div> */}
    </Container>
    // </ThemeProvider>
  )
}

export default PDF
