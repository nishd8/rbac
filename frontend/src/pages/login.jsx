import { Link, useNavigate } from "react-router-dom";
import Form from "../components/form";
import { SERVER_URL } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const onSubmit = (formData) => {
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("email", formData.email);
          navigate("/rbac");
        } else {
          alert("Email or Password Incorrect");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100 m-auto">
        <div className="col-lg-4 offset-lg-4">
          <Form
            formTitle={"Login"}
            fields={[
              { type: "email", name: "email" },
              { type: "password", name: "password" },
            ]}
            onSubmit={onSubmit}
            buttonText={"Login"}
          />
          <Link to={"/signup"}>New Here? Signup</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
