import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Form from "../components/form";
import { SERVER_URL } from "../constants";
const RBAC = () => {
  const [isActive, setIsActive] = useState(1);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showCreateFeature, setShowCreateFeature] = useState(false);
  const [features, setFeatures] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddFeature, setShowAddFeature] = useState(-1);
  const [showEditFeature, setShowEditFeature] = useState(-1);
  const [showChangeRole, setShowChangeRole] = useState(-1);
  const updateRoleFeatures = (formData) => {
    fetch(`${SERVER_URL}/rbac/update/role/features`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-user-email": `${localStorage.getItem("email")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setShowAddFeature(-1);
        getRoles();
      })
      .catch((err) => console.log(err));
  };
  const createRole = (formData) => {
    fetch(`${SERVER_URL}/rbac/create/role`, {
      method: "POST",
      headers: {
        "content-type": "application/json",

        "x-user-email": `${localStorage.getItem("email")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        getRoles();
        setShowCreateRole(false);
      })
      .catch((err) => console.log(err));
  };
  const createFeature = (formData) => {
    fetch(`${SERVER_URL}/rbac/create/feature`, {
      method: "POST",
      headers: {
        "content-type": "application/json",

        "x-user-email": `${localStorage.getItem("email")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        getFeatures();
        setShowCreateFeature(false);
      })
      .catch((err) => console.log(err));
  };
  const editFeature = (formData) => {
    fetch(
      `${SERVER_URL}/rbac/update/features/${features[showEditFeature]?.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",

          "x-user-email": `${localStorage.getItem("email")}`,
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setShowEditFeature(-1);
        getFeatures();
      })
      .catch((err) => console.log(err));
  };
  const getFeatures = () => {
    fetch(`${SERVER_URL}/rbac/get/features`, {
      method: "GET",
      headers: {
        "x-user-email": `${localStorage.getItem("email")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.log(err));
  };
  const getRoles = () => {
    fetch(`${SERVER_URL}/rbac/get/roles`, {
      method: "GET",
      headers: {
        "x-user-email": `${localStorage.getItem("email")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.log(err));
  };
  const getAllUsers = () => {
    fetch(`${SERVER_URL}/get/users/all`, {
      method: "GET",
      headers: {
        "x-user-email": `${localStorage.getItem("email")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };
  const getRoleName = (r_id) => {
    let found = roles.filter((role) => role.id === r_id);
    if (found.length > 0) {
      return found[0]?.name;
    }
    return "";
  };
  const assignRole = (formData) => {
    fetch(`${SERVER_URL}/update/users/${users[showChangeRole]?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-user-email": `${localStorage.getItem("email")}`,
      },
      body: JSON.stringify({ r_id: formData.role }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setShowChangeRole(-1);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };
  const deleteRole = (role_id) => {
    fetch(`${SERVER_URL}/rbac/delete/role/${role_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-user-email": `${localStorage.getItem("email")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        getRoles();
      })
      .catch((err) => console.log(err));
  };
  const deleteFeature = (feat_id) => {
    fetch(`${SERVER_URL}/rbac/delete/feature/${feat_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-user-email": `${localStorage.getItem("email")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        getFeatures();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFeatures();
    getRoles();
    getAllUsers();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="my-5 d-flex">
            <button
              onClick={() => setIsActive(1)}
              className={`w-100 me-1 btn ${
                isActive === 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setIsActive(2)}
              className={`w-100 mx-1 btn ${
                isActive === 2 ? "btn-primary" : "btn-secondary"
              }`}
            >
              Roles
            </button>
            <button
              onClick={() => setIsActive(3)}
              className={`w-100 ms-1 btn ${
                isActive === 3 ? "btn-primary" : "btn-secondary"
              }`}
            >
              Features
            </button>
          </div>
          {isActive === 1 && (
            <div>
              <div className="d-flex justify-content-between">
                <h3>Users</h3>
              </div>
              <hr />
              {users.map((user, index) => (
                <div className="mb-4" key={user.email}>
                  <div className="d-flex justify-content-between mb-3 pointer">
                    <h5>{user.email}</h5>
                    <h5>{getRoleName(user.r_id)}</h5>
                    <i
                      onClick={() => {
                        setShowChangeRole(index);
                      }}
                      className="bi bi-pencil-square"
                      title="Change User Role"
                    ></i>
                  </div>
                </div>
              ))}
              <Modal
                onClose={() => {
                  setShowChangeRole(-1);
                }}
                show={showChangeRole >= 0}
              >
                <Form
                  formTitle={"Assign Role To User"}
                  fields={[
                    {
                      type: "select",
                      name: "role",
                      options: [
                        ...roles.map((role) => ({
                          value: role.id,
                          label: role.name,
                        })),
                        { value: "", label: "No Role" },
                      ],
                      value: users[showChangeRole]?.r_id,
                    },
                  ]}
                  buttonText={"Save"}
                  onSubmit={assignRole}
                />
              </Modal>
            </div>
          )}
          {isActive === 2 && (
            <div>
              <div className="d-flex justify-content-between">
                <h3>Roles</h3>
                <button
                  className="btn btn-secondary my-auto"
                  onClick={() => {
                    setShowCreateRole(true);
                  }}
                >
                  Create Role
                </button>
              </div>
              <hr />
              {roles.map((role, index) => (
                <div className="mb-4" key={role.id}>
                  <div className="d-flex justify-content-between mb-3 pointer">
                    <h5>{role.name}</h5>
                    <div>
                      <i
                        className="bi bi-pencil-square pointer me-3"
                        title="Edit Role"
                      ></i>
                      <i
                        className="bi bi-trash-fill text-danger pointer"
                        title="Delete Role"
                        onClick={() => {
                          deleteRole(role.id);
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="ps-4">
                    {features.map((feature) =>
                      role.features.includes(feature.id) ? (
                        <div
                          className="d-flex justify-content-between"
                          key={`role-${feature.id}`}
                        >
                          {feature.name}
                          <i
                            className="bi bi-trash-fill text-danger pointer"
                            title="Remove Feature"
                            onClick={() => {
                              updateRoleFeatures({
                                id: role.id,
                                features: [feature.id],
                              });
                            }}
                          ></i>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                    <span
                      className="text-primary underlined pointer"
                      onClick={() => {
                        setShowAddFeature(index);
                      }}
                    >
                      Add Features
                    </span>
                  </div>
                </div>
              ))}
              <Modal
                onClose={() => {
                  setShowCreateRole(false);
                }}
                show={showCreateRole}
              >
                <Form
                  formTitle={"Create Role"}
                  fields={[{ type: "text", name: "name" }]}
                  buttonText={"Create"}
                  onSubmit={createRole}
                />
              </Modal>
              <Modal
                onClose={() => {
                  setShowAddFeature(-1);
                }}
                show={showAddFeature >= 0}
              >
                <Form
                  formTitle={"Add Features"}
                  fields={[
                    {
                      type: "multiselect",
                      name: "features",
                      options: features.map((feature) => ({
                        value: feature.id,
                        label: feature.name,
                        checked: roles[showAddFeature]?.features.includes(
                          feature.id
                        ),
                        disabled: roles[showAddFeature]?.features.includes(
                          feature.id
                        ),
                      })),
                    },
                  ]}
                  buttonText={"Add"}
                  onSubmit={(formData) => {
                    updateRoleFeatures({
                      ...formData,
                      id: roles[showAddFeature]?.id,
                    });
                  }}
                />
              </Modal>
            </div>
          )}
          {isActive === 3 && (
            <div>
              <div className="d-flex justify-content-between">
                <h3>Features</h3>
                <button
                  className="btn btn-secondary my-auto"
                  onClick={() => setShowCreateFeature(true)}
                >
                  Create Feature
                </button>
              </div>
              <hr />
              {features.map((feature, index) => (
                <div className="mb-4" key={feature.id}>
                  <div className="d-flex justify-content-between mb-3 pointer">
                    <h5>{feature.name}</h5>
                    <div>
                      <i
                        className="bi bi-pencil-square pointer me-3"
                        title="Edit Feature"
                        onClick={() => setShowEditFeature(index)}
                      ></i>
                      <i
                        className="bi bi-trash-fill text-danger pointer"
                        title="Delete Feature"
                        onClick={() => {
                          deleteFeature(feature.id);
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="ps-4">{feature.description}</div>
                </div>
              ))}

              <Modal
                onClose={() => {
                  setShowCreateFeature(false);
                }}
                show={showCreateFeature}
              >
                <Form
                  formTitle={"Create Feature"}
                  fields={[
                    { type: "text", name: "name" },
                    { type: "textarea", name: "description" },
                  ]}
                  buttonText={"Create"}
                  onSubmit={createFeature}
                />
              </Modal>

              <Modal
                onClose={() => {
                  setShowEditFeature(-1);
                }}
                show={showEditFeature >= 0}
              >
                <Form
                  formTitle={"Edit Feature"}
                  fields={[
                    {
                      type: "text",
                      name: "name",
                      value: features[showEditFeature]?.name,
                    },
                    {
                      type: "textarea",
                      name: "description",
                      value: features[showEditFeature]?.description,
                    },
                  ]}
                  buttonText={"Save"}
                  onSubmit={editFeature}
                />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RBAC;
