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
    authenticationCode: yup.string().required('Authentication Code  is requird'),
    first_name: yup.string().required('First Name is requird'),
    last_name: yup.string().required('Last Name is requird'),
    Gender: yup.string().required('Gender is requird'),
    email: emailValidation,
    contactNo: yup.string().required('Contact No is requird'),
    DOB: yup.string().required('DOB No is requird'),
    Age: yup.string().required('Age No is requird'),
    Address: yup.string().required('Address No is requird'),
    postalCode: yup.string().required('Postal Code No is requird'),
    City: yup.string().required('city  is requird'),
    State: yup.string().required('State No is requird'),
    Country: yup.string().required('Country No is requird'),
    Action: yup.string().required('Action No is requird'),
    Notes: yup.string().required('Notes No is requird'),
    // Country: yup.string().required('Country No is requird'),
})