import './App.css';
import { Header, Part, List, Footer} from './index';

const App = () => {

  /* Constants */
  const course = "Web 3";
  const part1 = "Introduction";
  const exercises1 = 15;
  const part2 = "ES Syntax";
  const exercises2 = 14;
  const technologies = [{id: 1, name: "Node.js"}, {id: 2, name: "Javascript"}, {id: 3, name: "Express"}, {id: 4, name: "React"}];

  return (
    <div className="main">
      {/* HEADER */}
      <Header title={course} />
      {/* PART */}
      <Part title={part1} amount={exercises1} />
      {/* PART */}
      <Part title={part2} amount={exercises2} />
      {/* LIST */}
      <List items={technologies}/>
      {/* FOOTER */}
      <Footer content={[exercises1, exercises2]}/>
    </div>
  );
}

export default App;
