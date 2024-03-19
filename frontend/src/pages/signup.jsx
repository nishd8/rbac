import { Link } from "react-router-dom";
import Form from "../components/form";
import { SERVER_URL } from "../constants";
const Signup = () => {
  const onSubmit = (formData) => {
    fetch(`${SERVER_URL}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100 m-auto">
        <div className="col-lg-4 offset-lg-4">
          <Form
            formTitle={"Signup"}
            fields={[
              { type: "email", name: "email" },
              { type: "password", name: "password" },
            ]}
            onSubmit={onSubmit}
            buttonText={"Signup"}
          />
          <Link to={"/"}>Already a User? Login</Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
