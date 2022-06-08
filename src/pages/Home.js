import Date from "../components/Date";
import AddToDo from "../components/AddToDo";
import List from "../components/List";

export default function Home() {
  return (
    <div className="main">
      <Date />
      <AddToDo />
      <List />
    </div>
  )
}
