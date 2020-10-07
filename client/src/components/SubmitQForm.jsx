import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SubmitQForm = ({question, getProductQs, getId, onHide}) => {
  // const [validated, setValidated] = useState(false);
  const [state, setqForm] = useState({
    body: '',
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setqForm({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitQ = (e) => {
    e.preventDefault();
    axios.post(`http://52.26.193.201:3000/qa/${getId}`, {...state})
        .then((res) => {
          console.log(res);
          onHide();
          getProductQs(getId);
        })
        .catch((err) => console.error(err));
  };

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  //   // conditionally do this: handleSubmitQ();
  // };

  return (
    <Form style={{borderRadius: '12px', marginBottom: '0px'}}
      onSubmit={handleSubmitQ}
      // noValidate validated={validated}
    >
      <Form.Group controlId="form.TextAreaValidation">
        <Form.Label></Form.Label>
        <Form.Control required as="textarea" rows="3"
          maxLength="1000"
          name="body"
          value={state.body}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your question before submitting.*
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="NicknameValidation">Nickname*
        <Form.Control required type="text" placeholder="Example:jackson11!"
          maxLength="60"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a nickname.*
        </Form.Control.Feedback>

        <Form.Text className="text-muted">
        For privacy reasons, do not use your full name or email address.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="EmailValidation">
        Email address*
        <Form.Control required type="email" maxLength="60"
          placeholder="Example: jack@email.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your email address..
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          For authentication reasons, you will not be emailed.
        </Form.Text>
      </Form.Group>
      <Button variant="dark" type="submit">
       Submit
      </Button>
    </Form>
  );
};

export default SubmitQForm;



// const [image, setImage] = useState({preview: '', raw: ''});
// const handleChange = (e) => {
//   if (e.target.photos.length) {
//     setImage({
//       preview: URL.createObjectURL(e.target.files[0]),
//       raw: e.target.files[0],
//     });
//   }
// };
