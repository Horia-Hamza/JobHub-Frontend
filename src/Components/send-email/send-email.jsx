import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  message: Yup.string().required('Message is required'),
});

const initialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here
    console.log(values);
    resetForm();
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className={`form-control ${errors.name && touched.name && 'is-invalid'}`}
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
              />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                className={`form-control ${errors.phone && touched.phone && 'is-invalid'}`}
              />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                id="message"
                className={`form-control ${errors.message && touched.message && 'is-invalid'}`}
              />
              <ErrorMessage name="message" component="div" className="invalid-feedback" />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
