import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'


const DatePickerWrapper = styled(Box)(({ theme }) => ({
  '& .react-datepicker-popper': {
    zIndex: 20
  },
  '& .react-datepicker-wrapper': {
    width: '100%'
  },
  '& .react-datepicker': {
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    '& .react-datepicker__header': {
      padding: 0,
      border: 'none',
      fontWeight: 'normal',
      backgroundColor: theme.palette.background.paper,
      '&:not(.react-datepicker-year-header)': {
        '& + .react-datepicker__month, & + .react-datepicker__year': {
          margin: theme.spacing(2)
        }
      },
      '&.react-datepicker-year-header': {
        '& + .react-datepicker__month, & + .react-datepicker__year': {
          margin: theme.spacing(2)
        }
      }
    },
    '& .react-datepicker__triangle': {
      display: 'none'
    },
    '& > .react-datepicker__navigation': {
      top: 20,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.action.selected,
      '&.react-datepicker__navigation--previous': {
        width: 26,
        height: 26,
        border: 'none',
        ...(theme.direction === 'ltr' ? { left: 15 } : { right: 15 }),
        backgroundImage: `${"url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' style=\\'width:24px;height:24px\\' viewBox=\\'0 0 24 24\\'%3E%3Cpath fill=\\'currentColor\\' d=\\'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z\\' /%3E%3C/svg%3E')"
          .replace('currentColor', theme.palette.text.secondary)
          .replace('#', '%23')}`,
        '& .react-datepicker__navigation-icon': {
          display: 'none'
        }
      },
      '&.react-datepicker__navigation--next': {
        width: 26,
        height: 26,
        border: 'none',
        ...(theme.direction === 'ltr' ? { right: 15 } : { left: 15 }),
        backgroundImage: `${"url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' style=\\'width:24px;height:24px\\' viewBox=\\'0 0 24 24\\'%3E%3Cpath fill=\\'currentColor\\' d=\\'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z\\' /%3E%3C/svg%3E')"
          .replace('currentColor', theme.palette.text.secondary)
          .replace('#', '%23')}`,
        '& .react-datepicker__navigation-icon': {
          display: 'none'
        }
      },
      '&.react-datepicker__navigation--next--with-time': theme.direction === 'ltr' ? { right: 127 } : { left: 127 },
      '&:focus, &:active': {
        outline: 0
      }
    },
    '& .react-datepicker__month-container': {
      paddingTop: theme.spacing(2),
      '& + .react-datepicker__month-container': {
        borderLeft: `1px solid ${theme.palette.divider}`
      }
    },
    '& .react-datepicker__current-month, & .react-datepicker-year-header': {
      lineHeight: 2,
      fontSize: '1rem',
      fontWeight: 'normal',
      letterSpacing: '0.15px',
      marginBottom: theme.spacing(3),
      color: theme.palette.text.primary
    },
    '& .react-datepicker__month-text--today': {
      fontWeight: 'normal',
      '&:not(.react-datepicker__month--selected)': {
        lineHeight: '2.125rem',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          color: theme.palette.grey['50'],
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    '& .react-datepicker__month-text:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '& .react-datepicker__year-text--today': {
      fontWeight: 'normal',
      '&:not(.react-datepicker__year-text--selected)': {
        lineHeight: '2.125rem',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.main
        },
        '&.react-datepicker__year-text--keyboard-selected': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main
          }
        }
      }
    },
    '& .react-datepicker__month-text--keyboard-selected': {
      '&:not(.react-datepicker__month--in-range)': {
        color: theme.palette.text.primary,
        backgroundColor: 'transparent',
        '&:hover': {
          color: theme.palette.grey['50'],
          backgroundColor: `rgba(${theme.palette.primary.main}, 0.06)`
        }
      }
    },
    '& .react-datepicker__year-text--keyboard-selected': {
      color: theme.palette.text.primary,
      backgroundColor: `rgba(${theme.palette.main}, 0.06)`,
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: `rgba(${theme.palette.main}, 0.06)`
      }
    },
    '& .react-datepicker__day--selected, & .react-datepicker__month--selected, & .react-datepicker__year-text--selected, & .react-datepicker__quarter--selected':
      {
        color: `${theme.palette.common.white} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`,
        '&:hover': {
          backgroundColor: `${theme.palette.primary.dark} !important`
        }
      },
    '& .react-datepicker__month-text, & .react-datepicker__year-text': {
      margin: theme.spacing(0.25),
      alignItems: 'center',
      lineHeight: '2.25rem',
      display: 'inline-flex',
      justifyContent: 'center',
      borderRadius: theme.shape.borderRadius,
      '&:focus, &:active': {
        outline: 0
      }
    },
    '& .react-datepicker__year--container': {
      paddingTop: theme.spacing(3.2)
    },
    '& .react-datepicker__year-wrapper': {
      maxWidth: 205,
      justifyContent: 'center'
    }
  }
}))

export default DatePickerWrapper