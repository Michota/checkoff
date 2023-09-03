import { styled } from "styled-components";
import Task from "../components/Task";

const temporaryTasks = [
  {
    id: 0,
    title: "Walk the dog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reiciendis fugit possimus ducimus fuga, harum commodi quibusdam! Suscipit, sunt nostrum est rem perspiciatis ad sint, nisi repellendus cumque sit vel repudiandae eum debitis quia veniam adipisci voluptatum reiciendis praesentium laudantium aut architecto id libero aspernatur tenetur! Tenetur soluta adipisci quia vitae obcaecati beatae, assumenda vero dolorem necessitatibus rerum explicabo! Harum, facere aut saepe impedit tempora assumenda atque nemo eaque culpa?,",
  },
  {
    id: 1,
    title: "Test me out",
    description: "TEST TEST TEST",
  },
  {
    id: 2,
    title: "Hehe",
    description: "Ale",
  },
];

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Checklist() {
  return (
    <StyledChecklist>
      <h1>Checklist</h1>
      {temporaryTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </StyledChecklist>
  );
}

export default Checklist;
