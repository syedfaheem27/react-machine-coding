import { useState } from 'react'
import './App.css'
import { initalState } from './data'

function App() {
  const [data, setData] = useState(initalState)
  const [dragging, setDragging] = useState(null);

  const handleDragStart = (e, taskId, columnId) => {
    setDragging({
      taskId,
      columnId
    });
  }

  const handleDragOver = e => e.preventDefault();

  const handleDrop = e => {
    e.preventDefault();
    const dropParent = e.currentTarget;
    const targetColumn = data.find(col => col.columnId === dropParent.dataset.columnId);
    const draggedColumn = data.find(col => col.columnId === dragging.columnId);

    if (!draggedColumn || !targetColumn)
      return;

    const draggedTask = draggedColumn.tasks.find(t => t.id === dragging.taskId);
    const newSourceTasks = draggedColumn.tasks.filter(t => t.id !== dragging.taskId);
    const targetTaskLists = Array.from(dropParent.children)
    const eventY = e.clientY;

    let insertAtIndex = targetTaskLists.length - 1;
    console.log(insertAtIndex)

    for (let i = 0; i < targetTaskLists.length; i++) {
      let rect = targetTaskLists[i].getBoundingClientRect();
      if (eventY < rect.top + rect.height / 2) {
        insertAtIndex = i;
        break;
      } else
        insertAtIndex++;
    }



    if (targetColumn.columnId === draggedColumn.columnId) {
      newSourceTasks.splice(insertAtIndex, 0, draggedTask);
      setData(data => {
        return data.map(col => {
          if (col.columnId === targetColumn.columnId)
            return { ...col, tasks: newSourceTasks }
          return col;
        })
      })

    } else {
      let targetTasks = targetColumn.tasks;

      // console.log(insertAtIndex)
      if (insertAtIndex === -1)
        targetTasks.push(draggedTask);
      else
        targetTasks.splice(insertAtIndex, 0, draggedTask);

      setData(data => {
        return data.map(col => {
          if (col.columnId === draggedColumn.columnId)
            return { ...col, tasks: newSourceTasks }
          else
            return {
              ...col,
              tasks: targetTasks
            }
        })
      })
    }
    setDragging(null)

  }

  return (
    <>
      <header>
        <h1>A simple transfer component</h1>
      </header>
      <main className='main'>
        {
          data.map(({ columnId, title, tasks }) => {
            return <section key={columnId} className='section'>
              <header>
                <h2>{title}</h2>
              </header>
              <ul
                data-column-id={columnId}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="list"
              >
                {
                  tasks.map(task => {
                    return <li
                      className={`list-item ${dragging?.taskId === task.id ? 'dragging' : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id, columnId)}
                      key={task.id}>{task.title}</li>
                  })
                }
              </ul>
            </section>
          })
        }
      </main>
    </>
  )
}

export default App
