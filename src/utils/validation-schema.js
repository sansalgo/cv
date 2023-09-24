import * as yup from 'yup'

const schema = fields => {
  const validationSchema = {}
  fields.forEach(({ field, level }) => {
    switch (field) {
      case 'username':
        switch (level) {
          case 'required':
            validationSchema[field] = yup.string().trim().required('Username is required')
            break
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .required('Username is required')
              .matches(
                /^[a-z][a-z0-9_]*$/,
                'Username must be lowercase and can contain only letters, numbers and underscores'
              )
              .min(3, 'Username must be at least 3 characters long')
              .max(13, 'Username cannot exceed 13 characters')
            break
        }
        break
      case 'email':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().email('Invalid email format').required('Email is required')
            break
        }
        break
      case 'otp':
        switch (level) {
          default:
            validationSchema[field] = yup.array().of(
              yup
                .string()
                .trim()
                .matches(/^\d{1}$/, 'OTP must be a 6-digit number')
                .required('OTP is required')
            )
            break
        }
        break
      case 'password':
        switch (level) {
          case 'required':
            validationSchema[field] = yup.string().trim().required('Password is required')
            break
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .required('Password is required')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              )
              .min(8, 'Password must be at least 8 characters long')
            break
        }
        break
      case 'confirmPassword':
        switch (level) {
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .oneOf([yup.ref('password'), null], 'Password must match')
              .required('Confirm password is required')
            break
        }
        break
      case 'verificationSign':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().required('Verification sign is required')
            break
        }
        break
      case 'fileName':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().required('Filename is required')
            break
        }
        break
      case 'intro':
        switch (level) {
          default:
            validationSchema[field] = yup.object().shape({
              firstName: yup.string().trim().required('First name is required'),
              lastName: yup.string().trim().required('Last name is required'),
              position: yup.string().trim().required('Position is required'),
              email: yup.string().trim().email('Invalid email address').required('Email is required'),
              phone: yup
                .string()
                .trim()
                .matches(/^[0-9]+$/, 'Phone number must be numeric')
                .required('Phone is required'),
              city: yup.string().trim().required('City is required'),
              linkedin: yup.string().trim().url('Invalid LinkedIn URL').required('LinkedIn is required'),
              github: yup.string().trim().url('Invalid GitHub URL').required('GitHub is required')
            })
            break
        }
        break
      case 'profileSummary':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().required('Profile summary is required')
            break
        }
        break
      case 'employmentHistory':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  position: yup.string().trim().required('Position is required'),
                  companyName: yup.string().trim().required('Company name is required'),
                  startDate: yup
                    .date()
                    .transform((value, originalValue) => {
                      // Convert empty strings to null before validation
                      return originalValue === '' ? null : value
                    })
                    .required('Start date is required'),
                  endDate: yup
                    .date()
                    .transform((value, originalValue) => {
                      return originalValue === '' ? null : value
                    })
                    .required('End date is required'),
                  location: yup.string().trim().required('Location is required'),
                  description: yup.string().trim().required('Description is required')
                })
              )
              .test(
                'atLeastOneEmploymentHistory',
                'At least one employment history entry is required',
                function (value) {
                  return value && value.length > 0
                }
              )
            break
        }
        break
      case 'education':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  course: yup.string().trim().required('Course is required'),
                  institution: yup.string().trim().required('Institution name is required'),
                  startDate: yup
                    .date()
                    .transform((value, originalValue) => {
                      return originalValue === '' ? null : value
                    })
                    .required('Start date is required'),
                  endDate: yup
                    .date()
                    .transform((value, originalValue) => {
                      return originalValue === '' ? null : value
                    })
                    .required('End date is required'),
                  location: yup.string().trim().required('Location is required'),
                  percentage: yup
                    .number()
                    .typeError('Percentage must be a number')
                    .required('Percentage is required')
                    .min(0, 'Percentage cannot be negative')
                    .max(100, 'Percentage cannot be greater than 100')
                })
              )
              .test('atLeastOneEducation', 'At least one education entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      case 'extras':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().trim().required('Extra value is required')
                })
              )
              .test('atLeastOneExtra', 'At least one extra entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      case 'skills':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().trim().required('Skill value is required')
                })
              )
              .test('atLeastOneSkill', 'At least one skill entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      case 'projects':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().trim().required('Project value is required')
                })
              )
              .test('atLeastOneProject', 'At least one project entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      case 'languages':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().trim().required('Language value is required')
                })
              )
              .test('atLeastOneLanguage', 'At least one language entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      case 'achievement':
        switch (level) {
          default:
            validationSchema[field] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().trim().required('Achievement value is required')
                })
              )
              .test('atLeastOneAchievement', 'At least one achievement entry is required', function (value) {
                return value && value.length > 0
              })
            break
        }
        break
      default:
        break
    }
  })
  return yup.object(validationSchema)
}

export default schema
