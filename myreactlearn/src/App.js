import Additem from "./Additem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState, useEffect } from "react";
import Searchitem from "./Searchitem.js";
import apiRequest from "./Apirequest.js";
function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, SetItems] = useState([]);
  const [newItem, setnewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("URL is mistake");
        console.log(response);
        const listItems = await response.json();
        SetItems(listItems);
        setfetchError(null);
      } catch (err) {
        setfetchError(err.message);
      } finally {
        setIsloading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 3000);
  }, []);

  const listFunction = function (listItems) {
    SetItems(listItems);
    localStorage.setItem("todo_list", JSON.stringify(listItems));
  };
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    listFunction(listItems);

    const postoption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    const result = await apiRequest(API_URL, postoption);
    if (result) setfetchError(result);
  };
  async function handleClick(id) {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // console.log(listitems);
    listFunction(listItems);

    const myItem = listItems.filter((items) => items.id === id);
    const UpadteOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, UpadteOption);
    if (result) setfetchError(result);
  }

  async function handleDelete(id) {
    const listItems = items.filter((item) => item.id !== id);
    listFunction(listItems);
    const deleteOption = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if (result) setfetchError(result);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) return;
    // console.log(newItem);
    addItem(newItem);
    setnewItem("");
  }
  return (
    <div className="App">
      <Header />

      <Additem
        newItem={newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit}
      />
      <Searchitem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items..</p>}
        {fetchError && <p> Error: {fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter(
              (item) =>
                item.item &&
                item.item.toLowerCase().includes(search.toLowerCase())
            )}
            fetchError={fetchError}
            setfetchError={setfetchError}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
