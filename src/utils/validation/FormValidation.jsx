import * as yup from 'yup';

// const emailValidation = yup
//     .string()
//     .test("email", "Invalid email", function (value) {
//         if (!value) return true;
//         return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
//     })
//     .required("Email is required");

const emailValidation = yup
    .string()
    .test("email", "Invalid email", function (value) {
        if (!value) return true;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    })
    .required("Email is required");


export const profileValidation = yup.object({
    // email: emailValidation,
    username: yup.string().required('password is requird'),
    password: yup.string().required('password is requird')
})

export const createUser = yup.object({
    authrization_code: yup.string().required('Authentication Code is required'),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    dob: yup.string().required('DOB is required'),
    Age: yup.string().required('Age is required'),
    address: yup.string().required('Address is required'),
    postal_code: yup.string().required('Postal Code is required'),
    role_id: yup.string().required('Role is required'),
    group_id: yup.string().required('Group is required'),
})