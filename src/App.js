import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("todo")) {
      localStorage.setItem("todo", JSON.stringify([]));
    }
  }, []);

  const [Todo, setTodo] = useState({
    title: "",
    description: "",
    status: false,
  });

  const getTodo = JSON.parse(localStorage.getItem("todo"));

  const handleChange = (e) => {
    setTodo({
      ...Todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("todo"));
    localStorage.setItem("todo", JSON.stringify([...data, Todo]));
  };

  const handleCeklist = (e) => {
    const findTodo = getTodo.find((item, idx) => idx === e);
    const newData = {
      title: findTodo.title,
      description: findTodo.description,
      status: true,
    };
    const filterdata = getTodo.filter((item, idx) => idx !== e);
    localStorage.setItem("todo", JSON.stringify([...filterdata, newData]));
  };

  const handleRemove = (idx) => {
    const newData = getTodo.filter((item, index) => index !== idx);
    localStorage.setItem("todo", JSON.stringify(newData));
  };

  return (
    <div className="">
      <h2>Todo webapp</h2>
      <div>
        <input
          type="text"
          name="title"
          placeholder="input title"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="input description"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleAdd}>ADD TODO</button>

      <div>
        {!getTodo.length ? (
          <p>Todo not found</p>
        ) : (
          getTodo.map((item, idx) => (
            <div key={idx}>
              <p>Title: {item.title}</p>
              <p>Description: {item.title}</p>
              <p>
                {item.status ? (
                  <p>isDone</p>
                ) : (
                  <p onClick={() => handleCeklist(idx)}>cek</p>
                )}
              </p>

              <button onClick={() => handleRemove(idx)}>X</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
// Lordgent98##
