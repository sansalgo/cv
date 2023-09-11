const GlobalStyles = theme => {
  return {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
      }
    },
    '.notistack-Snackbar': {
      '.notistack-MuiContent': {
        whiteSpace: 'pre-line',
        boxShadow: 'none',
        backgroundColor: 'initial',
        border: `1px solid ${theme.palette.divider}`
      },
      '.notistack-MuiContent-error': {
        color: theme.palette.error.main
      }
    }
  }
}

export default GlobalStyles
