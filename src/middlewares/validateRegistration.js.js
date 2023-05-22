const { body, validationResult } = require('express-validator');


const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email_id').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password should be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage('Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
    body('user_name').notEmpty().withMessage('Username is required'),
    body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('mobile').notEmpty().withMessage('Mobile number is required').matches(/^\+\d{1,3}-\d{10}$/).withMessage('Invalid mobile number format. Use country code (+) separate by (-) (eg : +91-9876543210).'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ success: false, error: errorMessages });
        }
        next();
    },
];

const profileUpdateValidation = [
    body('email_id').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage('Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),        
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('mobile').matches(/^\+\d{1,3}-\d{10}$/).withMessage('Invalid mobile number format. Use country code (+) separate by (-) (eg : +91-9876543210).'),
    (req, res, next) => {
        const errors = validationResult(req);
        var newErrors = [];
        // if(key === val.path)
        // {
        //     newErrors.push(val)
        // }
        // console.log(errors.errors);
        for (const key in req.body) {
          errors.errors.forEach(val => {
             if(key === val.path)
                {
                  newErrors.push(val)
                }
          });
        }
        // console.log(newErrors);
        if (newErrors.length > 0) {
            const errorMessages = newErrors.map((error) => error.msg);
            return res.status(400).json({ success: false, error: errorMessages });
        }
        next();
    },
];


module.exports = {validateRegistration, profileUpdateValidation};